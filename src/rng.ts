import { seedrandom } from "./legacy/seedrandom-min";

/**
 * Provides a random numbers based on a seed
 */
export class RNG {
  constructor(seed: number) {
    seedrandom();
    (Math as any).seedrandom(seed.toString());
  }

  nextRandom() {
    return Math.random();
  }
}
