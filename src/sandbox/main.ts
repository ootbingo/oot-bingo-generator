import { bingoList } from "./example-goal-list";
import { DEFAULT_PROFILES } from "../definitions";
import { generateBoard } from "../index";

// this file shows a few examples of how to use the generator (generate a board, run a frequency analysis)
// run this file with `npm start`
// edit this code or add your own to experiment with the generator!

// generate a board
const mode = "normal";
const seed = 112233;

const board = generateBoard(bingoList, mode, seed);
console.log(`Generated after ${board.meta.iterations} iteration(s):`);
console.log(board.goals.map((goal) => goal.name));

// overwrite some of the generator settings of the default normal profile and generate another board
const customProfile = {
  ...DEFAULT_PROFILES.normal,
  minimumSynergy: -5,
  maximumSynergy: 9,
  maximumIndividualSynergy: 4,
  useFrequencyBalancing: false
};

const boardCustomProfile = generateBoard(bingoList, mode, seed, customProfile);
console.log(`Generated after ${board.meta.iterations} iteration(s):`);
console.log(boardCustomProfile.goals.map((goal) => goal.name));

// run a goal frequency analysis on 100 boards (uncomment next 3 lines)
// import { frequencyAnalysis } from "./frequencyAnalysis";
// const frequencies = frequencyAnalysis(200, bingoList, "normal");
// console.log(frequencies);
