import BingoGenerator from "./generator";
import { BingoList } from "./types/goalList";
import { extractGoalList } from "./util";
import { Mode, Profile } from "./types/settings";
import { DEFAULT_PROFILES } from "./definitions";
import { Card } from "./types/board";

/**
 * Main function for generating bingo cards (used in live versions)
 * Function name has to be preserved for compatibility with bingosetup.js in the bingo repo
 * Returns card in the right (legacy) format for the bingo setup
 * @param bingoList Object with the goal list
 * @param options Object containing mode and seed
 * @returns A bingo card in the legacy format (list with goals and metadata, starting at index 1)
 */
export function ootBingoGenerator(
  bingoList: BingoList,
  options: { mode: Mode; seed: number }
) {
  const goalList = extractGoalList(bingoList, options.mode);
  const profile = DEFAULT_PROFILES[options.mode];
  const bingoGenerator = new BingoGenerator(
    goalList,
    options.seed,
    options.mode,
    profile
  );
  const { goals, meta } = bingoGenerator.generateCard();

  // make goals start from position 1 in the list (as expected by bingosetup.js)
  const shiftedGoals = [];
  goals.forEach((goal, index) => (shiftedGoals[index + 1] = goal));

  shiftedGoals["meta"] = meta;
  return shiftedGoals;
}

/**
 * Wrapper for BingoSync
 */
export function bingoGenerator(
  bingoList: BingoList,
  options: { mode: Mode; seed: number }
) {
  return ootBingoGenerator(bingoList, options);
}

/**
 * Function for generating cards, for internal use
 * @param bingoList Object with the goal list
 * @param mode Mode (normal, short, blackout, etc.)
 * @param seed Rng seed
 * @param profile Optional, the generator uses a standard profile fitting the mode if not provided. Note that in previous generators the profiles were always built in.
 * @returns A bingo card
 */
export function generateCard(
  bingoList: BingoList,
  mode: Mode,
  seed: number,
  profile?: Profile
): Card {
  const goalList = extractGoalList(bingoList, mode);
  const bingoGenerator = new BingoGenerator(
    goalList,
    seed,
    mode,
    profile ?? DEFAULT_PROFILES[mode]
  );
  return bingoGenerator.generateCard();
}
