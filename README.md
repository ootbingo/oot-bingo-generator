# oot-bingo-generator

![image](https://img.shields.io/npm/v/oot-bingo-generator)

Generator for OoT Bingo, written in TypeScript. Based on the original bingo generator by saltor et al. It generates the
exact same boards as the previous generator did, but should be easier to read and extend. The npm package can be used to
easily generate boards in projects.

## Documentation

Click on these links for in-depth explanations about the workings of bingo board generation:

### :gear: [The Generator](/doc/GENERATOR.md)

Explains how bingo boards are generated, with examples. The text points to the source code a few times, but can be read
without having any programming knowledge. It's a *strongly recommended* read if you want to learn about bingo
generation!
Includes topics like the *magic square*, *desired goal times*, *difficulty* and *picking goals*.

### :balance_scale: [Balancing (bingo sheet)](/doc/BALANCING.md)

Everything you need to know about the
[Bingo sheet](https://docs.google.com/spreadsheets/d/1-mD-OTM0Re7PyNf224MAsRuqQ0umI0E_Qq6nr1vA1aE/edit#gid=166040247).
Goes in detail over the different synergy types, synergy filters, the columns on the sheet, and the goal list format.
Recommended if you're interested in balancing!

### :abacus: [Synergy Calculation](/doc/SYNERGY_CALCULATION.md)

Learn how the total synergy of a row is calculated. The document follows the calculation code step-by-step with
examples. Having coding knowledge helps, but it shouldn't be too hard to understand without. It's recommended to read
the generator doc first.

## Npm package

### Install

Install the [npm package](https://www.npmjs.com/package/oot-bingo-generator) to generate boards in a project:

```bash
npm install --save oot-bingo-generator
```

You'll probably want to install the [OoT Bingo Lists package](https://www.npmjs.com/package/oot-bingo-lists) as well, so
that you don't have to provide your own goal lists to the generator:

```bash
npm install --save oot-bingo-lists
```

### Usage

Generate a board:

```ts
import { generateBingoBoard } from "oot-bingo-generator";
import { getBingoList } from "oot-bingo-lists";

const bingoList = getBingoList("v10.1");

// generate a board
const board = generateBingoBoard(bingoList, "normal", 654321);
console.log(board.goalNames);
```

Generate a board with custom settings and run analyses:

```ts
import { generateBingoBoard, RowAnalyzer, DEFAULT_PROFILES } from "oot-bingo-generator";
import { getBingoList } from "oot-bingo-lists";
import { analyzeFrequencies, printFrequencies } from "./frequencyAnalysis";

const bingoList = getBingoList("v10.1");

// generate a board with custom profile settings
const customProfile = {
  ...DEFAULT_PROFILES.normal,
  // overwrite a few settings from the normal profile
  minimumSynergy: -5,
  maximumSynergy: 9,
  maximumIndividualSynergy: 4,
  useFrequencyBalancing: false,
};
const board = generateBingoBoard(bingoList, "normal", 654321, customProfile);
console.log(board.goalNames);

// run a frequency analysis on a 1000 boards
const frequencies = analyzeFrequencies(1000, bingoList, "normal", customProfile);
printFrequencies(frequencies);

// print the synergy analysis of a row (obviously banned to use for races)
const rowAnalyzer = new RowAnalyzer(bingoList, "normal", customProfile);
rowAnalyzer.analyzeRow(654321, "col4");
```

Note that using a bingo list of a certain version (like `v9.2`) does not necessarily guarantee that the generated boards
will be identical to the boards of that version. The `profile` settings also need to match. It is planned to bundle the
settings with the bingo lists in the future.

## Source code

### Install

For installing the dependencies of the source code (not using the [npm package](#npm-package)):

```bash
npm install
```

### Run

To run the sandbox code which generates boards using an example goal list (v10.1), run:

```bash
npm start
```

This will run [src/sandbox/main.ts](/src/sandbox/main.ts). You can edit this code or add your own code to experiment
with the generator.

### Test

To run the tests:

```bash
npm test
```

The tests verify that the generator generates the exact same boards as the current `v10.1` live version does.

### Bundle

To bundle the generator code into a single, minified JS file (to be used for bingo versions in production):

```bash
npm run bundle
```

The generated file can be found in `dist/generator.js`. After putting this script in the html, the main generator
functions in [src/index.ts](/src/index.ts) can be accessed from the `BingoLibrary` (
e.g. `BingoLibrary.ootBingoGenerator(bingoList, options)`).

### Usage

The main functions for generating a board are located in [src/index.ts](/src/index.ts).

The `ootBingoGenerator()` function returns boards in the exact same legacy format that is expected by the current bingo
versions on [Github](https://github.com/ootbingo/bingo). The `bingoGenerator()` function is a wrapper and returns the
same thing, but this is the name that is being used by [BingoSync](https://bingosync.com).

It's recommended to use the `generateBingoBoard()` function when generating boards yourself, since it returns a bingo
board object. If you want to try it out, you can easily do so in [src/sandbox/main.ts](/src/sandbox/main.ts)
(see [Run](#run)). To generate boards in your own project, use the [npm package](#npm-package).

## To do

If anything is missing, wrong, or incomplete, feel free to let someone in the Bingo community know! You could also open
an issue. A few things that would be nice to add to this project are:

* [BALANCING.md](/doc/BALANCING.md): add explanations on what the less obvious synergy columns are for (`childchu`
  , `chuczl`, `ganonchu`, `aganon`, `bganon`, `cganon`, `childreset`, `bosskey`, `bosskey2`, `inc`, maybe more)
* Add a new doc about **timing goals**. What do we generally include and exclude in the timing of a goal? How would one
  go about (re-)timing a goal?