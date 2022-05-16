import { hasGoal, Square, SquareWithGoal } from "./types/board";
import { CombinedSynergies, Synergies, SynergyFilters, SynergyType } from "./types/synergies";
import { Profile } from "./types/settings";
import { removeHighestNumber, sortAscending, sortDescending } from "./util";
import { SQUARES_PER_ROW } from "./definitions";

export class SynergyCalculator {
  profile: Profile;
  rowtypeTimeSave: Synergies;
  synergyFilters: SynergyFilters;

  constructor(profile: Profile, rowtypeTimeSave: Synergies, synergyFilters: SynergyFilters) {
    this.profile = profile;
    this.rowtypeTimeSave = rowtypeTimeSave;
    this.synergyFilters = synergyFilters;
  }

  calculateSynergyOfSquares(squares: Square[]): number {
    const squaresWithGoal = squares.filter(hasGoal);

    if (this.containsDuplicateGoals(squaresWithGoal)) {
      return this.profile.tooMuchSynergy;
    }

    // merging (sub)type and rowtype synergies

    const typeSynergiesOfSquares = this.mergeSynergiesOfSquares(squaresWithGoal, "types");
    const subtypeSynergiesOfSquares = this.mergeSynergiesOfSquares(squaresWithGoal, "subtypes");
    const unifiedTypeSynergies = this.unifyTypeSynergies(
      typeSynergiesOfSquares,
      subtypeSynergiesOfSquares
    );

    const rowtypeSynergiesOfSquares = this.mergeSynergiesOfSquares(squaresWithGoal, "rowtypes");

    // filtering (sub)type and rowtype synergies

    const filteredTypeSynergies = this.filterTypeSynergies(unifiedTypeSynergies);

    const filteredRowtypeSynergies = this.filterRowtypeSynergies(rowtypeSynergiesOfSquares);

    // calculating time differences

    const timeDifferences = squaresWithGoal.map((square) => square.desiredTime - square.goal.time);

    // total synergy

    return this.calculateTotalSynergy(
      filteredTypeSynergies,
      filteredRowtypeSynergies,
      timeDifferences
    );
  }

  /**
   * Checks whether an array of squares contains any duplicate goals
   * @param squares Array of squares (can be with goal or empty)
   * @returns boolean
   */
  protected containsDuplicateGoals(squares: Square[]): boolean {
    const squaresWithGoal = squares.filter(hasGoal);
    const goalIds = squaresWithGoal.map((square) => square.goal.id);
    return new Set(goalIds).size !== goalIds.length;
  }

  /**
   * Takes the synergies of a specified synergy type ('type', 'subtype', or 'rowtype') from all the supplied squares, and combines them into one synergy object
   *
   * Simplified example (in case of synergyType = 'types'):
   *    squaresWithGoal = [{types: {'botw': -1, 'czl': 1}}, {types: {'botw': 2, 'saria' : 1.5}}]
   *    returns:          {'botw': [-1, 2], 'czl': [1], 'saria': [1.5]}
   * @param squaresWithGoal Array of squares (that each have a goal)
   * @param synergyType Name of the synergy type ('type', 'rowtype' or 'subtype')
   * @returns Object with synergies for all the squares
   */
  protected mergeSynergiesOfSquares(
    squaresWithGoal: SquareWithGoal[],
    synergyType: SynergyType
  ): CombinedSynergies {
    const mergedSynergies: CombinedSynergies = {};
    for (const square of squaresWithGoal) {
      for (const category in square.goal[synergyType]) {
        if (!mergedSynergies[category]) {
          mergedSynergies[category] = [];
        }
        mergedSynergies[category].push(square.goal[synergyType]![category]);
      }
    }
    return mergedSynergies;
  }

  /**
   * Unifies types and subtypes by taking all the types, and adding subtypes only if a matching type is present
   * Subtype synergies only count when a corresponding type is present.
   *
   * Example: typeSynergies    = {hearts: [1.5, -1], botw: [1]}
   *          subtypeSynergies = {hearts: [2], saria: [3]}
   *          returns:           {hearts: [1.5, -1, 2], botw: [1]}
   * @param typeSynergies Combined type synergies of multiple squares
   * @param subtypeSynergies Combined subtype synergies of multiple squares
   * @returns Object with unified type and subtype synergies
   */
  protected unifyTypeSynergies(
    typeSynergies: CombinedSynergies,
    subtypeSynergies: CombinedSynergies
  ): CombinedSynergies {
    const unifiedTypeSynergies: CombinedSynergies = {};
    for (const typeCategory in typeSynergies) {
      if (typeCategory in subtypeSynergies) {
        unifiedTypeSynergies[typeCategory] = typeSynergies[typeCategory].concat(
          subtypeSynergies[typeCategory]
        );
      } else {
        unifiedTypeSynergies[typeCategory] = typeSynergies[typeCategory];
      }
    }
    return unifiedTypeSynergies;
  }

  protected filterTypeSynergies(unifiedTypeSynergies: CombinedSynergies): CombinedSynergies {
    const effectiveTypeSynergies: CombinedSynergies = {};

    for (const typeCategory in unifiedTypeSynergies) {
      const synergies = unifiedTypeSynergies[typeCategory];

      const effectiveSynergies = this.filterForTypeCategory(typeCategory, synergies);

      if (effectiveSynergies.length > 0) {
        effectiveTypeSynergies[typeCategory] = effectiveSynergies;
      }
    }

    return effectiveTypeSynergies;
  }

