export type Profile = {
    minimumSynergy: number;
    maximumSynergy: number;
    maximumIndividualSynergy: number;
    maximumSpill: number;
    initialOffset: number;
    maximumOffset: number;
    baselineTime: number;
    timePerDifficulty: number;
    tooMuchSynergy: number;
}

type Profiles = {
    [key in Mode]: Profile;
}

const defaultProfile: Profile = {
    minimumSynergy: -3,
    maximumSynergy: 7,
    maximumIndividualSynergy: 3.75,
    maximumSpill: 2,
    initialOffset: 1,
    maximumOffset: 2,
    baselineTime: 27.75,
    timePerDifficulty: 0.75,
    tooMuchSynergy: 100
}

export const profiles: Profiles = {
    normal: {
        minimumSynergy: defaultProfile.minimumSynergy,
        maximumSynergy: defaultProfile.maximumSynergy,
        maximumIndividualSynergy: defaultProfile.maximumIndividualSynergy,
        maximumSpill: defaultProfile.maximumSpill,
        initialOffset: defaultProfile.initialOffset,
        maximumOffset: defaultProfile.maximumOffset,
        baselineTime: defaultProfile.baselineTime,
        timePerDifficulty: defaultProfile.timePerDifficulty,
        tooMuchSynergy: defaultProfile.tooMuchSynergy
    },
    blackout: defaultProfile,
    short: defaultProfile,
}