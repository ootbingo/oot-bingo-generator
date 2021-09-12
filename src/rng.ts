import seedrandom from "./legacy/seedrandom-min";

class RNG {

    constructor(seed: number) {

        seedrandom();
        (Math as any).seedrandom(seed);
    }

    nextRandom() {
        return Math.random();
    }
}

export default RNG;
