import BingoGenerator from "./generator";
import { BingoList } from "./types/goalList";
import { extractGoalList } from "./util";
import { Mode, Profile } from "./types/settings";
import { DEFAULT_PROFILES } from "./definitions";
import { Board } from "./types/board";

/**
 * Main function for generating bingo boards (used in live versions)
 * Function name has to be preserved for compatibility with bingosetup.js in the bingo repo
 * Returns board in the right (legacy) format for the bingo setup
 * @param bingoList Object with the goal list
 * @param options Object containing mode and seed
 * @returns A bingo board in the legacy format (list with goals and metadata, starting at index 1)
 */
export function ootBingoGenerator(bingoList: BingoList, options: { mode: Mode; seed: number }) {
  const goalList = extractGoalList(bingoList, options.mode);
  const profile = DEFAULT_PROFILES[options.mode];
  const bingoGenerator = new BingoGenerator(goalList, options.mode, profile);
  const { goals, meta } = bingoGenerator.generateBoard(options.seed);

  // make goals start from position 1 in the list (as expected by bingosetup.js)
  const shiftedGoals = [];
  goals.forEach((goal, index) => (shiftedGoals[index + 1] = goal));

  shiftedGoals["meta"] = meta;
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
 * @returns A bingo board
 */
export function generateBoard(
  bingoList: BingoList,
  mode: Mode,
  seed: number,
  profile?: Profile
): Board {
  const goalList = extractGoalList(bingoList, mode);
  const bingoGenerator = new BingoGenerator(goalList, mode, profile ?? DEFAULT_PROFILES[mode]);
  return bingoGenerator.generateBoard(seed);
}
