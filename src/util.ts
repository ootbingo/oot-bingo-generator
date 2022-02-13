import { BingoList, Goal, GoalList } from "./types/goalList";
import { Synfilters } from "./types/synergies";
import { Mode } from "./types/options";

/**
 * Can be used to sort an array of goals first by their time, then by their id ascending.
 *
 * @param a first goal
 * @param b second goal
 */
export function sortByTimeAndId(a: Goal, b: Goal): number {
  const timeDiff = a.time - b.time;

  if (timeDiff !== 0) {
    return timeDiff;
  }

  if (a.id > b.id) {
    return 1;
  } else if (a.id < b.id) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * Generate a sorted array of goals from a complex goal list object.
 *
 * @param goalList The original goal list.
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
 * Synergy filters are strings that start with 'max' or 'min' followed by a space and a number
 * Examples: 'max -1', 'min 2', 'min -2'
 *
 * Splits synergy filter strings into objects with 'max' or 'min' and the numeric value
 *
 * @param filters Object with a synergy filter string for several types (e.g. {childchu : 'min 1', endon : 'max -1'})
 * @returns Object with the parsed Synfilters (e.g. {childchu: {minmax: 'min', value: 1}, endon: {'minmax': max}, value: -1})
 */
export function parseSynergyFilters(filters: {
  [key: string]: string;
}): Synfilters {
  const parsedFilters = {};
  for (const filterType in filters) {
    const splitFilter = filters[filterType].split(" ");
    if (
      splitFilter[0].toLowerCase() !== "min" &&
      splitFilter[0].toLowerCase() !== "max"
    ) {
      continue;
    }
    parsedFilters[filterType] = {
      minmax: splitFilter[0],
      value: parseInt(splitFilter[1], 10),
    };
  }
  return parsedFilters;
}

/**
 * Extracts the goal list for a given mode from the full definition of bingo goals.
 *
 * @param bingoList The JavaScript object generated from the goal CSV.
 * @param mode The requested mode.
 */
export function extractGoalList(
  bingoList: BingoList,
  mode: Mode
): GoalList | undefined {
  if (bingoList.info.combined && bingoList.info.combined === "true") {
    const combinedBingoList = bingoList;
    if (combinedBingoList[mode]) {
      return combinedBingoList[mode];
    } else if (combinedBingoList["normal"]) {
      return combinedBingoList["normal"];
    } else {
      throw Error(
        `Goal list doesn't contain a valid sub goal list for mode: "${mode}"`
      );
    }
  }
}

export const removeHighestNumber = (numbers: number[]): number[] => {
  return sortAscending(numbers).slice(0, -1);
};

export const sortAscending = (numbers: number[]): number[] => {
  return [...numbers].sort((a, b) => a - b);
};

export const sortDescending = (numbers: number[]): number[] => {
  return [...numbers].slice(0).sort((a, b) => b - a);
};
