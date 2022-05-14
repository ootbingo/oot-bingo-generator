import { ootBingoGenerator } from "../index";

describe("ootBingoGenerator", () => {
  const bingoList = require("./test-bingo-lists/combined-bingo-list-v10_1.json");

  it("generates a normal v10.1 board with correct goals", () => {
    const board = ootBingoGenerator(bingoList, { seed: 142536, mode: "normal" });

    const goalNames = [];
    for (let position = 1; position <= 25; position++) {
      goalNames.push(board[position].name);
    }
    expect(goalNames).toEqual([
      "4 Maps",
      "Saria's Song",
      "Free all 9 Gorons in Fire Temple",
      "Open 3 Boss Key Doors",
      "All 5 Skulltulas in Forest Temple",
      "10 Songs",
      "All 3 Skulltulas in Ice Cavern",
      "Silver Scale",
      "Farore's Wind",
      "9 Hearts (no duping)",
      "8 Different Unused Keys in Gerudo Training Grounds",
      "Fire Medallion",
      "Beat the Spirit Temple",
      "Stone of Agony",
      "Bomb Bag (30)",
      "Beat Jabu-Jabu's Belly",
      "Exactly 20 Deku Sticks",
      "5 Unused Keys in Gerudo Training Grounds",
      "Both HPs in Lost Woods",
      "3 Swords, Tunics, Boots, and Shields",
      "Beat the Fire Temple",
      "All 3 Elemental Arrows",
      "7 Magic Beans",
      "Blue Potion",
      "20 Different Skulltulas",
    ]);
  });

  it("generates a blackout v10.1 board with correct goals", () => {
    const board = ootBingoGenerator(bingoList, { seed: 142536, mode: "blackout" });

    const goalNames = [];
    for (let position = 1; position <= 25; position++) {
      goalNames.push(board[position].name);
    }
    expect(goalNames).toEqual([
      "All 4 Skulltulas in Jabu-Jabu",
      "All 5 Lake Hylia Skulltulas",
      "Nayru's Love",
      "30 Different Skulltulas",
      "3 Unused Keys in Gerudo Training Grounds",
      "10 Songs",
      "Both Gerudo's Fortress area Skulltulas",
      "All 3 Skulltulas in Bottom of the Well",
      "Double Magic",
      "All 3 Elemental Arrows",
      "3 Swords & 3 Shields",
      "Defeat Meg (purple Poe)",
      "Open All 6 Gold Rupee Chests",
      "All 4 Adult Skulltulas in Zora's Domain Area",
      "Bomb Bag (30)",
      "Longshot",
      "5 Hearts",
      "All 5 Skulltulas in Forest Temple",
      "Open the Final Door of Spirit Trial",
      "7 Compasses",
      "Clear 8 Silver Rupee Rooms",
      "Map & Compass in Spirit Temple",
      "All 4 Gerudo Valley area Skulltulas",
      "Ruto's Letter",
      "Open the Final Door of Light Trial",
    ]);
  });

  it("generates a short v10.1 board with correct goals", () => {
    const board = ootBingoGenerator(bingoList, { seed: 142536, mode: "short" });

    const goalNames = [];
    for (let position = 1; position <= 25; position++) {
      goalNames.push(board[position].name);
    }
    expect(goalNames).toEqual([
      "Map & Compass in Bottom of the Well",
      "5 unused keys in Gerudo Training Grounds",
      "7 Different Bottled Contents",
      "6 Hearts",
      "Golden Scale",
      "Get Bombchu chest in Spirit Temple",
      "2 Skulltulas in Lon Lon Ranch",
      "Plant 3 Magic Beans",
      "Both Hyrule Field area Skulltulas",
      "Skull Mask",
      "Epona's Song",
      "Map & Compass in Jabu-Jabu",
      "Double Magic",
      "Map & Compass in Deku Tree",
      "99 Rupees",
      "Defeat a White Wolfos",
      "20 Deku Sticks",
      "Defeat Queen Gohma",
      "Plant 6 Magic Beans",
      "4 Maps",
      "All 5 Skulltulas in Dodongo's Cavern",
      "Plant 7 Magic Beans",
      "3 unused keys in Gerudo Training Grounds",
      "Bottled Fairy",
      "30 Deku Sticks",
    ]);
  });

  it("generates a short blackout v10.1 board with correct goals", () => {
    const board = ootBingoGenerator(bingoList, { seed: 142536, mode: "shortBlackout" });

    const goalNames = [];
    for (let position = 1; position <= 25; position++) {
      goalNames.push(board[position].name);
    }
    expect(goalNames).toEqual([
      "All 3 Skulltulas in Bottom of the Well",
      "Defeat a White Wolfos",
      "Both Hyrule Field area Skulltulas",
      "1 Skulltula from each Child Dungeon",
      "Plant bean in Death Mountain Crater",
      "Skull Mask",
      "Defeat Queen Gohma",
      "Bottled Fairy",
      "Both Child Wasteland/ Colossus area Skulltulas",
      "Get Bombchu chest in Spirit Temple",
      "All 5 Skulltulas in Dodongo's Cavern",
      "Gerudo's Card",
      "6 Hearts",
      "Ruto's Letter",
      "Lost Dog HP",
      "Defeat all Lizalfos in Dodongo's Cavern",
      "Map & Compass in Bottom of the Well",
      "Epona's Song",
      "15 Different Skulltulas",
      "8 Magic Beans",
      "All 4 Lon Lon Ranch area Skulltulas",
      "Zora's Sapphire",
      "Both Child Gerudo Valley area Skulltulas",
      "Open 3 gold rupee chests",
      "30 Deku Sticks",
    ]);
  });
});
