import { Profile, Profiles } from "./types/profiles";
import { RowName } from "./types/board";

export const SQUARES_PER_ROW = 5;

export const SQUARE_POSITIONS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
] as const;

export const INDICES_PER_ROW: { [key in RowName]: number[] } = {
  row1: [0, 1, 2, 3, 4],
  row2: [5, 6, 7, 8, 9],
  row3: [10, 11, 12, 13, 14],
  row4: [15, 16, 17, 18, 19],
  row5: [20, 21, 22, 23, 24],
  col1: [0, 5, 10, 15, 20],
  col2: [1, 6, 11, 16, 21],
  col3: [2, 7, 12, 17, 22],
  col4: [3, 8, 13, 18, 23],
  col5: [4, 9, 14, 19, 24],
  tlbr: [0, 6, 12, 18, 24],
  bltr: [4, 8, 12, 16, 20],
};

export const ROWS_PER_INDEX: { [key: number]: RowName[] } = {
  0: ["row1", "col1", "tlbr"],
  1: ["row1", "col2"],
  2: ["row1", "col3"],
  3: ["row1", "col4"],
  4: ["row1", "col5", "bltr"],
  5: ["row2", "col1"],
  6: ["row2", "col2", "tlbr"],
  7: ["row2", "col3"],
  8: ["row2", "col4", "bltr"],
  9: ["row2", "col5"],
  10: ["row3", "col1"],
  11: ["row3", "col2"],
  12: ["row3", "col3", "tlbr", "bltr"],
  13: ["row3", "col4"],
  14: ["row3", "col5"],
  15: ["row4", "col1"],
  16: ["row4", "col2", "bltr"],
  17: ["row4", "col3"],
  18: ["row4", "col4", "tlbr"],
  19: ["row4", "col5"],
  20: ["row5", "col1", "bltr"],
  21: ["row5", "col2"],
  22: ["row5", "col3"],
  23: ["row5", "col4"],
  24: ["row5", "col5", "tlbr"],
};

const STANDARD_PROFILE: Profile = {
  minimumSynergy: -3,
  maximumSynergy: 7,
  maximumIndividualSynergy: 3.75,
  initialOffset: 1,
  maximumOffset: 2,
  baselineTime: 27.75,
  timePerDifficulty: 0.75,
  tooMuchSynergy: 100,
  useFrequencyBalancing: true,
} as const;

export const DEFAULT_PROFILES: Profiles = {
  normal: STANDARD_PROFILE,
  blackout: {
    ...STANDARD_PROFILE,
    minimumSynergy: -10,
    maximumSynergy: 10,
    maximumIndividualSynergy: 4.5,
    initialOffset: 2,
    maximumOffset: 6,
  },
  short: {
    ...STANDARD_PROFILE,
    maximumSynergy: 3,
    baselineTime: 12,
    timePerDifficulty: 0.5,
  },
} as const;
