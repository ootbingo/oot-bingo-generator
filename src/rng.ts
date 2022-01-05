import {seedrandom} from "./legacy/seedrandom-min";

export class RNG {

    constructor(seed: number) {

        seedrandom();
        (Math as any).seedrandom(seed.toString());
    }

    nextRandom() {
        return Math.random();
    }
}