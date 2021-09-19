import { Synergies } from './synergies';

export type Goal = {
    difficulty: number;
    id: string;
    jp: string;
    name: string;
    skill: number;
    time: number;
    weight?: number;
    rowtypes?: Synergies
    types: Synergies
    subtypes?: Synergies
}

export type BingoList = CombinedGoalList;

type CombinedGoalList = {
    normal: GoalList;
    short: GoalList;
    info: {
        version: string;
        combined: string;
    }
}

export type GoalList = {
    info: {
        version: string;
        combined?: string
    }
    rowtypes: Synergies;
    synfilters: {
        [key: string]: string
    };
    averageStandardDeviation?: number;
    '0'?: Goal[];
    '1'?: Goal[];
    '2'?: Goal[];
    '3'?: Goal[];
    '4'?: Goal[];
    '5'?: Goal[];
    '6'?: Goal[];
    '7'?: Goal[];
    '8'?: Goal[];
    '9'?: Goal[];
    '10'?: Goal[];
    '11'?: Goal[];
    '12'?: Goal[];
    '13'?: Goal[];
    '14'?: Goal[];
    '15'?: Goal[];
    '16'?: Goal[];
    '17'?: Goal[];
    '18'?: Goal[];
    '19'?: Goal[];
    '20'?: Goal[];
    '21'?: Goal[];
    '22'?: Goal[];
    '23'?: Goal[];
    '24'?: Goal[];
    '25'?: Goal[];
    '26'?: Goal[];
    '27'?: Goal[];
    '28'?: Goal[];
    '29'?: Goal[];
    '30'?: Goal[];
    '31'?: Goal[];
    '32'?: Goal[];
    '33'?: Goal[];
    '34'?: Goal[];
    '35'?: Goal[];
    '36'?: Goal[];
    '37'?: Goal[];
    '38'?: Goal[];
    '39'?: Goal[];
    '40'?: Goal[];
    '41'?: Goal[];
    '42'?: Goal[];
    '43'?: Goal[];
    '44'?: Goal[];
    '45'?: Goal[];
    '46'?: Goal[];
    '47'?: Goal[];
    '48'?: Goal[];
    '49'?: Goal[];
    '50'?: Goal[];
}