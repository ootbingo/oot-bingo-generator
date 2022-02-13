import { Mode, Options } from "../types/options";
import { generateCard } from "../generator";
import { BingoList } from "../types/goalList";
import { Profiles } from "../types/profiles";

export const frequencyAnalysis = (
  numberOfBoards: number,
  mode: Mode,
  bingoList: BingoList,
  profiles?: Profiles,
  startSeed?: number
) => {
  startSeed = startSeed || 0;
  const freqOptions: Options = {
    seed: 0,
    mode: mode,
    language: "english",
  };

  const frequencies: { [key: string]: number } = {};

  console.log(`Analyzing goal frequency of ${numberOfBoards} boards...`);
  for (let seed = startSeed; seed < startSeed + numberOfBoards; seed++) {
    if (seed % 100 === 0) {
      console.log(`Processed ${seed - startSeed} boards... (seed ${seed})`);
    }

    const card = generateCard(
      bingoList,
      {
        ...freqOptions,
        seed: seed,
      },
      profiles
    );
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
};
