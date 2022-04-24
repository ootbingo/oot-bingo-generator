import { Card, RowName, Square } from "./types/board";
import { Goal, GoalList } from "./types/goalList";
import { Synergies, Synfilters } from "./types/synergies";
import { Profile, Profiles } from "./types/profiles";
import { Options } from "./types/options";
import { generateMagicSquare } from "./magicSquare";
import { RNG } from "./rng";
import { SynergyCalculator } from "./synergyCalculator";
import { flattenGoalList, parseSynergyFilters, sortAscending, sortDescending } from "./util";
import { DEFAULT_PROFILES, INDICES_PER_ROW, ROWS_PER_INDEX, SQUARE_POSITIONS } from "./definitions";

export default class BingoGenerator {
  readonly options: Options;
  readonly profile: Profile;
  readonly rng: RNG;
  readonly magicSquare: number[];

  readonly allGoals: Goal[];
  readonly rowtypeTimeSave: Synergies;
  readonly synergyFilters: Synfilters;

  readonly synergyCalculator: SynergyCalculator;

  constructor(goalList: GoalList, options: Options, profiles?: Profiles) {
    this.options = options;

    this.rng = new RNG(options.seed);
    this.magicSquare = generateMagicSquare(this.options.seed);

    this.rowtypeTimeSave = goalList.rowtypes;
    this.synergyFilters = parseSynergyFilters(goalList.synfilters);

    this.allGoals = flattenGoalList(goalList);

    this.profile = profiles ? profiles[options.mode] : DEFAULT_PROFILES[options.mode];

    this.synergyCalculator = new SynergyCalculator(
      this.profile,
      this.rowtypeTimeSave,
      this.synergyFilters
    );
  }

  /**
   * Generates a bingo card.
   * @param maxIterations The max amount of times the generator will try to generate a card.
   * @returns An object with an array of squares if generation was successful, and metadata
   */
  generateCard(maxIterations: number = 100): Card {
    let board: Square[] | undefined = undefined;
    let iteration = 0;

    while (!board && iteration < maxIterations) {
      iteration++;
      board = this.generateBoard();
    }

    // all squares should have been filled with a goal at this point
    const goals = board.map((square) => square.goal);

    return {
      goals: goals,
      meta: {
        iterations: iteration
      }
    };
  }

  /**
   * Attempts to generate a single bingo board (array of squares).
   * @returns An array of squares if generation was successful, undefined otherwise
   */
  generateBoard(): Square[] | undefined {
    // set up the bingo board by filling in the difficulties based on a magic square
    const bingoBoard = SQUARE_POSITIONS.map((position) =>
      this.#mapDifficultyToSquare(this.magicSquare[position])
    );

    // fill in the goals of the board in a random order
    const populationOrder = this.#generatePopulationOrder(bingoBoard);

    for (const position of SQUARE_POSITIONS) {
      const nextPosition = populationOrder[position];

      const pickedGoal = this.#pickGoalForPosition(nextPosition, bingoBoard);

      if (pickedGoal) {
        bingoBoard[nextPosition].goal = pickedGoal;
      } else {
        return undefined;
      }
    }
    return bingoBoard;
  }

  /**
   * Picks a goal to fill a specified square on the board. It may not cause too much (anti)synergy in any row.
   * In case of a blackout, it may not cause too much synergy with any goal already on the board.
   *
   * @param position The position of the square to fill
   * @param bingoBoard Array of squares
   * @returns The goal, or undefined if no fitting goal was found
   */
  #pickGoalForPosition(position: number, bingoBoard: Square[]): Goal | undefined {
    const squareToFill = bingoBoard[position];
    const desiredTime = squareToFill.desiredTime;

    for (
      let offset = this.profile.initialOffset;
      offset <= this.profile.maximumOffset;
      offset++
    ) {
      const goalsInTimeRange = this.#getShuffledGoalsInTimeRange(
        desiredTime - offset,
        desiredTime + offset
      );

