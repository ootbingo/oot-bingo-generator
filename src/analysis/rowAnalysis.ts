import { SynergyCalculator } from "../synergyCalculator";
import { Mode, Profile } from "../types/settings";
import { Synergies, SynergyFilters } from "../types/synergies";
import { hasGoal, RowName, Square } from "../types/board";
import { BingoList } from "../types/goalList";
import BingoGenerator from "../generator";
import { extractGoalList, parseSynergyFilters } from "../util";
import { DEFAULT_PROFILES } from "../constants/profiles";

export class RowAnalyzer {
  private readonly generator: BingoGenerator;
  private readonly synergyCalculator: SynergyCalculatorAnalysis;

  constructor(bingoList: BingoList, mode: Mode, profile?: Profile) {
    const goalList = extractGoalList(bingoList, mode);
    if (!goalList) {
      throw Error("Could not extract goal list");
    }
    profile = profile ?? DEFAULT_PROFILES[mode];
    this.generator = new BingoGenerator(goalList, mode, profile);
    this.synergyCalculator = new SynergyCalculatorAnalysis(
      profile,
      goalList.rowtypes,
      parseSynergyFilters(goalList.synfilters)
    );
  }

  public analyzeRow(seed: number, row: RowName) {
    const board = this.generator.generateBoard(seed);
    if (!board) {
      return;
    }
    const squares = board.getRow(row);
    this.synergyCalculator.printSynergyReport(squares, row);
    return this.synergyCalculator.getSynergyReport(squares);
  }
}

class SynergyCalculatorAnalysis extends SynergyCalculator {
  constructor(profile: Profile, rowtypeTimeSave: Synergies, synergyFilters: SynergyFilters) {
    super(profile, rowtypeTimeSave, synergyFilters);
  }

  public getSynergyReport(squares: Square[]) {
    const squaresWithGoal = squares.filter(hasGoal);
    const typeSynergiesOfSquares = this.mergeSynergiesOfSquares(squaresWithGoal, "types");
    const subtypeSynergiesOfSquares = this.mergeSynergiesOfSquares(squaresWithGoal, "subtypes");
    const unifiedTypeSynergies = this.unifyTypeSynergies(
      typeSynergiesOfSquares,
      subtypeSynergiesOfSquares
    );
    const rowtypeSynergiesOfSquares = this.mergeSynergiesOfSquares(squaresWithGoal, "rowtypes");
    const filteredTypeSynergies = this.filterTypeSynergies(unifiedTypeSynergies);
    const filteredRowtypeSynergies = this.filterRowtypeSynergies(rowtypeSynergiesOfSquares);
    const timeDifferences = squaresWithGoal.map((square) => square.desiredTime - square.goal.time);
    return {
      typeSynergies: filteredTypeSynergies,
      rowtypeSynergies: filteredRowtypeSynergies,
      timeDifferences: timeDifferences,
      totalSynergies: {
        type: this.calculateTotalTypeSynergy(filteredTypeSynergies),
        rowtype: this.calculateTotalRowtypeSynergy(filteredRowtypeSynergies),
        timeDifference: this.calculateTotalTimeDifference(timeDifferences),
        total: this.calculateTotalSynergy(
          filteredTypeSynergies,
          filteredRowtypeSynergies,
          timeDifferences
        ),
      },
    };
  }

  public printSynergyReport(squares: Square[], row?: RowName) {
    const squaresWithGoal = squares.filter(hasGoal);
    const report = this.getSynergyReport(squares);

    if (row) {
      console.log(`Synergies in ${row}\n=================\n`);
    }
    for (let i = 0; i < squaresWithGoal.length; i++) {
      const square = squaresWithGoal[i];
      console.log(`Goal ${i + 1}: ${square.goal.name}`);
      console.log(
        `  types: ${Object.keys(square.goal.types)
          .map((category) => `${category}: ${square.goal.types[category]}`)
          .join(", ")}`
      );
      if (square.goal.subtypes) {
        console.log(
          `  subtypes: ${Object.keys(square.goal.subtypes)
            .map((category) => `${category}: ${square.goal.subtypes![category]}`)
            .join(", ")}`
        );
      }

      if (square.goal.rowtypes) {
        console.log(
          `  rowtypes: ${Object.keys(square.goal.rowtypes)
            .map((category) => `${category}: ${square.goal.rowtypes![category]}`)
            .join(", ")}\n`
        );
      }
    }

    console.log("Type synergies (filtered):");
    for (const category in report.typeSynergies) {
      console.log(`  ${category}: ${report.typeSynergies[category].join(" ")}`);
    }
    console.log(`  [total]: ${report.totalSynergies.type}`);

    console.log("Rowtype synergies (filtered):");
    for (const category in report.rowtypeSynergies) {
      console.log(`  ${category}: ${report.rowtypeSynergies[category]}`);
    }
    console.log(`  [total]: ${report.totalSynergies.rowtype}`);

    console.log(`Time differences:\n  ${report.timeDifferences.join(" ")}`);
    console.log(`  [total]: ${report.totalSynergies.timeDifference}`);

    console.log(`\nRow synergy (type + rowtype + time differences):`);
    console.log(`  [total]: ${report.totalSynergies.total}`);
  }
}
