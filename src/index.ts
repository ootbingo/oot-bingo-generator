import { BingoList } from "./domain/goalList";
import { Options } from "./domain/options";
import { profiles } from "./domain/profiles";
import { ootBingoGenerator } from "./generator";
import { bingoList } from "./goal-lists/example-goal-list";
import { ootBingoGenerator as oldOotBingoGenerator } from "./oldGenerator/generator"
import { ootBingoGenerator as oldFreqOotBingoGenerator } from "./oldGenerator/generator-freq"

const options: Options = {
    seed: 142536,
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



