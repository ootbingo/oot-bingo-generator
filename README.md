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

### :stopwatch: [Timing goals](/doc/TIMING.md)

How is the duration of a goal determined? This document explains the considerations and steps that go into timing a goal
and determining its synergies. A few concepts used are explained in more detail in the Balancing doc, so it's
recommended to read that one first.

## Npm package

### Install

Install the [npm package](https://www.npmjs.com/package/oot-bingo-generator) to generate boards in a project:

```sh
npm install --save oot-bingo-generator
```

You may want to install these related packages as well:

* [oot-bingo-lists](https://www.npmjs.com/package/oot-bingo-lists) contains the goal lists and generators of current and
  past bingo versions
* [oot-bingo-tools](https://www.npmjs.com/package/oot-bingo-tools) has various analysis functions including goal
  frequency analysis and changelog generation

Refer to their READMEs for more information on what these packages provide.

```sh
npm install --save oot-bingo-lists
npm install --save oot-bingo-tools
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

// print the synergy analysis of a row (obviously banned to use for races)
const rowAnalyzer = new RowAnalyzer(bingoList, "normal", customProfile);
rowAnalyzer.analyzeRow(654321, "col4");
```

Note that using a bingo list of a specific version (like `v9.2`) with the latest generator version in this package does
*not* necessarily guarantee that the resulting boards
will be identical to the boards of that version.
The `profile` settings also need to match.
The [oot-bingo-lists](https://www.npmjs.com/package/oot-bingo-lists) package contains a function to generate a boards
for a specific version.

## Run source code directly

### Install

If you would like to work with the source code directly rather than installing this as a package, you can clone the repo
and install the dependencies:

```sh
npm install
```

### Run

To run the example sandbox code which generates boards using an example goal list (v10.1), run:

```sh
npm start
```

This will run [src/sandbox/main.ts](/src/sandbox/main.ts). You can edit this code or add your own code to experiment
with the generator.

### Test

To run the tests:

```sh
npm test
```

The tests verify that the generator generates the exact same boards as the `v10.1` version does.

### Bundle

To bundle the generator code into a single, minified JS file (to be used for bingo versions in production):

```sh
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
board class instance. If you want to try it out, you can easily do so in [src/sandbox/main.ts](/src/sandbox/main.ts)
(see [Run](#run)). To generate boards in your own project, install the [npm package](#npm-package).

## Issues

If anything is missing, wrong, or incomplete, feel free to let someone in the Bingo community know! You could also open
an issue.