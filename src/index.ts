import { BingoList } from "./domain/goalList";
import { Options } from "./domain/options";
import { profiles } from "./domain/profiles";
import BingoGenerator from "./generator";
import { bingoList } from "./goal-lists/example-goal-list";
import { BingoGenerator as OldBingoGenerator } from "./oldGenerator/generator"

const goalList: BingoList = bingoList;


const options: Options = {
    seed: 142536,
    mode: 'normal',
    language: 'name'
}

const profile = profiles.normal;


const getGoalNames = (card) => {
    const goalNames = [];
    for (const diff in card) {
        const square = card[diff];
        if (square.goal) {
            goalNames.push(square.goal.name);
        }
    }
    return goalNames;
}


console.log("\n#############\n JS")

var oldBingoGenerator = new OldBingoGenerator(bingoList, {...profile, ...options});

var oldCard = undefined;
var iterations = 0;
console.log(iterations);
while (!oldCard && iterations < 1) {
    oldCard = oldBingoGenerator.makeCard();
    iterations++;
}
oldCard["meta"] = { iterations: iterations };

console.log(getGoalNames(oldCard));



console.log("\n#############\n TS")
const bingoGenerator = new BingoGenerator(goalList['normal'], options);
const card = bingoGenerator.generateCard(1);
//console.log(card);
console.log(getGoalNames(card));


