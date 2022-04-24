import { Mode } from "./options";

// profile with the settings for the generator
export type Profile = {
  minimumSynergy: number; // the minimum synergy allowed in any row
  maximumSynergy: number; // the maximum synergy allowed in any row
  maximumIndividualSynergy: number; // the maximum synergy allowed between any pair of two goals in a row (or on a board in blackouts)
  initialOffset: number; // the initial allowed deviation from the desired time for a goal
  maximumOffset: number; // the maximum allowed deviation from the desired time for a goal
  baselineTime: number; // the base amount of time you need for setup in any row. UNUSED in the generator, but used to analyze rows to calculate row durations.
  timePerDifficulty: number; // the ratio between time and difficulty
  tooMuchSynergy: number; // a very high value that is returned during synergy calculations whenever synergy is considered too high to continue
  useFrequencyBalancing: boolean; // if true, makes it more likely for goals with higher weights to be picked. if false, ignores weights completely
};

export type Profiles = {
  [key in Mode]: Profile;
};
