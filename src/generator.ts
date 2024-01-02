import { hasGoal, SquareWithGoal } from "./types/board";
import { Goal, GoalList } from "./types/goalList";
import { Mode, Profile } from "./types/settings";
import { RNG } from "./rng";
import { SynergyCalculator } from "./synergyCalculator";
import { flattenGoalList, parseSynergyFilters, sortAscending, sortDescending } from "./util";
import { BingoBoard } from "./bingoBoard";
import { PotentialBingoBoard } from "./potentialBingoBoard";
import { MAX_ITERATIONS, ROWS_PER_INDEX, SQUARE_POSITIONS } from "./constants/board";

export default class BingoGenerator {
  private readonly isBlackout: boolean;
  private readonly profile: Profile;
  private readonly allGoals: Goal[];
  private readonly synergyCalculator: SynergyCalculator;

  private board: PotentialBingoBoard;
  private rng: RNG;

  constructor(goalList: GoalList, mode: Mode, profile: Profile) {
    this.isBlackout = mode === "blackout" || mode === "shortBlackout";
    this.profile = profile;

    this.allGoals = flattenGoalList(goalList);

    this.synergyCalculator = new SynergyCalculator(
      profile,
      goalList.rowtypes,
      parseSynergyFilters(goalList.synfilters)
    );

    // temporary, will be overwritten in generate() and generateBoard() respectively
    this.board = new PotentialBingoBoard(0, profile);
    this.rng = new RNG(0);
  }

  /**
   * Generates a bingo board.
   * @param seed Rng seed
   * @param maxIterations Oprional, the max amount of times the generator will try to generate a board. Defaults to 100.
   * @returns An object with metadata and an array of squares if generation was successful
   */
  generateBoard(seed: number, maxIterations = MAX_ITERATIONS): BingoBoard | undefined {
    this.rng = new RNG(seed);

    let potentialBoard: PotentialBingoBoard | undefined = undefined;
    let iterations = 0;

    while (!potentialBoard && iterations < maxIterations) {
      iterations++;
      potentialBoard = this.generate(seed);
    }

    if (!potentialBoard) {
      console.error(`Failed to generate board after ${iterations} iterations (seed: ${seed})`);
      return;
    }

    return new BingoBoard(potentialBoard.squares, iterations);
  }

  /**
   * Attempts to generate a board.
   * @returns A PotentialBoard if generation was successful, undefined otherwise
   */
  private generate(seed: number): PotentialBingoBoard | undefined {
    // create a potential bingo board
    this.board = new PotentialBingoBoard(seed, this.profile);

    // fill in the goals of the board in a random order
    const populationOrder = this.generatePopulationOrder();

    for (const position of SQUARE_POSITIONS) {
      const nextPosition = populationOrder[position];

      const pickedGoal = this.pickGoalForPosition(nextPosition);

      if (pickedGoal) {
        this.board.squares[nextPosition].goal = pickedGoal;
      } else {
        return undefined;
      }
    }
    return this.board;
  }

  /**
   * Picks a goal to fill a specified square on the board. It may not cause too much (anti)synergy in any row.
   * In case of a blackout, it may not cause too much synergy with any goal already on the board.
   *
   * @param position The position of the square to fill
   * @returns The goal, or undefined if no fitting goal was found
   */
  private pickGoalForPosition(position: number): Goal | undefined {
    const squareToFill = this.board.squares[position];
    const desiredTime = squareToFill.desiredTime;

    for (let offset = this.profile.initialOffset; offset <= this.profile.maximumOffset; offset++) {
      const goalsInTimeRange = this.getShuffledGoalsInTimeRange(
        desiredTime - offset,
        desiredTime + offset
      );

      for (const goal of goalsInTimeRange) {
        if (this.board.hasGoal(goal)) {
          continue;
        }

        const squareWithPotentialGoal = {
          ...squareToFill,
          goal: goal,
        };

        if (this.isBlackout && this.hasConflictsOnBoard(squareWithPotentialGoal)) {
          continue;
        }

        if (!this.causesTooMuchSynergyInRow(squareWithPotentialGoal, position)) {
          return goal;
        }
      }
    }
    return undefined;
  }

  private getShuffledGoalsInTimeRange(minimumTime: number, maximumTime: number): Goal[] {
    const goalsInTimeRange = this.allGoals.filter(
      (goal) => goal.time >= minimumTime && goal.time <= maximumTime
    );
    if (this.profile.useFrequencyBalancing) {
      return this.weightedShuffle(goalsInTimeRange);
    } else {
      return this.shuffle(goalsInTimeRange);
    }
  }

