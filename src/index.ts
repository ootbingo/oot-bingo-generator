import BingoGenerator from "./generator";
import { BingoList, Goal } from "./types/goalList";
import { extractGoalList } from "./util";
import { Mode, Profile } from "./types/settings";
import { BingoBoard } from "./bingoBoard";
import { DEFAULT_PROFILES } from "./constants/profiles";

/**
 * Main function for generating bingo boards (used in live versions)
 * Function name has to be preserved for compatibility with bingosetup.js in the bingo repo
 * Returns board in the right (legacy) format for the bingo setup
 * @param bingoList Object with the goal list
 * @param options Object containing mode and seed
 * @returns A bingo board in the legacy format (array with goals starting from index 1, and metadata in the array object)
 */
export function ootBingoGenerator(bingoList: BingoList, options: { mode: Mode; seed: number }) {
  const goalList = extractGoalList(bingoList, options.mode);
  if (!goalList) {
    return;
  }
  const profile = DEFAULT_PROFILES[options.mode];
  const bingoGenerator = new BingoGenerator(goalList, options.mode, profile);
  const board = bingoGenerator.generateBoard(options.seed);

  if (!board) {
    return;
  }

  // make goals start from position 1 in the list (as expected by bingosetup.js)
  const shiftedGoals: Goal[] = [];
  board.goals.forEach((goal, index) => (shiftedGoals[index + 1] = goal));

  // @ts-ignore Typescript does not like the legacy format where a string key is used to store the meta information in the array object
  shiftedGoals["meta"] = { iterations: board.iterations };
  return shiftedGoals;
}

/**
 * Wrapper for BingoSync
 */
export function bingoGenerator(bingoList: BingoList, options: { mode: Mode; seed: number }) {
  return ootBingoGenerator(bingoList, options);
}

/**
 * Function for generating boards, for internal use
 * @param bingoList Object with the goal list
 * @param mode Mode (normal, short, blackout, etc.)
 * @param seed Rng seed
 * @param profile Optional, the generator uses a standard profile fitting the mode if not provided. Note that in previous generators the profiles were always built in.
 * @returns A bingo board object
 */
export function generateBingoBoard(
  bingoList: BingoList,
  mode: Mode,
  seed: number,
  profile?: Profile
): BingoBoard | undefined {
  const goalList = extractGoalList(bingoList, mode);
  if (!goalList) {
    return;
  }
  const bingoGenerator = new BingoGenerator(goalList, mode, profile ?? DEFAULT_PROFILES[mode]);
  return bingoGenerator.generateBoard(seed);
}
