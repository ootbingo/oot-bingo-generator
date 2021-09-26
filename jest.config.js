module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.jsx?$": "babel-jest", // Adding this line solved the issue
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  }