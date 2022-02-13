import { Mode } from "./options";

export type Profile = {
  minimumSynergy: number; // the minimum synergy allowed in any row
  maximumSynergy: number; // the maximum synergy allowed in any row
  maximumIndividualSynergy: number; // the maximum synergy allowed between any pair of two goals in a row (or on a board in blackouts)
  initialOffset: number; // the initial allowed deviation from the desired time for a goal
  maximumOffset: number; // the maximum allowed deviation from the desired time for a goal
  baselineTime: number; // the base amount of time you need for setup in any row. UNUSED in the generator, but used to analyze rows to calculate row durations. It's the
  timePerDifficulty: number; // the ratio between time and difficulty
  tooMuchSynergy: number; // high number that is returned during synergy calculations whenever synergy is considered too high to continue
  useFrequencyBalancing: boolean; // if true, makes it more likely for goals with higher weights to be picked. if false, ignores weights completely
};

const standardProfile: Profile = {
  minimumSynergy: -3,
  maximumSynergy: 7,
  maximumIndividualSynergy: 3.75,
  initialOffset: 1,
  maximumOffset: 2,
  baselineTime: 27.75,
  timePerDifficulty: 0.75,
  tooMuchSynergy: 100,
  useFrequencyBalancing: true,
};

export type Profiles = {
  [key in Mode]: Profile;
};

export const defaultProfiles: Profiles = {
  normal: standardProfile,
  blackout: {
    ...standardProfile,
    minimumSynergy: -10,
    maximumSynergy: 10,
    maximumIndividualSynergy: 4.5,
    initialOffset: 2,
    maximumOffset: 6,
  },
  short: {
    ...standardProfile,
    maximumSynergy: 3,
    baselineTime: 12,
    timePerDifficulty: 0.5,
  },
};
