// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  mode: "production",
  entry: ["./src/index.ts", "./src/types/*", "./src/analysis/*.ts", "./src/constants/profiles.ts"],
  output: {
    path: path.resolve(__dirname, "./bundle"),
    filename: "ootBingoGenerator.js",
    clean: true,
    library: "OotBingoGenerator",
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
