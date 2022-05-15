import { SynergyCalculator } from "../synergyCalculator";
import { Mode, Profile } from "../types/settings";
import { Synergies, SynergyFilters } from "../types/synergies";
import { hasGoal, RowName, Square } from "../types/board";
import { BingoList } from "../types/goalList";
import BingoGenerator from "../generator";
import { extractGoalList, parseSynergyFilters } from "../util";
import { DEFAULT_PROFILES } from "../definitions";

export class RowAnalyzer {
  private readonly generator: BingoGenerator;
  private readonly synergyCalculator: SynergyCalculatorAnalysis;

  constructor(bingoList: BingoList, mode: Mode, profile?: Profile) {
    const goalList = extractGoalList(bingoList, mode);
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
    this.synergyCalculator.printSynergyReport(squares);
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

  public printSynergyReport(squares: Square[]) {
    const report = this.getSynergyReport(squares);

    for (let i = 0; i < squares.length; i++) {
      const square = squares[i];
      console.log(`Goal ${i + 1}: ${square.goal.name}`);
      console.log(
        `  types: ${Object.keys(square.goal.types)
          .map((category) => `${category}: ${square.goal.types[category]}`)
          .join(", ")}`
      );
      console.log(
        `  subtypes: ${Object.keys(square.goal.subtypes)
          .map((category) => `${category}: ${square.goal.subtypes[category]}`)
          .join(", ")}`
      );
      console.log(
        `  rowtypes: ${Object.keys(square.goal.rowtypes)
          .map((category) => `${category}: ${square.goal.rowtypes[category]}`)
          .join(", ")}\n`
      );
    }

    console.log("Unified type synergies:");
    for (const category in report.typeSynergies) {
      console.log(`  ${category}: ${report.typeSynergies[category].join(" ")}`);
    }
    console.log(`  [total]: ${report.totalSynergies.type}`);

    console.log("Rowtype synergies:");
    for (const category in report.rowtypeSynergies) {
      console.log(`  ${category}: ${report.rowtypeSynergies[category]}`);
    }
    console.log(`  [total]: ${report.totalSynergies.rowtype}`);

    console.log(`Time differences:\n  ${report.timeDifferences.join(" ")}`);
    console.log(`  [total]: ${report.totalSynergies.timeDifference}`);

    console.log(`\nRow synergy (unified type + rowtype + time differences):`);
    console.log(`  [total]: ${report.totalSynergies.total}`);
  }
}
