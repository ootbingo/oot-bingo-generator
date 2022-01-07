import { Options } from "../domain/options";
import BingoGenerator from "../generator";

describe("generator", () => {

    const bingoList = require('./test-bingo-lists/combined-bingo-list-v10_1.json');

    describe("generating goals", () => {

        it("generates a normal card with correct goals", () => {
            const options: Options = {
                seed: 142536,
                mode: 'normal',
                language: 'name'
            }
            const bingoGenerator = new BingoGenerator(bingoList['normal'], options);

            const card = bingoGenerator.generateCard();

            const goalNames = card.goals.map(goal => goal.name);
            expect(goalNames).toEqual([
                '4 Maps',
                "Saria's Song",
                'Free all 9 Gorons in Fire Temple',
                'Open 3 Boss Key Doors',
                'All 5 Skulltulas in Forest Temple',
                '10 Songs',
                'All 3 Skulltulas in Ice Cavern',
                'Silver Scale',
                "Farore's Wind",
                '9 Hearts (no duping)',
                '8 Different Unused Keys in Gerudo Training Grounds',
                'Fire Medallion',
                'Beat the Spirit Temple',
                'Stone of Agony',
                'Bomb Bag (30)',
                "Beat Jabu-Jabu's Belly",
                'Exactly 20 Deku Sticks',
                '5 Unused Keys in Gerudo Training Grounds',
                'Both HPs in Lost Woods',
                '3 Swords, Tunics, Boots, and Shields',
                'Beat the Fire Temple',
                'All 3 Elemental Arrows',
                '7 Magic Beans',
                'Blue Potion',
                '20 Different Skulltulas'
            ]);
        })

        it("generates a blackout card with correct goals", () => {
            const options: Options = {
                seed: 142536,
                mode: 'blackout',
                language: 'name'
            }
            const bingoGenerator = new BingoGenerator(bingoList['normal'], options);

            const card = bingoGenerator.generateCard();

            const goalNames = card.goals.map(goal => goal.name);
            expect(goalNames).toEqual([
                'All 4 Skulltulas in Jabu-Jabu',
                'All 5 Lake Hylia Skulltulas',
                "Nayru's Love",
                '30 Different Skulltulas',
                '3 Unused Keys in Gerudo Training Grounds',
                '10 Songs',
                "Both Gerudo's Fortress area Skulltulas",
                'All 3 Skulltulas in Bottom of the Well',
                'Double Magic',
                'All 3 Elemental Arrows',
                '3 Swords & 3 Shields',
                'Defeat Meg (purple Poe)',
                'Open All 6 Gold Rupee Chests',
                "All 4 Adult Skulltulas in Zora's Domain Area",
                'Bomb Bag (30)',
                'Longshot',
                '5 Hearts',
                'All 5 Skulltulas in Forest Temple',
                'Open the Final Door of Spirit Trial',
                '7 Compasses',
                'Clear 8 Silver Rupee Rooms',
                'Map & Compass in Spirit Temple',
                'All 4 Gerudo Valley area Skulltulas',
                "Ruto's Letter",
                'Open the Final Door of Light Trial'
            ]);
        })

        it("generates a short card with correct goals", () => {
            const options: Options = {
                seed: 142536,
                mode: 'short',
                language: 'name'
            }
            const bingoGenerator = new BingoGenerator(bingoList['short'], options);

            const card = bingoGenerator.generateCard();

            const goalNames = card.goals.map(goal => goal.name);
            expect(goalNames).toEqual([
                'Map & Compass in Bottom of the Well',
                '5 unused keys in Gerudo Training Grounds',
                '7 Different Bottled Contents',
                '6 Hearts',
                'Golden Scale',
                'Get Bombchu chest in Spirit Temple',
                '2 Skulltulas in Lon Lon Ranch',
                'Plant 3 Magic Beans',
                'Both Hyrule Field area Skulltulas',
                'Skull Mask',
                "Epona's Song",
                'Map & Compass in Jabu-Jabu',
                'Double Magic',
                'Map & Compass in Deku Tree',
                '99 Rupees',
                'Defeat a White Wolfos',
                '20 Deku Sticks',
                'Defeat Queen Gohma',
                'Plant 6 Magic Beans',
                '4 Maps',
                "All 5 Skulltulas in Dodongo's Cavern",
                'Plant 7 Magic Beans',
                '3 unused keys in Gerudo Training Grounds',
                'Bottled Fairy',
                '30 Deku Sticks'
            ]);
        })

    })

    describe('metdata', () => {

        it.each([
            [677302, 4],
            [816607, 5],
            [289166, 2],
            [849242, 1],
            [822884, 10]
        ])('card with seed %s has correct metadata with %s iterations', (seed: number, expectedIterations: number) => {
            const options: Options = {
                seed: seed,
                mode: 'normal',
                language: 'name'
            }
            const bingoGenerator = new BingoGenerator(bingoList['normal'], options);

            const card = bingoGenerator.generateCard();

            expect(card.meta.iterations).toBe(expectedIterations);
        })
    })
})
