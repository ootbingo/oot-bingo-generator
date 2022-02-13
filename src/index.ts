import {Options} from "./domain/options";
import {profiles} from "./domain/profiles";
import BingoGenerator, {extractGoalList, ootBingoGenerator} from "./generator";
import {bingoList} from "./goal-lists/example-goal-list";
import {ootBingoGenerator as oldOotBingoGenerator} from "./oldGenerator/generator"
import {ootBingoGenerator as oldFreqOotBingoGenerator} from "./oldGenerator/generator-freq"

const options: Options = {
    seed: 718526,
    mode: 'normal',
    language: 'name'
}

const profile = profiles.normal;


console.log("\n#############\n JS (V9.2)")
const oldCard = oldOotBingoGenerator(bingoList, {...profile, ...options}) as any
//console.log(oldCard);
console.log(oldCard.map(goal => goal && goal.name));


console.log("\n#############\n JS FREQUENCY BALANCING (V10.1)")
const oldFreqCard = oldFreqOotBingoGenerator(bingoList, {...profile, ...options}) as any
//console.log(oldFreqCard);
console.log(oldFreqCard.map(goal => goal && goal.name));


console.log("\n#############\n TS")
const card = ootBingoGenerator(bingoList, options);
//console.log(card);
console.log(card.map(goal => goal && goal.name));

const frequencyAnalysis = (n: number) => {
    const freqOptions: Options = {
        seed: 0,
        mode: 'blackout',
        language: 'name'
    }

    const goalList = extractGoalList(bingoList, freqOptions.mode)

    const frequencies = {};
    const startSeed = 125000;
    for (let i = startSeed; i < startSeed + n; i++) {
        if (i % 100 === 0) {
            console.log(i - startSeed);
        }
        const bingoGenerator = new BingoGenerator(goalList, {
            ...freqOptions,
            seed: i,
        });
        const card = bingoGenerator.generateCard();
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
        .reduce((r, [k, v]) => ({...r, [k]: v}), {});

    console.log(JSON.stringify(sortedFrequencies, null, 1));
}
