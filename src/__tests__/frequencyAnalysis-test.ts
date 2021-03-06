import { analyzeFrequencies, printFrequencies } from "../analysis/frequencyAnalysis";

describe("frequencyAnalysis", () => {
  const bingoList = require("./test-bingo-lists/combined-bingo-list-v10_1.json");

  it("performs a correct frequency analysis on 100 normal 10.1 boards", () => {
    const frequencies = analyzeFrequencies(100, bingoList, "normal");

    expect(frequencies).toStrictEqual({
      "1 Skulltula from each Adult Dungeon": 52,
      "1 Skulltula from each Child Dungeon": 10,
      "1 Unused Small Key in each Adult Dungeon": 19,
      "10 Songs": 28,
      "15 Different Skulltulas": 6,
      "2 Boss Keys": 3,
      "2 Skulltulas in Lon Lon Ranch": 13,
      "20 Different Skulltulas": 8,
      "3 Boots": 12,
      "3 Boss Keys": 7,
      "3 Lake Hylia Skulltulas": 11,
      "3 Shields": 10,
      "3 Shields & 3 Boots": 18,
      "3 Shields & 3 Tunics": 6,
      "3 Skulltulas in Water Temple": 14,
      "3 Songs": 6,
      "3 Swords & 3 Boots": 12,
      "3 Swords & 3 Shields": 11,
      "3 Swords & 3 Tunics": 9,
      "3 Swords, Tunics, Boots, and Shields": 32,
      "3 Tunics": 22,
      "3 Tunics & 3 Boots": 5,
      "3 Unused Keys in Gerudo Training Grounds": 7,
      "30 Deku Nuts": 10,
      "30 Different Skulltulas": 50,
      "37th Heart Piece (Child Fortress)": 5,
      "4 Compasses": 6,
      "4 Maps": 9,
      "4 Skulltulas in Shadow Temple": 11,
      "4 Songs": 4,
      "4 Unused Keys in Forest Temple": 8,
      "4 Unused Keys in Gerudo Training Grounds": 4,
      "5 Compasses": 3,
      "5 Hearts": 15,
      "5 Magic Beans": 8,
      "5 Maps": 7,
      "5 Unused Keys in Gerudo Training Grounds": 7,
      "5 Zora area HPs": 18,
      "500 Rupees": 5,
      "6 Compasses": 9,
      "6 Different Unused Keys in Gerudo Training Grounds": 4,
      "6 Hearts": 12,
      "6 Maps": 10,
      "6 Songs": 8,
      "7 Compasses": 24,
      "7 Different Bottled Contents": 7,
      "7 Different Unused Keys in Gerudo Training Grounds": 16,
      "7 Hearts (no duping)": 9,
      "7 Magic Beans": 6,
      "7 Maps": 12,
      "7 Songs": 3,
      "8 Different Unused Keys in Gerudo Training Grounds": 13,
      "8 Hearts (no duping)": 32,
      "8 Songs": 6,
      "9 Hearts (no duping)": 35,
      "9 Songs": 14,
      "All 3 Elemental Arrows": 52,
      "All 3 Kokiri Forest area Skulltulas": 14,
      "All 3 Skulltulas in Bottom of the Well": 15,
      "All 3 Skulltulas in Ice Cavern": 5,
      "All 4 Adult Skulltulas in Zora's Domain Area": 4,
      "All 4 Child Skulltulas in Zora's Domain Area": 10,
      "All 4 Gerudo Valley area Skulltulas": 6,
      "All 4 Lon Lon Ranch area Skulltulas": 11,
      "All 4 Lost Woods area Skulltulas": 7,
      "All 4 Market area Skulltulas": 23,
      "All 4 Skulltulas in Deku Tree": 6,
      "All 4 Skulltulas in Jabu-Jabu": 6,
      "All 4 Wasteland/ Colossus area Skulltulas": 15,
      "All 5 Lake Hylia Skulltulas": 16,
      "All 5 Skulltulas in Dodongo's Cavern": 8,
      "All 5 Skulltulas in Fire Temple": 26,
      "All 5 Skulltulas in Forest Temple": 13,
      "All 5 Skulltulas in Shadow Temple": 15,
      "All 5 Skulltulas in Spirit Temple": 10,
      "All 5 Skulltulas in Water Temple": 35,
      "All 8 Death Mountain area Skulltulas": 8,
      "All 8 Kakariko area Skulltulas": 12,
      "All 8 Zora's Domain area Skulltulas": 14,
      "Beat Dodongo's Cavern": 7,
      "Beat Jabu-Jabu's Belly": 8,
      "Beat the Deku Tree": 8,
      "Beat the Fire Temple": 23,
      "Beat the Forest Temple": 11,
      "Beat the Shadow Temple": 4,
      "Beat the Spirit Temple": 29,
      "Beat the Water Temple": 14,
      "Blue Fire": 11,
      "Blue Gauntlets": 3,
      "Blue Potion": 5,
      "Bolero of Fire": 12,
      "Bomb Bag (30)": 10,
      Boomerang: 9,
      "Both Gerudo Valley HPs": 3,
      "Both Gerudo's Fortress area Skulltulas": 2,
      "Both HPs in Death Mountain Crater": 13,
      "Both HPs in Lost Woods": 26,
      "Both Hyrule Field area Skulltulas": 7,
      "Both Rusty Switches in Spirit Temple": 37,
      "Bottled Fairy": 16,
      "Bronze Gauntlets": 14,
      "Bullet Bag (40)": 5,
      "Bullet Bag (50)": 13,
      "Clear 10 Silver Rupee Rooms": 31,
      "Clear 4 Silver Rupee Rooms": 3,
      "Clear 8 Silver Rupee Rooms": 10,
      "Cow in House": 6,
      "Defeat 4 Different Iron Knuckles": 19,
      "Defeat Amy (Green Poe)": 7,
      "Defeat Barinade": 6,
      "Defeat Big Octo": 5,
      "Defeat Bongo-Bongo": 4,
      "Defeat Dark Link": 15,
      "Defeat King Dodongo": 8,
      "Defeat Meg (purple Poe)": 29,
      "Defeat Morpha": 9,
      "Defeat Nabooru-Knuckle": 5,
      "Defeat Phantom Ganon": 6,
      "Defeat Queen Gohma": 6,
      "Defeat Twinrova": 30,
      "Defeat Volvagia": 13,
      "Defeat a Skull Kid": 11,
      "Defeat a White Wolfos": 6,
      "Defeat all Lizalfos in Dodongo's Cavern": 5,
      "Defeat both Flare Dancers": 7,
      "Desert Colossus HP": 6,
      "Din's Fire": 21,
      "Double Defense": 6,
      "Double Magic": 12,
      "Epona's Song": 6,
      "Exactly 20 Deku Sticks": 15,
      "Exactly 30 Deku Sticks": 24,
      "Fairy Bow": 13,
      "Fairy Slingshot": 5,
      "Farore's Wind": 9,
      "Fill all 4 Bottle Slots": 7,
      "Fire Arrows": 6,
      "Fire Medallion": 12,
      "Fire Temple Boss Key": 19,
      "Forest Medallion": 1,
      "Forest Temple Boss Key": 10,
      "Free all 9 Gorons in Fire Temple": 19,
      "Frog's HP": 4,
      "Ganon's Castle Boss Key": 11,
      "Gerudo's Card": 7,
      "Get Bombchu chest in Spirit Temple": 6,
      "Giant's Knife": 10,
      "Giant's Wallet": 7,
      "Golden Gauntlets": 4,
      "Goron Bracelet": 24,
      "Goron Tunic": 13,
      "Green Gauntlets": 29,
      "Ice Arrows": 2,
      "Ice Cavern HP": 10,
      "Iron Boots": 6,
      "Keaton Mask": 8,
      "Lens of Truth": 6,
      "Light Arrows": 14,
      "Lon Lon Ranch HP": 13,
      Longshot: 12,
      "Map & Compass in Bottom of the Well": 12,
      "Map & Compass in Deku Tree": 7,
      "Map & Compass in Dodongo's Cavern": 10,
      "Map & Compass in Fire Temple": 9,
      "Map & Compass in Forest Temple": 14,
      "Map & Compass in Ice Cavern": 6,
      "Map & Compass in Jabu-Jabu": 9,
      "Map & Compass in Shadow Temple": 1,
      "Map & Compass in Spirit Temple": 26,
      "Map & Compass in Water Temple": 7,
      "Megaton Hammer": 16,
      Milk: 4,
      "Minuet of Forest": 9,
      "Mirror Shield": 9,
      "Nayru's Love": 6,
      "Obtain all 5 Small Keys in Forest Temple": 11,
      "Obtain all 5 Small Keys in Shadow Temple": 23,
      "Obtain all 8 Small Keys in Fire Temple": 18,
      "Open 2 Boss Key Doors": 1,
      "Open 3 Boss Key Doors": 18,
      "Open 3 Gold Rupee Chests": 16,
      "Open 5 Gold Rupee Chests": 19,
      "Open 50 Rupee chest in Wasteland": 7,
      "Open All 6 Gold Rupee Chests": 25,
      "Open the Final Door of Fire Trial": 10,
      "Open the Final Door of Forest Trial": 10,
      "Open the Final Door of Light Trial": 12,
      "Open the Final Door of Shadow Trial": 10,
      "Open the Final Door of Spirit Trial": 10,
      "Open the Final Door of Water Trial": 20,
      "Plant 5 Magic Beans": 12,
      "Plant bean in Death Mountain Crater": 5,
      "Quiver (40)": 24,
      "Quiver (50)": 19,
      "Requiem of Spirit": 2,
      "Ruto's Letter": 13,
      "Saria's Song": 15,
      "Shadow Temple Boss Key": 7,
      "Silver Gauntlets": 8,
      "Silver Scale": 18,
      "Spirit Temple Boss Key": 4,
      "Stone of Agony": 12,
      "Two Fairy Spells": 25,
      "Water Medallion": 5,
      "Water Temple Boss Key": 4,
      "Win Bombchu Bowling Prize": 10,
      "Zora Tunic": 12,
    });
  });

  it("performs a correct frequency analysis on 100 normal 10.1 boards with a start seed", () => {
    const frequencies = analyzeFrequencies(100, bingoList, "normal", 123456);

    expect(frequencies).toStrictEqual({
      "1 Skulltula from each Adult Dungeon": 38,
      "1 Skulltula from each Child Dungeon": 8,
      "1 Unused Small Key in each Adult Dungeon": 17,
      "10 Songs": 30,
      "15 Different Skulltulas": 7,
      "2 Boss Keys": 10,
      "2 Skulltulas in Lon Lon Ranch": 11,
      "20 Different Skulltulas": 10,
      "3 Boots": 9,
      "3 Boss Keys": 1,
      "3 Lake Hylia Skulltulas": 9,
      "3 Shields": 8,
      "3 Shields & 3 Boots": 33,
      "3 Shields & 3 Tunics": 9,
      "3 Skulltulas in Water Temple": 22,
      "3 Songs": 5,
      "3 Swords & 3 Boots": 13,
      "3 Swords & 3 Shields": 9,
      "3 Swords & 3 Tunics": 2,
      "3 Swords, Tunics, Boots, and Shields": 35,
      "3 Tunics": 17,
      "3 Tunics & 3 Boots": 7,
      "3 Unused Keys in Gerudo Training Grounds": 7,
      "30 Deku Nuts": 10,
      "30 Different Skulltulas": 58,
      "37th Heart Piece (Child Fortress)": 3,
      "4 Compasses": 6,
      "4 Maps": 4,
      "4 Skulltulas in Shadow Temple": 19,
      "4 Songs": 7,
      "4 Unused Keys in Forest Temple": 10,
      "4 Unused Keys in Gerudo Training Grounds": 3,
      "5 Compasses": 4,
      "5 Hearts": 13,
      "5 Magic Beans": 19,
      "5 Maps": 5,
      "5 Unused Keys in Gerudo Training Grounds": 7,
      "5 Zora area HPs": 18,
      "500 Rupees": 6,
      "6 Compasses": 11,
      "6 Different Unused Keys in Gerudo Training Grounds": 7,
      "6 Hearts": 10,
      "6 Maps": 10,
      "6 Songs": 7,
      "7 Compasses": 30,
      "7 Different Bottled Contents": 8,
      "7 Different Unused Keys in Gerudo Training Grounds": 16,
      "7 Hearts (no duping)": 12,
      "7 Magic Beans": 5,
      "7 Maps": 13,
      "7 Songs": 9,
      "8 Different Unused Keys in Gerudo Training Grounds": 10,
      "8 Hearts (no duping)": 33,
      "8 Songs": 8,
      "9 Hearts (no duping)": 32,
      "9 Songs": 12,
      "All 3 Elemental Arrows": 61,
      "All 3 Kokiri Forest area Skulltulas": 7,
      "All 3 Skulltulas in Bottom of the Well": 24,
      "All 3 Skulltulas in Ice Cavern": 3,
      "All 4 Adult Skulltulas in Zora's Domain Area": 4,
      "All 4 Child Skulltulas in Zora's Domain Area": 11,
      "All 4 Gerudo Valley area Skulltulas": 9,
      "All 4 Lon Lon Ranch area Skulltulas": 7,
      "All 4 Lost Woods area Skulltulas": 6,
      "All 4 Market area Skulltulas": 16,
      "All 4 Skulltulas in Deku Tree": 6,
      "All 4 Skulltulas in Jabu-Jabu": 6,
      "All 4 Wasteland/ Colossus area Skulltulas": 12,
      "All 5 Lake Hylia Skulltulas": 21,
      "All 5 Skulltulas in Dodongo's Cavern": 8,
      "All 5 Skulltulas in Fire Temple": 22,
      "All 5 Skulltulas in Forest Temple": 10,
      "All 5 Skulltulas in Shadow Temple": 8,
      "All 5 Skulltulas in Spirit Temple": 12,
      "All 5 Skulltulas in Water Temple": 27,
      "All 8 Death Mountain area Skulltulas": 9,
      "All 8 Kakariko area Skulltulas": 14,
      "All 8 Zora's Domain area Skulltulas": 25,
      "Beat Dodongo's Cavern": 12,
      "Beat Jabu-Jabu's Belly": 6,
      "Beat the Deku Tree": 9,
      "Beat the Fire Temple": 17,
      "Beat the Forest Temple": 7,
      "Beat the Shadow Temple": 5,
      "Beat the Spirit Temple": 30,
      "Beat the Water Temple": 10,
      "Blue Fire": 3,
      "Blue Gauntlets": 6,
      "Blue Potion": 9,
      "Bolero of Fire": 15,
      "Bomb Bag (30)": 4,
      Boomerang: 8,
      "Both Gerudo Valley HPs": 6,
      "Both Gerudo's Fortress area Skulltulas": 8,
      "Both HPs in Death Mountain Crater": 8,
      "Both HPs in Lost Woods": 27,
      "Both Hyrule Field area Skulltulas": 7,
      "Both Rusty Switches in Spirit Temple": 35,
      "Bottled Fairy": 12,
      "Bronze Gauntlets": 12,
      "Bullet Bag (40)": 4,
      "Bullet Bag (50)": 11,
      "Clear 10 Silver Rupee Rooms": 21,
      "Clear 4 Silver Rupee Rooms": 4,
      "Clear 8 Silver Rupee Rooms": 11,
      "Cow in House": 8,
      "Defeat 4 Different Iron Knuckles": 9,
      "Defeat Amy (Green Poe)": 9,
      "Defeat Barinade": 8,
      "Defeat Big Octo": 7,
      "Defeat Bongo-Bongo": 7,
      "Defeat Dark Link": 11,
      "Defeat King Dodongo": 2,
      "Defeat Meg (purple Poe)": 24,
      "Defeat Morpha": 9,
      "Defeat Nabooru-Knuckle": 8,
      "Defeat Phantom Ganon": 2,
      "Defeat Queen Gohma": 5,
      "Defeat Twinrova": 35,
      "Defeat Volvagia": 17,
      "Defeat a Skull Kid": 15,
      "Defeat a White Wolfos": 3,
      "Defeat all Lizalfos in Dodongo's Cavern": 3,
      "Defeat both Flare Dancers": 8,
      "Desert Colossus HP": 6,
      "Din's Fire": 28,
      "Double Defense": 7,
      "Double Magic": 7,
      "Epona's Song": 6,
      "Exactly 20 Deku Sticks": 11,
      "Exactly 30 Deku Sticks": 20,
      "Fairy Bow": 5,
      "Fairy Slingshot": 9,
      "Farore's Wind": 15,
      "Fill all 4 Bottle Slots": 7,
      "Fire Arrows": 5,
      "Fire Medallion": 14,
      "Fire Temple Boss Key": 17,
      "Forest Medallion": 9,
      "Forest Temple Boss Key": 13,
      "Free all 9 Gorons in Fire Temple": 12,
      "Frog's HP": 3,
      "Ganon's Castle Boss Key": 15,
      "Gerudo's Card": 5,
      "Get Bombchu chest in Spirit Temple": 7,
      "Giant's Knife": 16,
      "Giant's Wallet": 7,
      "Golden Gauntlets": 6,
      "Goron Bracelet": 29,
      "Goron Tunic": 13,
      "Green Gauntlets": 32,
      "Ice Arrows": 5,
      "Ice Cavern HP": 6,
      "Iron Boots": 4,
      "Keaton Mask": 10,
      "Lens of Truth": 7,
      "Light Arrows": 10,
      "Lon Lon Ranch HP": 10,
      Longshot: 4,
      "Map & Compass in Bottom of the Well": 10,
      "Map & Compass in Deku Tree": 11,
      "Map & Compass in Dodongo's Cavern": 20,
      "Map & Compass in Fire Temple": 10,
      "Map & Compass in Forest Temple": 10,
      "Map & Compass in Ice Cavern": 6,
      "Map & Compass in Jabu-Jabu": 7,
      "Map & Compass in Shadow Temple": 2,
      "Map & Compass in Spirit Temple": 20,
      "Map & Compass in Water Temple": 8,
      "Megaton Hammer": 7,
      Milk: 6,
      "Minuet of Forest": 14,
      "Mirror Shield": 6,
      "Nayru's Love": 15,
      "Obtain all 5 Small Keys in Forest Temple": 12,
      "Obtain all 5 Small Keys in Shadow Temple": 25,
      "Obtain all 8 Small Keys in Fire Temple": 11,
      "Open 2 Boss Key Doors": 14,
      "Open 3 Boss Key Doors": 18,
      "Open 3 Gold Rupee Chests": 19,
      "Open 5 Gold Rupee Chests": 9,
      "Open 50 Rupee chest in Wasteland": 9,
      "Open All 6 Gold Rupee Chests": 37,
      "Open the Final Door of Fire Trial": 10,
      "Open the Final Door of Forest Trial": 4,
      "Open the Final Door of Light Trial": 6,
      "Open the Final Door of Shadow Trial": 14,
      "Open the Final Door of Spirit Trial": 11,
      "Open the Final Door of Water Trial": 17,
      "Plant 5 Magic Beans": 15,
      "Plant bean in Death Mountain Crater": 10,
      "Quiver (40)": 15,
      "Quiver (50)": 16,
      "Requiem of Spirit": 10,
      "Ruto's Letter": 4,
      "Saria's Song": 12,
      "Shadow Temple Boss Key": 5,
      "Silver Gauntlets": 10,
      "Silver Scale": 20,
      "Spirit Temple Boss Key": 3,
      "Stone of Agony": 9,
      "Two Fairy Spells": 22,
      "Water Medallion": 7,
      "Water Temple Boss Key": 3,
      "Win Bombchu Bowling Prize": 9,
      "Zora Tunic": 15,
    });
  });

  it("logs the process while calculating the frequencies", () => {
    const consoleSpy = jest.spyOn(console, "log");

    analyzeFrequencies(250, bingoList, "normal", 123456);

    expect(consoleSpy).toHaveBeenNthCalledWith(
      1,
      "Analyzing goal frequency of 250 boards, starting at seed 123456..."
    );
    expect(consoleSpy).toHaveBeenNthCalledWith(2, "Processed 100 boards... (seed 123556)");
    expect(consoleSpy).toHaveBeenNthCalledWith(3, "Processed 200 boards... (seed 123656)");
    expect(consoleSpy).toHaveBeenNthCalledWith(4, "Finished (processed 250 boards total)");
  });

  it("pretty prints the frequencies", () => {
    const consoleSpy = jest.spyOn(console, "log");

    const frequencies = analyzeFrequencies(100, bingoList, "normal", 123456);
    printFrequencies(frequencies);

    expect(consoleSpy).toHaveBeenLastCalledWith(
      "All 3 Elemental Arrows: 61\n30 Different Skulltulas: 58\n1 Skulltula from each Adult Dungeon: 38\nOpen All 6 Gold Rupee Chests: 37\nBoth Rusty Switches in Spirit Temple: 35\n3 Swords, Tunics, Boots, and Shields: 35\nDefeat Twinrova: 35\n3 Shields & 3 Boots: 33\n8 Hearts (no duping): 33\nGreen Gauntlets: 32\n9 Hearts (no duping): 32\n7 Compasses: 30\n10 Songs: 30\nBeat the Spirit Temple: 30\nGoron Bracelet: 29\nDin's Fire: 28\nAll 5 Skulltulas in Water Temple: 27\nBoth HPs in Lost Woods: 27\nAll 8 Zora's Domain area Skulltulas: 25\nObtain all 5 Small Keys in Shadow Temple: 25\nDefeat Meg (purple Poe): 24\nAll 3 Skulltulas in Bottom of the Well: 24\nTwo Fairy Spells: 22\nAll 5 Skulltulas in Fire Temple: 22\n3 Skulltulas in Water Temple: 22\nClear 10 Silver Rupee Rooms: 21\nAll 5 Lake Hylia Skulltulas: 21\nMap & Compass in Dodongo's Cavern: 20\nExactly 30 Deku Sticks: 20\nMap & Compass in Spirit Temple: 20\nSilver Scale: 20\n4 Skulltulas in Shadow Temple: 19\nOpen 3 Gold Rupee Chests: 19\n5 Magic Beans: 19\nOpen 3 Boss Key Doors: 18\n5 Zora area HPs: 18\n3 Tunics: 17\nDefeat Volvagia: 17\n1 Unused Small Key in each Adult Dungeon: 17\nOpen the Final Door of Water Trial: 17\nBeat the Fire Temple: 17\nFire Temple Boss Key: 17\nQuiver (50): 16\nGiant's Knife: 16\nAll 4 Market area Skulltulas: 16\n7 Different Unused Keys in Gerudo Training Grounds: 16\nNayru's Love: 15\nFarore's Wind: 15\nGanon's Castle Boss Key: 15\nBolero of Fire: 15\nZora Tunic: 15\nQuiver (40): 15\nPlant 5 Magic Beans: 15\nDefeat a Skull Kid: 15\nOpen 2 Boss Key Doors: 14\nFire Medallion: 14\nOpen the Final Door of Shadow Trial: 14\nMinuet of Forest: 14\nAll 8 Kakariko area Skulltulas: 14\nGoron Tunic: 13\n3 Swords & 3 Boots: 13\n7 Maps: 13\nForest Temple Boss Key: 13\n5 Hearts: 13\nBeat Dodongo's Cavern: 12\nSaria's Song: 12\nAll 4 Wasteland/ Colossus area Skulltulas: 12\nBottled Fairy: 12\nFree all 9 Gorons in Fire Temple: 12\nBronze Gauntlets: 12\n7 Hearts (no duping): 12\nObtain all 5 Small Keys in Forest Temple: 12\nAll 5 Skulltulas in Spirit Temple: 12\n9 Songs: 12\nClear 8 Silver Rupee Rooms: 11\nBullet Bag (50): 11\nOpen the Final Door of Spirit Trial: 11\nObtain all 8 Small Keys in Fire Temple: 11\n2 Skulltulas in Lon Lon Ranch: 11\nAll 4 Child Skulltulas in Zora's Domain Area: 11\n6 Compasses: 11\nDefeat Dark Link: 11\nMap & Compass in Deku Tree: 11\nExactly 20 Deku Sticks: 11\nBeat the Water Temple: 10\nAll 5 Skulltulas in Forest Temple: 10\nKeaton Mask: 10\n30 Deku Nuts: 10\n6 Hearts: 10\nMap & Compass in Forest Temple: 10\nLon Lon Ranch HP: 10\nPlant bean in Death Mountain Crater: 10\n4 Unused Keys in Forest Temple: 10\nMap & Compass in Fire Temple: 10\nSilver Gauntlets: 10\nRequiem of Spirit: 10\n2 Boss Keys: 10\n6 Maps: 10\nOpen the Final Door of Fire Trial: 10\nLight Arrows: 10\nMap & Compass in Bottom of the Well: 10\n8 Different Unused Keys in Gerudo Training Grounds: 10\n20 Different Skulltulas: 10\nDefeat Amy (Green Poe): 9\nFairy Slingshot: 9\nForest Medallion: 9\nStone of Agony: 9\n7 Songs: 9\n3 Boots: 9\nBlue Potion: 9\nBeat the Deku Tree: 9\nOpen 50 Rupee chest in Wasteland: 9\nWin Bombchu Bowling Prize: 9\nAll 4 Gerudo Valley area Skulltulas: 9\n3 Swords & 3 Shields: 9\nOpen 5 Gold Rupee Chests: 9\n3 Shields & 3 Tunics: 9\nAll 8 Death Mountain area Skulltulas: 9\nDefeat Morpha: 9\nDefeat 4 Different Iron Knuckles: 9\n3 Lake Hylia Skulltulas: 9\nDefeat Barinade: 8\nCow in House: 8\nDefeat both Flare Dancers: 8\n1 Skulltula from each Child Dungeon: 8\nAll 5 Skulltulas in Shadow Temple: 8\n3 Shields: 8\nBoth Gerudo's Fortress area Skulltulas: 8\nBoth HPs in Death Mountain Crater: 8\n8 Songs: 8\n7 Different Bottled Contents: 8\nMap & Compass in Water Temple: 8\nAll 5 Skulltulas in Dodongo's Cavern: 8\nDefeat Nabooru-Knuckle: 8\nBoomerang: 8\n6 Songs: 7\n5 Unused Keys in Gerudo Training Grounds: 7\nGet Bombchu chest in Spirit Temple: 7\n6 Different Unused Keys in Gerudo Training Grounds: 7\nMap & Compass in Jabu-Jabu: 7\n3 Unused Keys in Gerudo Training Grounds: 7\nMegaton Hammer: 7\nAll 4 Lon Lon Ranch area Skulltulas: 7\n3 Tunics & 3 Boots: 7\nWater Medallion: 7\nDouble Defense: 7\nDefeat Bongo-Bongo: 7\n15 Different Skulltulas: 7\nFill all 4 Bottle Slots: 7\nGiant's Wallet: 7\nDouble Magic: 7\nBeat the Forest Temple: 7\nDefeat Big Octo: 7\nLens of Truth: 7\n4 Songs: 7\nAll 3 Kokiri Forest area Skulltulas: 7\nBoth Hyrule Field area Skulltulas: 7\nAll 4 Skulltulas in Deku Tree: 6\nBeat Jabu-Jabu's Belly: 6\nMirror Shield: 6\nDesert Colossus HP: 6\nOpen the Final Door of Light Trial: 6\nMap & Compass in Ice Cavern: 6\nAll 4 Skulltulas in Jabu-Jabu: 6\nBlue Gauntlets: 6\nIce Cavern HP: 6\nGolden Gauntlets: 6\nMilk: 6\n4 Compasses: 6\n500 Rupees: 6\nEpona's Song: 6\nBoth Gerudo Valley HPs: 6\nAll 4 Lost Woods area Skulltulas: 6\nIce Arrows: 5\nGerudo's Card: 5\n3 Songs: 5\n5 Maps: 5\nDefeat Queen Gohma: 5\nFire Arrows: 5\n7 Magic Beans: 5\nFairy Bow: 5\nBeat the Shadow Temple: 5\nShadow Temple Boss Key: 5\nOpen the Final Door of Forest Trial: 4\nLongshot: 4\nBullet Bag (40): 4\nAll 4 Adult Skulltulas in Zora's Domain Area: 4\nRuto's Letter: 4\nClear 4 Silver Rupee Rooms: 4\n5 Compasses: 4\nBomb Bag (30): 4\n4 Maps: 4\nIron Boots: 4\nDefeat all Lizalfos in Dodongo's Cavern: 3\nSpirit Temple Boss Key: 3\nDefeat a White Wolfos: 3\nAll 3 Skulltulas in Ice Cavern: 3\nBlue Fire: 3\n4 Unused Keys in Gerudo Training Grounds: 3\n37th Heart Piece (Child Fortress): 3\nWater Temple Boss Key: 3\nFrog's HP: 3\n3 Swords & 3 Tunics: 2\nDefeat King Dodongo: 2\nDefeat Phantom Ganon: 2\nMap & Compass in Shadow Temple: 2\n3 Boss Keys: 1\n"
    );
  });
});
