import { BingoList } from "../types/goalList";
import { Mode, Profile } from "../types/settings";
import { generateBingoBoard } from "../index";

export function analyzeFrequencies(
  numberOfBoards: number,
  bingoList: BingoList,
  mode: Mode,
  startSeed?: number,
  profile?: Profile
) {
  startSeed = startSeed ?? 0;
  const maxIterations = 100;

  const frequencies: { [key: string]: number } = {};

  console.log(
    `Analyzing goal frequency of ${numberOfBoards} boards, starting at seed ${startSeed}...`
  );
  let numberOfSuccessBoards = 0;
  const allIterations: number[] = [];
  for (let seed = startSeed; seed < startSeed + numberOfBoards; seed++) {
    if (seed - startSeed !== 0 && (seed - startSeed) % 100 === 0) {
      console.log(`Processed ${seed - startSeed} boards... (seed ${seed})`);
    }
    const board = generateBingoBoard(bingoList, mode, seed, profile, maxIterations);
    if (!board) {
      allIterations.push(maxIterations);
      continue;
    }
    allIterations.push(board.iterations);
    for (const goal of board.goals) {
      if (!Object.keys(frequencies).includes(goal.name)) {
        frequencies[goal.name] = 0;
      }
      frequencies[goal.name] = frequencies[goal.name] += 1;
    }
    numberOfSuccessBoards++;
  }
  console.log(`Finished (processed ${numberOfSuccessBoards} boards total)\n`);
  return {
    frequencies: frequencies,
    meta: {
      iterations: {
        max: Math.max(...allIterations),
        average:
          allIterations.length > 0
            ? allIterations.reduce((total, currentValue) => total + currentValue, 0) /
              allIterations.length
            : NaN,
      },
      attempts: {
        successes: numberOfSuccessBoards,
        fails: numberOfBoards - numberOfSuccessBoards,
        total: numberOfBoards,
      },
    },
  };
}

export function printFrequencies(frequenciesResult: ReturnType<typeof analyzeFrequencies>) {
  const { frequencies, meta } = frequenciesResult;
  const sortedGoalNames = Object.keys(frequencies).sort(function (a, b) {
    return frequencies[b] - frequencies[a];
  });
  let str = "";
  for (const name of sortedGoalNames) {
    str += `${name}: ${frequencies[name]}\n`;
  }

  console.log("META\n------------");
  console.log(`Iterations - Max: ${meta.iterations.max}, Average: ${meta.iterations.average}`);
  console.log(
    `Attempts - Successes: ${meta.attempts.successes}, Fails: ${meta.attempts.fails}, Total: ${meta.attempts.total}`
  );

  console.log("\nGOAL FREQUENCIES\n------------");
  console.log(str);
}
