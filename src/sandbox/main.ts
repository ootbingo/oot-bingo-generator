import { generateBingoBoard } from "../index";
import { exampleBingoList } from "./exampleBingoList";
import { analyzeFrequencies, printFrequencies } from "../analysis/frequencyAnalysis";
import { RowAnalyzer } from "../analysis/rowAnalysis";
import { DEFAULT_PROFILES } from "../constants/profiles";

// this file shows a few examples of how to use the generator (generate a board, run a frequency analysis)
// run this file with `npm start`
// edit this code or add your own to experiment with the generator!

// generate a board
const mode = "normal";
const seed = 112233;

const board = generateBingoBoard(exampleBingoList, mode, seed);
console.log(`Generated after ${board?.iterations} iteration(s):`);
console.log(board?.goalNames);

// overwrite some of the generator settings of the default normal profile and generate another board
const customProfile = {
  ...DEFAULT_PROFILES.normal,
  minimumSynergy: -5,
  maximumSynergy: 9,
  maximumIndividualSynergy: 4,
  useFrequencyBalancing: false,
};

const boardCustomProfile = generateBingoBoard(exampleBingoList, mode, seed, customProfile);
console.log(`Generated after ${board?.iterations} iteration(s):`);
console.log(boardCustomProfile?.goalNames);

// run a goal frequency analysis on 100 boards
const frequencies = analyzeFrequencies(100, exampleBingoList, "normal");
printFrequencies(frequencies);

// print the synergy analysis of a row (obviously banned to use for races)
const rowAnalyzer = new RowAnalyzer(exampleBingoList, "normal");
rowAnalyzer.analyzeRow(seed, "col4");
