import { Goal } from "./goalList";

export type Square = {
  difficulty: number;
  desiredTime: number;
  goal?: Goal;
};

export type Card = {
  goals: Goal[];
  meta: Meta;
};

type Meta = {
  iterations: number;
};

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
