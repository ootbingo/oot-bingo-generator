export type SynergyType = "types" | "subtypes" | "rowtypes";

export type Synergies = {
  [key: string]: number;
};

export type CombinedSynergies = {
  [key: string]: number[];
};

export type SynergyFilters = {
  [key: string]: SynergyFilter;
};

export type SynergyFilter = {
  filterType: "min" | "max";
  filterValue: number;
};
