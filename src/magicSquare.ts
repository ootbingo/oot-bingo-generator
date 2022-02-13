import { squarePositions } from "./domain/board";

export function generateMagicSquare(seed: number): number[] {
  return squarePositions.map((i) => magicSquareNumber(i, seed));
}

// get the magic square number for a position on the magic square, for a given seed
function magicSquareNumber(pos: number, seed: number): number {
  // To create the magic square we need 2 random orderings of the numbers 0, 1, 2, 3, 4.
  // The following creates those orderings and calls them Table5 and Table1

  let Num3 = seed % 1000; // Table5 will use the ones, tens, and hundreds digits.

  let Rem8 = Num3 % 8;
  let Rem4 = Math.floor(Rem8 / 2);
  let Rem2 = Rem8 % 2;
  let Rem5 = Num3 % 5;
  let Rem3 = Num3 % 3; // Note that Rem2, Rem3, Rem4, and Rem5 are mathematically independent.
  let RemT = Math.floor(Num3 / 120); // This is between 0 and 8

  // The idea is to begin with an array containing a single number, 0.
  // Each number 1 through 4 is added in a random spot in the array's current size.
  // The result - the numbers 0 to 4 are in the array in a random (and uniform) order.
  const Table5 = [0];
  Table5.splice(Rem2, 0, 1);
  Table5.splice(Rem3, 0, 2);
  Table5.splice(Rem4, 0, 3);
  Table5.splice(Rem5, 0, 4);

  Num3 = Math.floor(seed / 1000); // Table1 will use the next 3 digits.
  Num3 = Num3 % 1000;

  Rem8 = Num3 % 8;
  Rem4 = Math.floor(Rem8 / 2);
  Rem2 = Rem8 % 2;
  Rem5 = Num3 % 5;
  Rem3 = Num3 % 3;
  RemT = RemT * 8 + Math.floor(Num3 / 120); // This is between 0 and 64.

  const Table1 = [0];
  Table1.splice(Rem2, 0, 1);
  Table1.splice(Rem3, 0, 2);
  Table1.splice(Rem4, 0, 3);
  Table1.splice(Rem5, 0, 4);

  RemT = RemT % 5; //  Between 0 and 4, fairly uniformly.
  const x = (pos + RemT) % 5; //  RemT poss horizontal shift to put any diagonal on the main diagonal.
  const y = Math.floor(pos / 5);

  // The Tables are set into a single magic square template
  // Some are the same up to some rotation, reflection, or row permutation.
  // However, all genuinely different magic squares can arise in this fashion.
  const e5 = Table5[(x + 3 * y) % 5];
  const e1 = Table1[(3 * x + y) % 5];

  // Table5 controls the 5* part and Table1 controls the 1* part.
  return 5 * e5 + e1 + 1;
}
