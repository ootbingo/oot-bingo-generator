import { Square } from "./domain/board";
import {
  CombinedSynergies,
  Synergies,
  SynergyType,
  Synfilters,
} from "./domain/synergies";
import { Profile } from "./domain/profiles";
import { SQUARES_PER_ROW } from "./domain/rows";

export class SynergyCalculator {
  profile: Profile;
  rowtypeTimeSave: Synergies;
  synergyFilters: Synfilters;

  constructor(
    profile: Profile,
    rowtypeTimeSave: Synergies,
    synergyFilters: Synfilters
  ) {
    this.profile = profile;
    this.rowtypeTimeSave = rowtypeTimeSave;
    this.synergyFilters = synergyFilters;
  }

  synergyOfSquares(squares: Square[]) {
    const squaresWithGoal = squares.filter(
      (square) => square.goal !== undefined
    );

    if (this.#containsDuplicateGoals(squaresWithGoal)) {
      return this.profile.tooMuchSynergy;
    }

    const typeSynergiesOfSquares = this.#mergeSynergiesOfSquares(
      squaresWithGoal,
      "types"
    );
    const subtypeSynergiesOfSquares = this.#mergeSynergiesOfSquares(
      squaresWithGoal,
      "subtypes"
    );
    const unifiedTypeSynergies = this.#unifyTypeSynergies(
      typeSynergiesOfSquares,
      subtypeSynergiesOfSquares
    );
    const filteredTypeSynergies =
      this.#filterTypeSynergies(unifiedTypeSynergies);

    const rowtypeSynergiesOfSquares = this.#mergeSynergiesOfSquares(
      squaresWithGoal,
      "rowtypes"
    );
    const filteredRowtypeSynergies = this.#filterRowtypeSynergies(
      rowtypeSynergiesOfSquares
    );

    const timeDifferences = squaresWithGoal.map(
      (square) => square.desiredTime - square.goal.time
    );

    return this.#calculateTotalSynergy(
      filteredTypeSynergies,
      filteredRowtypeSynergies,
      timeDifferences
    );
  }

  /**
   * Checks whether an array of squares contains any duplicate goals
   * @param squares Array of squares (can be goal or empty)
   * @returns boolean
   */
  #containsDuplicateGoals(squares: Square[]): boolean {
    const squaresWithGoal = squares.filter((square) => square.goal);
    const goalIds = squaresWithGoal.map((square) => square.goal.id);
    return new Set(goalIds).size !== goalIds.length;
  }

  /**
   * Takes all synergies of a certain type of all the squares in the array and combines them into one synergy object
   * Example: [{types: {'botw': -1, 'czl': 1}}, {types: {'botw': 2, 'saria' : 1.5}}] ->
   *          {'botw': [-1, 2], 'czl': [1], 'saria': [1.5]}
   * @param squaresWithGoal Array of squares (that each have a goal)
   * @param synergyType Name of the type ('type', 'rowtype' or 'subtype')
   * @returns object with synergies for all the squares
   */
  #mergeSynergiesOfSquares(
    squaresWithGoal: Square[],
    synergyType: SynergyType
  ): CombinedSynergies {
    const mergedSynergies = {};
    for (const square of squaresWithGoal) {
      for (const type in square.goal[synergyType]) {
        if (!mergedSynergies[type]) {
          mergedSynergies[type] = [];
        }
        mergedSynergies[type].push(square.goal[synergyType][type]);
      }
    }
    return mergedSynergies;
  }

  /**
   * Unifies types and subtypes by taking all the types, and adding subtypes only if a matching subtype is present
   * Example: typeSynergies = {hearts: [1.5, -1], botw: [1]}   subtypeSynergies = {hearts: [2], saria: [3]} ->
   *          {hearts: [1.5, -1, 2], botw: [1]}
   * @param typeSynergies Combined type synergies of multiple squares
   * @param subtypeSynergies Combined subtype synergies of multiple squares
   * @returns object with unified type and subtype synergies
   */
  #unifyTypeSynergies(
    typeSynergies: CombinedSynergies,
    subtypeSynergies: CombinedSynergies
  ): CombinedSynergies {
    const unifiedTypeSynergies = {};
    for (const type in typeSynergies) {
      if (type in subtypeSynergies) {
        unifiedTypeSynergies[type] = typeSynergies[type].concat(
          subtypeSynergies[type]
        );
      } else {
        unifiedTypeSynergies[type] = typeSynergies[type];
      }
    }
    return unifiedTypeSynergies;
  }

  #filterTypeSynergies(unifiedTypeSynergies: CombinedSynergies) {
    const effectiveTypeSynergies = {};

    for (const type in unifiedTypeSynergies) {
      const synergies = unifiedTypeSynergies[type];

      const effectiveSynergies = this.#filterForType(type, synergies);

      if (effectiveSynergies.length > 0) {
        effectiveTypeSynergies[type] = effectiveSynergies;
      }
    }

    return effectiveTypeSynergies;
  }

  #filterForType(type: string, synergies: number[]): number[] {
    // in most cases, remove highest synergy
    if (!(type in this.synergyFilters)) {
      return removeHighestNumber(synergies);
    }

    const filter = this.synergyFilters[type];

    const sortedSynergies =
      filter.minmax === "min"
        ? sortAscending(synergies)
        : sortDescending(synergies);
    return sortedSynergies.slice(0, filter.value);
  }

  #filterRowtypeSynergies(rowtypeSynergies: CombinedSynergies): Synergies {
    const filteredRowtypeSynergies = {};

    for (const rowtype in rowtypeSynergies) {
      const rowtypeSynergy = rowtypeSynergies[rowtype];

      // don't consider rowtype synergies until we've filled up the entire row
      if (rowtypeSynergy.length < SQUARES_PER_ROW) {
        return filteredRowtypeSynergies;
      }

      const filteredRowtypeSynergy = this.#filterForRowtype(
        rowtype,
        rowtypeSynergy
      );
      if (filteredRowtypeSynergy !== undefined) {
        filteredRowtypeSynergies[rowtype] = filteredRowtypeSynergy;
      }
    }
    return filteredRowtypeSynergies;
  }

  /**
   * Rowtypes (currently ms, hookshot, bottle, and gc lw) are things that are assumed to be done/gotten in every
   * bingo but might be skipped in some rows. The rowtype synergies of each goal state how much time extra time you need
   * to skip doing the thing. If you add up that time of every goal and it stays under the time you save from skipping
   * (rowtypeTimeSave), it's worth to skip the thing and the synergy is added.
   *
   * Filters rowtypeSynergies to only include entries that stay under the threshold
   * @param rowtype String ('ms', 'hookshot', 'bottle' or 'gc lw')
   * @param synergies Array of rowtype synergies of different squares
   * @returns amount of time you save by skipping doing 'rowtype', or undefined if not worth
   */
  #filterForRowtype(rowtype: string, synergies: number[]): number | undefined {
    let rowtypeCost = 0;
    for (const synergy of synergies) {
      rowtypeCost += synergy;
    }

    // amount of time you save from skipping this in a row
    const rowtypeThreshold = this.rowtypeTimeSave[rowtype];

    // "regular" row type synergy
    if (rowtypeThreshold > 0 && rowtypeThreshold > rowtypeCost) {
      return rowtypeThreshold - rowtypeCost;
    }
    // "reverse" row type synergy
    else if (rowtypeThreshold < 0 && rowtypeThreshold > rowtypeCost) {
      return rowtypeCost - rowtypeThreshold;
    }
  }

  /**
   * The total synergy of a group of squares is calculated by adding up their total (filtered) type synergies, rowtype synergies,
   * and time differences
   *
   * @param filteredTypeSynergies Arrays of type synergies per type, e.g. {botw: [1, -2], skulls: [3]}
   * @param filteredRowtypeSynergies Rowtype synergy per type, e.g. {ms: 5, hookshot: 1}
   * @param timeDifferences Array of differences between desired time and time of each goal, e.g. [1, -0.5, 0, 1, -1]. Positive value means goal is faster than desired.
   * @returns total synergy
   */
  #calculateTotalSynergy(
    filteredTypeSynergies: CombinedSynergies,
    filteredRowtypeSynergies: Synergies,
    timeDifferences: number[]
  ): number {
    let totalSynergyOfSquares = 0;

    // add type synergies to total sum
    for (const type in filteredTypeSynergies) {
      const synergies = filteredTypeSynergies[type];

      for (const synergy of synergies) {
        if (synergy > this.profile.maximumIndividualSynergy) {
          return this.profile.tooMuchSynergy;
        }
        totalSynergyOfSquares += synergy;
      }
    }

    // add row type synergies to total sum
    for (const rowtype in filteredRowtypeSynergies) {
      totalSynergyOfSquares += filteredRowtypeSynergies[rowtype];
    }

    // add time differences to total sum
    for (const timeDifference of timeDifferences) {
      totalSynergyOfSquares += timeDifference;
    }

    return totalSynergyOfSquares;
  }
}

function removeHighestNumber(numbers: number[]): number[] {
  return sortAscending(numbers).slice(0, -1);
}

function sortAscending(numbers: number[]): number[] {
  return numbers.slice(0).sort((a, b) => a - b);
}

function sortDescending(numbers: number[]): number[] {
  return numbers.slice(0).sort((a, b) => b - a);
}
