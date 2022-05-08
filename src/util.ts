import { BingoList, Goal, GoalList } from "./types/goalList";
import { SynergyFilters } from "./types/synergies";
import { Mode } from "./types/settings";

/**
 * Sorts an array of goals first by time, then by id.
 * @param goalA first goal
 * @param goalB second goal
 */
export function sortByTimeAndId(goalA: Goal, goalB: Goal): number {
  const timeDiff = goalA.time - goalB.time;

  if (timeDiff !== 0) {
    return timeDiff;
  }

  if (goalA.id > goalB.id) {
    return 1;
  } else if (goalA.id < goalB.id) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * Converts a goal list object to a flat, sorted array of goals.
 * @param goalList The original goal list object
 */
export function flattenGoalList(goalList: GoalList): Goal[] {
  let allGoals = [];

  for (let i = 1; i <= 25; i++) {
    allGoals = allGoals.concat(goalList[i]) as Goal[];
  }

  allGoals.sort(sortByTimeAndId);
  return allGoals;
}

/**
 * Splits synergy filter strings into objects with a filter type ('min' or 'max') and a numeric value
 *
 * Synergy filters are strings that start with 'min' or 'max' followed by a space and an integer
 * Examples: 'max -1', 'min 2', 'min -2'
 *
 * @param rawFilters Object containing raw synergy filter strings for synergy types (e.g. {childchu : 'min 1', endon : 'max -1'})
 * @returns Object with parsed SynergyFilters (e.g. {childchu: {filterType: 'min', filterValue: 1}, endon: {'filterType': max}, filterValue: -1})
 */
export function parseSynergyFilters(rawFilters: {
  [key: string]: string;
}): SynergyFilters {
  const parsedFilters: SynergyFilters = {};
  for (const filterType in rawFilters) {
    const rawFilterString = rawFilters[filterType];
    const parsedFilterType = toSynergyFilterType(rawFilterString);
    const parsedFilterValue = toSynergyFilterValue(rawFilterString);

    if (parsedFilterType !== undefined && parsedFilterValue !== undefined) {
      parsedFilters[filterType] = {
        filterType: parsedFilterType,
        filterValue: parsedFilterValue,
      };
    }
  }
  return parsedFilters;
}

function toSynergyFilterType(rawFilterString: string): "min" | "max" | undefined {
  const filterTypeString = rawFilterString.split(" ")[0];
  switch (filterTypeString?.toLowerCase()) {
    case "min":
      return "min";
    case "max":
      return "max";
    default:
      return undefined;
  }
}

function toSynergyFilterValue(rawFilterString: string): number | undefined {
  const filterTypeString = rawFilterString.split(" ")[1];
  const parsedValue = parseInt(filterTypeString, 10);
  if (!isNaN(parsedValue)) {
    return parsedValue;
  }
}

/**
 * Takes the goal list object of a given mode from the full goal list object.
 *
 * @param bingoList The goal list object (generated from the Bingo sheet)
 * @param mode The requested bingo mode
 */
export function extractGoalList(bingoList: BingoList, mode: Mode): GoalList | undefined {
  if (bingoList.info.combined && bingoList.info.combined === "true") {
    const combinedBingoList = bingoList;
    if (combinedBingoList[mode]) {
      return combinedBingoList[mode];
    }
    if (mode === "shortBlackout" && combinedBingoList["short"]) {
      return combinedBingoList["short"];
    }
    if (combinedBingoList["normal"]) {
      return combinedBingoList["normal"];
    } else {
      throw Error(`Goal list doesn't contain a valid sub goal list for mode: "${mode}"`);
    }
  }
}

export function removeHighestNumber(numbers: number[]): number[] {
  return sortAscending(numbers).slice(0, -1);
}

export function sortAscending(numbers: number[]): number[] {
  return [...numbers].sort((a, b) => a - b);
}

export function sortDescending(numbers: number[]): number[] {
  return [...numbers].slice(0).sort((a, b) => b - a);
}
