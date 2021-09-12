export type SynergyType = 'types' | 'subtypes' | 'rowtypes';

export type Synergies = {
    [key in string]: number;
}

export type CombinedSynergies = {
    [key in string]: number[];
}

export type Synfilters = {
    [key: string]: {
        minmax: 'min' | 'max';
        value: number;
    }
}