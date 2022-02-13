# oot-bingo-generator-ts

Generator for OoT Bingo in TypeScript. Rewritten from the original generator by saltor et al. It generates the exact
same boards as the generator that is currently in use, but aims to be more readable and more easily extensible.

!! This is a work in progress. The generator is done and works, but readability improvements and better documentation
are still being worked on !!

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

## Tests

To run the tests:

```bash
npm test
```

The tests verify that the generator generates the exact same boards as the current v10.1 live version does.

## Generating cards

The main functions to generate a card are located in `src/generator.ts`.

The `ootBingoGenerator()` function returns cards in the exact same legacy format that is expected by the current bingo
versions that are live. The `bingoGenerator()` function is a wrapper and returns the same thing, but this is the name
that is being used by [BingoSync](https://bingosync.com).

It's recommended to use the `generateCard()` function to generate cards yourself. If you want to try it out, you can do
that in `src/sandbox/main.ts` (see 'Run').

## Coming soon (tm)

* Elaborate documentation on how the generator works and what all the values in the goal list mean (such as types,
  subtypes, rowtypes, etc) is planned to be added here!
* A build script to convert and minify this to a js generator to possibly use in the future for bingo versions in
  productions
* Maybe make it into a package? Who knows
