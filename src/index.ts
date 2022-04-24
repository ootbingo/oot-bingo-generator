import BingoGenerator from "./generator";
import { BingoList } from "./types/goalList";
import { Options } from "./types/options";
import { extractGoalList } from "./util";
import { Profiles } from "./types/profiles";

/**
 * Main function for generating bingo cards
 * Function name has to be preserved for compatibility with bingosetup.js in the bingo repo
 * Returns card in the right (legacy) format for the bingo setup
 * @param bingoList Object with the goal list
 * @param options Object containing language, mode and seed
 * @returns A bingo card in the legacy format (list with goals and metadata, starting at index 1)
 */
export const ootBingoGenerator = (bingoList: BingoList, options: Options) => {
  const goalList = extractGoalList(bingoList, options.mode);
  const bingoGenerator = new BingoGenerator(goalList, options);
  const { goals, meta } = bingoGenerator.generateCard();

  // make goals start from position 1 in the list (expected by bingosetup.js)
  const shiftedGoals = [];
  goals.forEach((goal, index) => (shiftedGoals[index + 1] = goal));

  shiftedGoals["meta"] = meta;
  return shiftedGoals;
};

/**
 * Wrapper for BingoSync
 */
export const bingoGenerator = (bingoList: BingoList, options: Options) => {
  return ootBingoGenerator(bingoList, options);
};

/**
 * Function for generating cards, for internal use
 * @param bingoList Object with the goal list
 * @param options Object containing language, mode and seed
 * @param profiles Optional, maps each mode to a profile. The generator uses standard profiles if not provided. Note that in previous generators the profiles were always built in.
 * @returns A bingo card
 */
export const generateCard = (
  bingoList: BingoList,
  options: Options,
  profiles?: Profiles
) => {
  const goalList = extractGoalList(bingoList, options.mode);
  const bingoGenerator = new BingoGenerator(goalList, options, profiles);
  return bingoGenerator.generateCard();
};
