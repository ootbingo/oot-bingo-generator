import { RowName, Square } from "./types/board";
import { Profile } from "./types/settings";
import { generateMagicSquare } from "./magicSquare";
import { Goal } from "./types/goalList";
import { INDICES_PER_ROW, SQUARE_POSITIONS } from "./constants/board";

/**
 * Bingo board class used only during generation.
 * The squares do not have goals yet at the start. As generation proceeds, each square gets assigned a goal.
 */
export class PotentialBingoBoard {
  private readonly _squares: Square[];

  constructor(seed: number, profile: Profile) {
    const magicSquare = generateMagicSquare(seed);

    this._squares = SQUARE_POSITIONS.map((position) => {
      const difficulty = magicSquare[position];
      return {
        difficulty: difficulty,
        desiredTime: difficulty * profile.timePerDifficulty,
      };
    });
  }

  get squares(): Square[] {
    return this._squares;
  }

  public getOtherSquaresInRow(positionOfSquare: number, row: RowName): Square[] {
    return INDICES_PER_ROW[row]
      .filter((index) => index != positionOfSquare)
      .map((index) => this._squares[index]);
  }

  public hasGoal(goal: Goal): boolean {
    return this._squares.some((square) => square.goal && square.goal.id === goal.id);
  }
}
