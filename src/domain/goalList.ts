import { Synergies} from "./synergies";

export type Goal = {
    difficulty: number;
    id: string;
    jp: string;
    name: string;
    skill: number;
    time: number;
    weight: number;
    rowtypes: Synergies
    types: Synergies
    subtypes: Synergies
}

export type BingoList = GoalList | CombinedGoalList;


export type GoalList = GoalsPerDifficulty & GoalListProperties;

type GoalsPerDifficulty = {
    [difficulty: string]: Goal[];
}

type GoalListProperties = {
    info: {
        version: string;
        combined: "false";
    }
    rowtypes: Synergies;
    synfilters: {
        [key: string]: string
    };
    averageStandardDeviation: number;
}


export type CombinedGoalList = GoalListPerMode & CombinedGoalListProperties

type GoalListPerMode =  {
    [mode in GoalListMode]: GoalList;
}

type CombinedGoalListProperties = {
    info: {
        version: string;
        combined: "true";
    }
}
