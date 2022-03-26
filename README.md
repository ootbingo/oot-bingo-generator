# oot-bingo-generator-ts

Generator for OoT Bingo in TypeScript. Rewritten from the original generator by saltor et al. It generates the exact
same boards as the generator that is currently in use, but aims to be more readable and more easily extensible.

!! This is a work in progress. The generator is done and works, but readability improvements and better documentation
are still being worked on !!

## Documentation

Click these links for in-depth explanations:

### :books: [The generator](/doc/GENERATOR.md)

How bingo boards get generated, with examples. Also points at the code a few times, but can be read without having any
programming knowledge. *Strongly recommended* read if you're new to the bingo generator!

### :balance_scale: [Balancing (bingo sheet)](/doc/BALANCING.md)

Everything about the numbers you see on
the [Bingo sheet](https://docs.google.com/spreadsheets/d/1-mD-OTM0Re7PyNf224MAsRuqQ0umI0E_Qq6nr1vA1aE/edit#gid=166040247)
. Explains the different synergy types there are and what the columns on the sheet mean. Recommended if you're
interested in balancing!

## Install

```bash
npm install
```

## Run

To run the sandbox code which generates cards with an example goal list (v10.1), run:

```bash
npm run
```

This will run `src/sandbox/main.ts`, where you can also add your own code to experiment with the generator.

## Test

To run the tests:

```bash
npm test
```

The tests verify that the generator generates the exact same boards as the current v10.1 live version does.

## Build

To bundle the generator code into a single, minified JS file (to be used for bingo versions in productions):

```bash
npm build
```

The generated file can be found in `dist/generator.js`. After importing this script, the generator functions
from `src/index.ts`can be accessed from the `BingoLibrary` (e.g. `BingoLibrary.ootBingoGenerator(bingoList, options)`).

## Generating cards

The main functions to generate a card are located in `src/index.ts`.

The `ootBingoGenerator()` function returns cards in the exact same legacy format that is expected by the current bingo
versions that are live. The `bingoGenerator()` function is a wrapper and returns the same thing, but this is the name
that is being used by [BingoSync](https://bingosync.com).

It's recommended to use the `generateCard()` function to generate cards yourself. If you want to try it out, you can do
that in `src/sandbox/main.ts` (see 'Run').

## Coming soon (tm)

* Elaborate documentation on how the generator works and what all the values in the goal list mean (such as types,
  subtypes, rowtypes, etc) is planned to be added here!
* A build script to convert and minify this to a js generator to possibly use in the future for bingo versions in
  productions ✅
* Maybe make it into a package? Who knows