      for (const goal of goalsInTimeRange) {
        if (this.#hasGoalOnBoard(goal, bingoBoard)) {
          continue;
        }

        const squareWithPotentialGoal = {
          ...squareToFill,
          goal: goal
        };

        if (
          this.options.mode === "blackout" &&
          this.#hasConflictsOnBoard(squareWithPotentialGoal, bingoBoard)
        ) {
          continue;
        }

        if (
          !this.#causesTooMuchSynergyInRow(squareWithPotentialGoal, position, bingoBoard)
        ) {
          return goal;
        }
      }
    }
    return undefined;
  }

  #getShuffledGoalsInTimeRange(minimumTime: number, maximumTime: number): Goal[] {
    const goalsInTimeRange = this.allGoals.filter(
      (goal) => goal.time >= minimumTime && goal.time <= maximumTime
    );
    if (this.profile.useFrequencyBalancing) {
      return this.#weightedShuffle(goalsInTimeRange);
    } else {
      return this.#shuffled(goalsInTimeRange);
    }
  }

  #hasGoalOnBoard(goal: Goal, bingoBoard: Square[]): boolean {
    return bingoBoard.some((square) => square.goal && square.goal.id === goal.id);
  }

  #hasConflictsOnBoard(squareWithPotentialGoal: Square, bingoBoard: Square[]): boolean {
    for (const square of bingoBoard) {
      if (!square.goal) {
        continue;
      }
      if (
        this.synergyCalculator.synergyOfSquares([squareWithPotentialGoal, square]) >=
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
   * @param bingoBoard Array of squares
   * @returns True if the potential goal causes too much synergy in any row, false otherwise
   */
  #causesTooMuchSynergyInRow(
    potentialSquareWithGoal: Square,
    positionOfSquare: number,
    bingoBoard: Square[]
  ): boolean {
    const minMaxSynergies = this.#minMaxSynergiesForRowsOfSquare(
      potentialSquareWithGoal,
      positionOfSquare,
      bingoBoard
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
   * @param bingoBoard Array of squares
   * @returns An object containing the minimum and the maximum synergy the goal causes in any of its rows
   */
  #minMaxSynergiesForRowsOfSquare(
    potentialSquareWithGoal: Square,
    positionOfSquare: number,
    bingoBoard: Square[]
  ): { maximumSynergy: number; minimumSynergy: number } {
    const rowsOfSquare = ROWS_PER_INDEX[positionOfSquare];

    let maximumSynergy = 0;
    let minimumSynergy = this.profile.tooMuchSynergy;

    for (const row of rowsOfSquare) {
      const potentialRow = this.#getOtherSquares(row, positionOfSquare, bingoBoard);
      potentialRow.push(potentialSquareWithGoal);
      const effectiveRowSynergy = this.synergyCalculator.synergyOfSquares(potentialRow);

      maximumSynergy = Math.max(maximumSynergy, effectiveRowSynergy);
      minimumSynergy = Math.min(minimumSynergy, effectiveRowSynergy);
    }

    return {
      maximumSynergy: maximumSynergy,
      minimumSynergy: minimumSynergy
    };
  }

  #getOtherSquares(
    row: RowName,
    positionOfSquare: number,
    bingoBoard: Square[]
  ): Square[] {
    return INDICES_PER_ROW[row]
      .filter((index) => index != positionOfSquare)
      .map((index) => bingoBoard[index]);
  }

  #mapDifficultyToSquare(difficulty: number): Square {
    return {
      difficulty: difficulty,
      desiredTime: difficulty * this.profile.timePerDifficulty
    };
  }

  /**
   * Generates the order in which the squares should be filled by the generator.
   * First the three squares with the highest difficulty, then the center square, then the diagonals, then the rest.
   *
   * @param bingoBoard The bingo board
   */
  #generatePopulationOrder(bingoBoard: Square[]): number[] {
    let populationOrder = [];

    const centerSquare = 12;
    populationOrder[0] = centerSquare;

    const diagonals = this.#shuffled([0, 6, 18, 24, 4, 8, 16, 20]);
    populationOrder = populationOrder.concat(diagonals);

    const nonDiagonals = this.#shuffled([
      1, 2, 3, 5, 7, 9, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23
    ]);
    populationOrder = populationOrder.concat(nonDiagonals);

    this.#movePositionsWithHighestDifficultyToFront(3, populationOrder, bingoBoard);

    return populationOrder;
  }

  /**
   * Takes the n board positions of the squares with the highest difficulties, and moves them to
   * the front of the populationOrder list.
   *
   * Generally there are less goals with high difficulties (i.e. long goals) available, therefore
   * the squares should be populated with goals first.
   *
   * @param n Number of positions to move to front
   * @param populationOrder Array of all board positions, sorted by population order
   * @param bingoBoard Array of squares
   */
  #movePositionsWithHighestDifficultyToFront(
    n: number,
    populationOrder: number[],
    bingoBoard: Square[]
  ) {
    if (n > bingoBoard.length) {
      n = bingoBoard.length;
    }
    const difficulties = bingoBoard.map((square) => square.difficulty);
    // highest n difficulties, from low to high
    const highestDifficulties = sortAscending(sortDescending(difficulties).slice(0, n));

    for (const difficulty of highestDifficulties) {
      this.#movePositionWithDifficultyToFront(difficulty, populationOrder, bingoBoard);
    }
  }

  #movePositionWithDifficultyToFront(
    difficulty: number,
    populationOrder: number[],
    bingoBoard: Square[]
  ) {
    const currentSquare = bingoBoard.findIndex(
      (square) => square.difficulty == difficulty
    );

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

  #shuffled<T>(array: Array<T>): Array<T> {
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
   * Shuffles list of goals, but makes it more likely for goals with higher weights to appear earlier in the list (for frequency balancing).
   * Goal weights should be numbers between -2 and 2.
   *
   * @param goals list of goals
   */
  #weightedShuffle(goals: Goal[]): Goal[] {
    return goals
      .map((goal) => ({
        goal,
        sortVal:
          (goal.weight || 0) +
          this.rng.nextRandom() +
          this.rng.nextRandom() +
          this.rng.nextRandom() +
          this.rng.nextRandom() -
          2
      }))
      .sort(({ sortVal: sv1 }, { sortVal: sv2 }) => sv2 - sv1)
      .map(({ goal }) => goal);
  }
}