  protected filterForTypeCategory(typeCategory: string, synergies: number[]): number[] {
    // in most cases, remove the highest value
    if (!(typeCategory in this.synergyFilters)) {
      return removeHighestNumber(synergies);
    }

    const filter = this.synergyFilters[typeCategory];

    const sortedSynergies =
      filter.filterType === "min" ? sortAscending(synergies) : sortDescending(synergies);
    return sortedSynergies.slice(0, filter.filterValue);
  }

  protected filterRowtypeSynergies(rowtypeSynergies: CombinedSynergies): Synergies {
    const filteredRowtypeSynergies: Synergies = {};

    for (const rowtypeCategory in rowtypeSynergies) {
      const rowtypeSynergy = rowtypeSynergies[rowtypeCategory];

      // don't consider rowtype synergies until we've filled up the entire row
      if (rowtypeSynergy.length < SQUARES_PER_ROW) {
        return filteredRowtypeSynergies;
      }

      const filteredRowtypeSynergy = this.filterForRowtypeCategory(rowtypeCategory, rowtypeSynergy);
      if (filteredRowtypeSynergy !== undefined) {
        filteredRowtypeSynergies[rowtypeCategory] = filteredRowtypeSynergy;
      }
    }
    return filteredRowtypeSynergies;
  }

  /**
   * Filters rowtypeSynergies to only include entries that stay under the threshold
   *
   * Rowtypes (currently ms, hookshot, bottle, and gc lw) are things that are assumed to be done/gotten in every
   * bingo but might be skipped in some rows. The rowtype synergies of each goal state how much time extra time you need
   * to skip doing the thing. If you add up that time of every goal, and it stays under the time you save from skipping
   * (rowtypeTimeSave), it's worth to skip the thing and the synergy is added.
   *
   * @param rowtypeCategory String ('ms', 'hookshot', 'bottle' or 'gc lw')
   * @param synergies Array of rowtype synergies of different squares
   * @returns Amount of time you save by skipping doing 'rowtype', or undefined if not worth
   */
  protected filterForRowtypeCategory(
    rowtypeCategory: string,
    synergies: number[]
  ): number | undefined {
    let rowtypeCost = 0;
    for (const synergy of synergies) {
      rowtypeCost += synergy;
    }

    // amount of time you save from skipping this in a row
    const rowtypeThreshold = this.rowtypeTimeSave[rowtypeCategory];

    // "regular" rowtype synergy
    if (rowtypeThreshold > 0 && rowtypeThreshold > rowtypeCost) {
      return rowtypeThreshold - rowtypeCost;
    }
    // "reverse" rowtype synergy
    else if (rowtypeThreshold < 0 && rowtypeThreshold > rowtypeCost) {
      return rowtypeCost - rowtypeThreshold;
    }
  }

  /**
   * Calculates the total synergy of a group of squares by adding up their total (filtered) type synergies, rowtype synergies,
   * and time differences
   *
   * @param filteredTypeSynergies Arrays of type synergies per type category, e.g. {botw: [1, -2], skulls: [3]}
   * @param filteredRowtypeSynergies Rowtype synergy per rowtype category, e.g. {ms: 5, hookshot: 1}
   * @param timeDifferences Array of differences between desired time and time of each goal, e.g. [1, -0.5, 0, 1, -1]. Positive value means goal is faster than desired.
   * @returns Total synergy
   */
  protected calculateTotalSynergy(
    filteredTypeSynergies: CombinedSynergies,
    filteredRowtypeSynergies: Synergies,
    timeDifferences: number[]
  ): number {
    let totalSynergy = 0;

    // add type synergies to total sum
    totalSynergy += this.calculateTotalTypeSynergy(filteredTypeSynergies);

    if (totalSynergy >= this.profile.tooMuchSynergy) {
      return this.profile.tooMuchSynergy;
    }

    // add rowtype synergies to total sum
    totalSynergy += this.calculateTotalRowtypeSynergy(filteredRowtypeSynergies);

    // add time differences to total sum
    totalSynergy += this.calculateTotalTimeDifference(timeDifferences);

    return totalSynergy;
  }

  protected calculateTotalTypeSynergy(filteredTypeSynergies: CombinedSynergies): number {
    let totalTypeSynergy = 0;

    for (const typeCategory in filteredTypeSynergies) {
      const synergies = filteredTypeSynergies[typeCategory];

      for (const synergy of synergies) {
        if (synergy > this.profile.maximumIndividualSynergy) {
          return this.profile.tooMuchSynergy;
        }
        totalTypeSynergy += synergy;
      }
    }
    return totalTypeSynergy;
  }

  protected calculateTotalRowtypeSynergy(filteredRowtypeSynergies: Synergies): number {
    let totalRowtypeSynergy = 0;
    for (const rowtypeCategory in filteredRowtypeSynergies) {
      totalRowtypeSynergy += filteredRowtypeSynergies[rowtypeCategory];
    }
    return totalRowtypeSynergy;
  }

  protected calculateTotalTimeDifference(timeDifferences: number[]): number {
    let totalTimeDifference = 0;
    for (const timeDifference of timeDifferences) {
      totalTimeDifference += timeDifference;
    }
    return totalTimeDifference;
  }
}
