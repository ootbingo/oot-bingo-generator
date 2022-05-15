import { Goal } from "./goalList";

export type Square = {
  difficulty: number;
  desiredTime: number;
  goal?: Goal;
};

export type SquareWithGoal = {
  difficulty: number;
  desiredTime: number;
  goal: Goal;
};

export function hasGoal(square: Square): square is SquareWithGoal {
  return square.goal !== undefined;
}

export type RowName =
  | "row1"
  | "row2"
  | "row3"
  | "row4"
  | "row5"
  | "col1"
  | "col2"
  | "col3"
  | "col4"
  | "col5"
  | "tlbr"
  | "bltr";
