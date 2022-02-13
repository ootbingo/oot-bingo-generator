import { Mode, Options } from "./types/options";
import { generateCard } from "./generator";
import { bingoList } from "./goal-lists/example-goal-list";

const frequencyAnalysis = (n: number, mode: Mode) => {
  const freqOptions: Options = {
    seed: 0,
    mode: mode,
    language: "name",
  };

  const frequencies = {};
  const startSeed = 125000;
  for (let i = startSeed; i < startSeed + n; i++) {
    if (i % 100 === 0) {
      console.log(i - startSeed);
    }

    const card = generateCard(bingoList, {
      ...freqOptions,
      seed: i,
    });
    for (const goal of card.goals) {
      if (!Object.keys(frequencies).includes(goal.name)) {
        frequencies[goal.name] = 0;
      }
      frequencies[goal.name] = frequencies[goal.name] += 1;
    }
  }
  const sortedFrequencies = Object.entries(frequencies)
    // @ts-ignore
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  console.log(JSON.stringify(sortedFrequencies, null, 1));
};
