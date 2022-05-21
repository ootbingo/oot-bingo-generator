import { RowAnalyzer } from "../analysis/rowAnalysis";

describe("rowAnalysis", () => {
  const bingoList = require("./test-bingo-lists/combined-bingo-list-v10_1.json");

  it("correctly analyzes the synergies of a row", () => {
    const rowAnalyzer = new RowAnalyzer(bingoList, "normal");
    const report = rowAnalyzer.analyzeRow(123456, "bltr");

    expect(report).toStrictEqual({
      rowtypeSynergies: {},
      timeDifferences: [-0.5, -0.25, 1, -1, -0.25],
      totalSynergies: {
        rowtype: 0,
        timeDifference: -1,
        total: 6.75,
        type: 7.75,
      },
      typeSynergies: {
        aganon: [0.25],
        botw: [-1],
        endon: [-0.25],
        fortress: [1.5, 2.5],
        fountain: [2],
        gtg: [1],
        gtunic: [0.25],
        hovers: [0.25, 1, 1],
        poachers: [0.75],
        selfsynergy: [-3, -0.5, 0, 0],
        spirit: [2],
      },
    });
  });
});
