import { Profile, Profiles } from "../types/settings";

// default profiles for the generator settings
// see the Profile type in src/types/settings.ts for more details on what each setting does
const STANDARD_PROFILE: Profile = {
  minimumSynergy: -3,
  maximumSynergy: 7,
  maximumIndividualSynergy: 3.75,
  initialOffset: 1,
  maximumOffset: 2,
  baselineTime: 24.75,
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
  shortBlackout: {
    ...STANDARD_PROFILE,
    minimumSynergy: -4,
    maximumSynergy: 4,
    initialOffset: 2,
    maximumOffset: 6,
    baselineTime: 12,
    timePerDifficulty: 0.5,
  },
};
