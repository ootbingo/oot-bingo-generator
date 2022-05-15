import { hasGoal, RowName, Square, SquareWithGoal } from "./types/board";
import { INDICES_PER_ROW } from "./definitions";
import { Goal } from "./types/goalList";

/**
 * Successfully generated bingo board. All the squares have a goal assigned to it.
 */
export class BingoBoard {
  private readonly _squares: SquareWithGoal[];
  private readonly _iterations: number;

  constructor(squares: Square[], iterations: number) {
    this._squares = squares.map((square) => {
      if (!hasGoal(square)) {
        throw Error("Every square needs to have a goal to create a BingoBoard");
      }
      return square;
    });
    this._iterations = iterations;
  }

  get iterations(): number {
    return this._iterations;
  }

  get squares(): SquareWithGoal[] {
    return this._squares;
  }

  get goals(): Goal[] {
    return this._squares.map((square) => square.goal);
  }

  get goalNames(): string[] {
    return this.goals.map((goal) => goal.name);
  }

  public getRow(row: RowName): SquareWithGoal[] {
    return INDICES_PER_ROW[row].map((index) => this._squares[index]);
  }
}
