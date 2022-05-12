// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  mode: "production",
  entry: ["./src/index.ts", "./src/types/*", "./src/analysis/frequencyAnalysis.ts"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "generator.js",
    clean: true,
    library: "BingoLibrary",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
};
