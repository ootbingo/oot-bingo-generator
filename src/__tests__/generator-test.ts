import { Options } from "../domain/options";
import BingoGenerator from "../generator";

describe("generator", () => {

    it("generates a card", () => {
        const options: Options = {
            seed: 142536,
            mode: 'normal',
            language: 'name'
        }

        const profile = {
            minimumSynergy: -3,
            maximumSynergy: 7,
            maximumIndividualSynergy: 3.75,
            initialOffset: 1,
            maximumOffset: 2,
            baselineTime: 27.75,
            timePerDifficulty: 0.75,
            tooMuchSynergy: 100
        }

        const goalList = require('./test-goal-lists/combined-goal-list.json');
        const bingoGenerator = new BingoGenerator(goalList['normal'], options);
        const card = bingoGenerator.generateCard();

        expect(getGoalNames(card)).toEqual([
            "Ice Cavern HP",
            "Defeat both Flare Dancers",
            "Din's Fire",
            "1 Unused Small Key in each Adult Dungeon",
            "Forest Medallion",
            "Both Rusty Switches in Spirit Temple",
            "Golden Gauntlets",
            "Map & Compass in Dodongo's Cavern",
            "3 Shields",
            "30 Different Skulltulas",
            "4 Skulltulas in Shadow Temple",
            "Both HPs in Lost Woods",
            "Open All 6 Gold Rupee Chests",
            "All 8 Kakariko area Skulltulas",
            "Bolero of Fire",
            "Open the Final Door of Light Trial",
            "2 Skulltulas in Lon Lon Ranch",
            "All 8 Death Mountain area Skulltulas",
            "8 Hearts (no duping)",
            "3 Swords, Tunics, Boots, and Shields",
            "Goron Bracelet",
            "Defeat Twinrova",
            "37th Heart Piece (Child Fortress)",
            "All 4 Adult Skulltulas in Zora's Domain Area",
            "Fire Arrows"
           ]);

    })
})

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