  private hasConflictsOnBoard(squareWithPotentialGoal: SquareWithGoal): boolean {
    for (const square of this.board.squares) {
      if (!hasGoal(square)) {
        continue;
      }
      if (
        this.synergyCalculator.calculateSynergyOfSquares([squareWithPotentialGoal, square]) >=
        this.profile.tooMuchSynergy
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if a square with a potential goal would cause too much synergy in any row on the board.
   *
   * @param potentialSquareWithGoal Square with a potential goal
   * @param positionOfSquare The position of the square on the board
   * @returns True if the potential goal causes too much synergy in any row, false otherwise
   */
  private causesTooMuchSynergyInRow(
    potentialSquareWithGoal: SquareWithGoal,
    positionOfSquare: number
  ): boolean {
    const minMaxSynergies = this.minMaxSynergiesForRowsOfSquare(
      potentialSquareWithGoal,
      positionOfSquare
    );

    return (
      minMaxSynergies.maximumSynergy > this.profile.maximumSynergy ||
      minMaxSynergies.minimumSynergy < this.profile.minimumSynergy
    );
  }

  /**
   * Looks at all the rows containing a square with a potential goal, and returns the minimum and maximum synergy that that
   * square would cause in any of the rows.
   *
   * @param potentialSquareWithGoal Square with a potential goal
   * @param positionOfSquare The position of the square on the board
   * @returns An object containing the minimum and the maximum synergy the goal causes in any of its rows
   */
  private minMaxSynergiesForRowsOfSquare(
    potentialSquareWithGoal: SquareWithGoal,
    positionOfSquare: number
  ): { maximumSynergy: number; minimumSynergy: number } {
    const rowsOfSquare = ROWS_PER_INDEX[positionOfSquare];

    let maximumSynergy = 0;
    let minimumSynergy = this.profile.tooMuchSynergy;

    for (const row of rowsOfSquare) {
      const potentialRow = this.board.getOtherSquaresInRow(positionOfSquare, row);
      potentialRow.push(potentialSquareWithGoal);
      const effectiveRowSynergy = this.synergyCalculator.calculateSynergyOfSquares(potentialRow);

      maximumSynergy = Math.max(maximumSynergy, effectiveRowSynergy);
      minimumSynergy = Math.min(minimumSynergy, effectiveRowSynergy);
    }

    return {
      maximumSynergy: maximumSynergy,
      minimumSynergy: minimumSynergy,
    };
  }

  /**
   * Generates the order in which the squares should be filled by the generator.
   * First the three squares with the highest difficulty, then the center square, then the diagonals, then the rest.
   * @return An array with the positions of the squares, in the order that they should be populated
   */
  private generatePopulationOrder(): number[] {
    let populationOrder = [];

    const centerSquare = 12;
    populationOrder[0] = centerSquare;

    const diagonals = this.shuffle([0, 6, 18, 24, 4, 8, 16, 20]);
    populationOrder = populationOrder.concat(diagonals);

    const nonDiagonals = this.shuffle([1, 2, 3, 5, 7, 9, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23]);
    populationOrder = populationOrder.concat(nonDiagonals);

    this.movePositionsWithHighestDifficultyToFront(3, populationOrder);

    return populationOrder;
  }

  /**
   * Takes the n board positions of the squares with the highest difficulties, and moves them to
   * the front of the populationOrder list.
   *
   * Generally there are fewer goals with high difficulties (i.e. long goals) available, therefore
   * the squares should be populated with goals first.
   *
   * @param n Number of positions to move to front
   * @param populationOrder Array of all board positions, sorted by population order
   */
  private movePositionsWithHighestDifficultyToFront(n: number, populationOrder: number[]) {
    if (n > this.board.squares.length) {
      n = this.board.squares.length;
    }
    const difficulties = this.board.squares.map((square) => square.difficulty);
    // highest n difficulties, from low to high
    const highestDifficulties = sortAscending(sortDescending(difficulties).slice(0, n));

    for (const difficulty of highestDifficulties) {
      this.movePositionWithDifficultyToFront(difficulty, populationOrder);
    }
  }

  private movePositionWithDifficultyToFront(difficulty: number, populationOrder: number[]) {
    const currentSquare = this.board.squares.findIndex((square) => square.difficulty == difficulty);

    if (currentSquare === -1) {
      // This should never happen
      throw new Error(`Can't find square with difficulty ${difficulty}`);
    }

    populationOrder.splice(
      populationOrder.findIndex((i) => i === currentSquare),
      1
    );
    populationOrder.splice(0, 0, currentSquare);
  }

  private shuffle<T>(array: Array<T>): Array<T> {
    const toShuffle = array.slice();
    for (let i = 0; i < toShuffle.length; i++) {
      const randElement = Math.floor(this.rng.nextRandom() * (i + 1));
      const temp = toShuffle[i];
      toShuffle[i] = toShuffle[randElement];
      toShuffle[randElement] = temp;
    }
    return toShuffle;
  }

  /**
   * Shuffles array of goals, but makes it more likely for goals with higher weights to appear earlier in the list (for frequency balancing).
   * Goal weights should be numbers between -2 and 2.
   *
   * @param goals array of goals
   */
  private weightedShuffle(goals: Goal[]): Goal[] {
    return goals
      .map((goal) => ({
        goal,
        sortVal:
          (goal.weight ?? 0) +
          this.rng.nextRandom() +
          this.rng.nextRandom() +
          this.rng.nextRandom() +
          this.rng.nextRandom() -
          2,
      }))
      .sort(({ sortVal: sv1 }, { sortVal: sv2 }) => sv2 - sv1)
      .map(({ goal }) => goal);
  }
}
