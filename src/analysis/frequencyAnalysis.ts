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

  const frequencies: { [key: string]: number } = {};

  console.log(
    `Analyzing goal frequency of ${numberOfBoards} boards, starting at seed ${startSeed}...`
  );
  for (let seed = startSeed; seed < startSeed + numberOfBoards; seed++) {
    if (seed - startSeed !== 0 && (seed - startSeed) % 100 === 0) {
      console.log(`Processed ${seed - startSeed} boards... (seed ${seed})`);
    }
    const board = generateBingoBoard(bingoList, mode, seed, profile);
    if (!board) {
      continue;
    }
    for (const goal of board.goals) {
      if (!Object.keys(frequencies).includes(goal.name)) {
        frequencies[goal.name] = 0;
      }
      frequencies[goal.name] = frequencies[goal.name] += 1;
    }
  }
  console.log(`Finished (processed ${numberOfBoards} boards total)`);
  return frequencies;
}

export function printFrequencies(frequencies: { [key: string]: number }) {
  const sortedGoalNames = Object.keys(frequencies).sort(function (a, b) {
    return frequencies[b] - frequencies[a];
  });
  let str = "";
  for (const name of sortedGoalNames) {
    str += `${name}: ${frequencies[name]}\n`;
  }
  console.log(str);
}
