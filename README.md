# oot-bingo-generator-ts

Generator for OoT Bingo in TypeScript. Rewritten from the original generator by saltor et al. It generates the exact
same boards as the previous generator did, but should be easier to read and extend.

## Documentation

Click on these links for in-depth explanations:

### :gear: [The Generator](/doc/GENERATOR.md)

Explains how bingo boards are generated, with examples. The text points to the code a few times, but can be read without
having any programming knowledge. It's a *strongly recommended* read if you're new to the bingo generator! Includes
topics like the *magic square*, *desired goal times*, *difficulty* and *picking goals*.

### :balance_scale: [Balancing (bingo sheet)](/doc/BALANCING.md)

Everything you need to know about the
[Bingo sheet](https://docs.google.com/spreadsheets/d/1-mD-OTM0Re7PyNf224MAsRuqQ0umI0E_Qq6nr1vA1aE/edit#gid=166040247).
Goes in detail over the different synergy types, synergy filters, the columns on the sheet, and the goal list format.
Recommended if you're interested in balancing!

### :abacus: [Synergy Calculation](/doc/SYNERGY_CALCULATION.md)

How to calculate the total synergy of a row. Follows the code of the synergy calculator step-by-step with examples.
Having coding knowledge helps, but it shouldn't be too hard to follow without either. Recommended read after the
generator document.

## Install

```bash
npm install
```

## Run

To run the sandbox code which generates cards using an example goal list (v10.1), run:

```bash
npm start
```

This will run [src/sandbox/main.ts](/src/sandbox/main.ts). You can edit this code or add your own code to experiment
with the generator.

## Test

To run the tests:

```bash
npm test
```

The tests verify that the generator generates the exact same boards as the current `v10.1` live version does.

## Build

To bundle the generator code into a single, minified JS file (to be used for bingo versions in production):

```bash
npm run build
```

The generated file can be found in `dist/generator.js`. After importing this script in javascript code, the main
generator functions in [src/index.ts](/src/index.ts) can be accessed from the `BingoLibrary` (
e.g. `BingoLibrary.ootBingoGenerator(bingoList, options)`).

## Generating cards

The main functions for generating a card are located in [src/index.ts](/src/index.ts).

The `ootBingoGenerator()` function returns cards in the exact same legacy format that is expected by the current bingo
versions on [Github](https://github.com/ootbingo/bingo). The `bingoGenerator()` function is a wrapper and returns the
same thing, but this is the name that is being used by [BingoSync](https://bingosync.com).

It's recommended to use the `generateCard()` function when generating cards yourself. If you want to try it out, you can
easily do so in [src/sandbox/main.ts](/src/sandbox/main.ts) (see [Run](#run)).

## Help wanted

If anything is missing, wrong, or incomplete, feel free to let someone in the Bingo community know! You could also open
an issue or a pull request. A few things that would be nice to add to this project are:

* [BALANCING.md](/doc/BALANCING.md): add explanations on what the less obvious synergy columns are for (`childchu`
  , `chuczl`, `ganonchu`, `aganon`, `bganon`, `cganon`, `childreset`, `bosskey`, `bosskey2`, `inc`, maybe more)
* Add a new doc about **timing goals**. What do we generally include and exclude in the timing of a goal? How would one
  go about (re-)timing a goal?