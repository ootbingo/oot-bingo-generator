import { BingoList } from "../types/goalList";
import { Mode, Profile } from "../types/settings";
import { generateCard } from "../index";

export function frequencyAnalysis(
  numberOfBoards: number,
  bingoList: BingoList,
  mode: Mode,
  startSeed?: number,
  profile?: Profile
) {
  startSeed = startSeed ?? 0;

  const frequencies: { [key: string]: number } = {};

  console.log(`Analyzing goal frequency of ${numberOfBoards} boards...`);
  for (let seed = startSeed; seed < startSeed + numberOfBoards; seed++) {
    if (seed % 100 === 0) {
      console.log(`Processed ${seed - startSeed} boards... (seed ${seed})`);
    }

    const card = generateCard(bingoList, mode, seed, profile);
    for (const goal of card.goals) {
      if (!Object.keys(frequencies).includes(goal.name)) {
        frequencies[goal.name] = 0;
      }
      frequencies[goal.name] = frequencies[goal.name] += 1;
    }
  }
  const sortedFrequencies = Object.entries(frequencies)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  return sortedFrequencies;
}
