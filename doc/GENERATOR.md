<!-- Inspiration for README's: https://github.com/matiassingers/awesome-readme  -->

# Generator

## Contents

1. [Introduction](#introduction)
2. [Magic Square](#magic-square)
3. [Desired goal times](#desired-goal-times)
4. [Population order](#population-order)
5. [Picking goals](#picking-goals)
6. [Blackout boards](#blackout-boards)

## Introduction

This document explains in detail how an OoT bingo board gets generated. It includes all the steps the generator takes to
generate a board from scratch, **apart from the synergy calculations**. Those will be explained in another document.

You can use this document to help guide you through the code of the generator, but it was also written to be
understood **without any prior programming knowledge**! So if you're not into coding but still want to know what steps
the generator takes, you're in the right place. Sometimes there's a reference to a function in the code, but you don't
need to read along with the code to follow this document.

At the end of each section you will find an example illustrating what just has been explained with actual numbers. The
examples are consistent between sections and are all based on the same seed.

In the code of the generator, a 5x5 bingo board is represented as an array of 25 squares. The generator aims to populate
the positions 0 to 24 of the array with a goal. The first 5 elements of the array correspond to the squares of row 1,
the next 5 to the squares of row 2, et cetera.

## Magic Square

The first step to generating a card is calculating a 5x5 [magic square](https://en.wikipedia.org/wiki/Magic_square). In
a magic square, the sum of the numbers in each row, column and diagonal is the same. For bingo cards, the number **1**
to **25** are used to fill each position of the square, all only appearing once. The sum of each possible row, column or
diagonal is equal to **65**.

The code to generate a magic square can be found in [magicSquare.ts](/src/magicSquare.ts). Based on the seed, the
function `magicSquareNumber()` calculates what number should go in a given position of the square. It gets called
by `generateMagicSquare()`, which loops over positions 1 to 24 to calculate each magic square number.

### Example

With seed `112233`, the following magic square numbers get generated:

```ts
[21, 15, 19, 3, 7, 4, 8, 22, 11, 20, 12, 16, 5, 9, 23, 10, 24, 13, 17, 1, 18, 2, 6, 25, 14]
```

Formatted as an actual square:

|   21   |   15   |   19   |   3    |   7    |
|:------:|:------:|:------:|:------:|:------:|
| **4**  | **8**  | **22** | **11** | **20** |
| **12** | **16** | **5**  | **9**  | **23** |
| **10** | **24** | **13** | **17** | **1**  |
| **18** | **2**  | **6**  | **25** | **14** |

## Desired goal times

### Difficulty

The term **'difficulty'** is being used in a slightly confusing way in bingo lingo. Counterintuitively, the difficulty
of a goal is related to its length, and has nothing to do with how hard or easy the goal is to complete. The latter is
being taken into account by the timings sheet, and is called the '**skill**' of a goal.

The number on each tile of the generated magic square represents the difficulty of that tile. That means that the tile
with a 1 should get the shortest goal, and the tile with 25 should get the longest. Because of the properties of the
magic square, this approach results in rows that are all of similar length.

Note that from now on, the term 'square' will indicate one tile of the board.

### Time per difficulty

Now, to know what goals can go in what squares, we need to convert the difficulty of each square to an actual time in
minutes. That is done by multiplying with the `timePerDifficulty` constant. All constants that the generator uses are
defined in [definitions.ts](/src/definitions.ts). There are profiles with different constants for each type of bingo
card. In [types/profiles.ts](/src/types/profiles.ts) you can find a short explanation on each parameter.

### Desired time

Each difficulty gets multiplied by the timePerDifficulty to get the **desired time** of the square. The desired time is
the ideal amount of time a goal on that square should take to complete. The generator is allowed to deviate from it a
little; the `offset` constants define how much. More on that later.

The function `mapDifficultyToSquare()` maps a difficulty to a `Square` object, which contains the
calculated `desiredTime`, and the unchanged `difficulty` for reference.

### Example

For normal bingo cards, the `timePerDifficulty` is equal to **0.75** (at the time of writing this). Continuing the
earlier example, the first square with number **21** gets a **desired time** of  **15.75** (`21 * 0.75`), i.e. 15m45s.
The second square gets a desired time of **11.25** (`15 * 0.75`). Doing this for all squares results in the following
**desired times** (in minutes):

|  15.75   |  11.25  |  14.25   |   2.25    |   5.25    |
|:--------:|:-------:|:--------:|:---------:|:---------:|
|  **3**   |  **6**  | **16.5** | **8.25**  |  **15**   |
|  **9**   | **12**  | **3.75** | **6.75**  | **17.25** |
| **7.5**  | **18**  | **9.75** | **12.75** | **0.75**  |
| **13.5** | **1.5** | **4.5**  | **18.75** | **10.5**  |

## Population order

It's almost time to start picking goals. But first, the generator needs to know *in which order* each square has to be
populated with a goal. This happens in the `generatePopulationOrder()` function, which returns a list of indices. The
order is as follows:

1. The 3 squares with the **highest difficulty** *always* get populated first (difficulty **25**, then **24**, then **
   23**)
2. Then the **center** square of the board
3. Then the squares on the **diagonals** (tlbr/bltr), in random order
4. Then the all the other squares, in random order

Note that for steps 2-4, it can occur that some of the squares were already picked in step 1, then they get ignored in
these steps.

The reason that the squares with the highest difficulty get picked first, is that they will have the longest desired
times, meaning they will be populated with the longest goals. But there are significantly less long goals to pick from.
If you pick them late, there might not be any options left that do not conflict with already populated squares.

For similar reasons, the center square and diagonals get populated before the rest of the board. These squares appear in
the most rows, so goals on those squares deal with more restrictions caused by goals in the rows they're in. Generation
is more likely to be successful if you pick these first.

### Example

On our example board, the **population order** would be:

```ts
[23, 16, 14, 12, 8, 24, 20, 18, 6, 4, 0, 10, 1, 19, 22, 5, 21, 17, 7, 15, 3, 2, 11, 13, 9]
```

Index **23** belongs to the square with difficulty **25** (row5/col4), index **16** belongs to the square with
difficulty **24** (row4/col2) and index **14** belongs to the square with difficulty **23** (row3/col5).

The next index is **12**, which is the center square (happens to have difficulty 5). Then the diagonal square indices
follow in random order (**8**, **24**, **20**, **18**, **6**, **4**, **0**). Note that index **24** is also on a
diagonal, but it already appeared earlier in the list because its square has difficulty **24**.

The next indices belong to all the other squares, in random order.

## Picking goals

To fill the board with goals, the generator first picks the first square from the population order, and tries to pick a
goal for it. If it succeeds, it picks the next square from the population order, and continues until all square have a
goal. If it fails to find any goal for a square that meets all the requirements, it gives up.

The `iterations` parameter of the generator decides how many times it will retry to generate a board for a certain seed.
Usually this is a high number, like **100**. Every iteration it starts 'from scratch' with an empty board, but the rng
will be different, allowing for a new chance to possibly succeed.

Every time the generator tries to fill a square, the `pickGoalForPosition()` function is called. This looks at the
desired time of the square, and tries to pick a goal from the goal list that is close in length to that desired time.
The `initialOffset` parameters determines how much (in minutes) the length of a goal on this square may from the desired
time. Then the `getShuffledGoalsInTimeRange()` function collects and shuffles all goals from the goal list that fall in
this range.

One by one, the generator takes a goal from this list and tries to pick it for this square. If it's already on the
board, or if it causes too much synergy in a row (or with any other goal when it's a blackout), it continues to the next
square. If none of the goals fit, the time range gets widened, which means the generator will also accept goals for this
square when they deviate a little more from the desired time. The `maximumOffset` parameter determines what the maximum
allowed difference between desired time and actual goal length can be.

Apart from skipping over the complicated part, the *synergy calculations*, these were all the steps involved in
generating a board.

### Example

The first square to fill in the population order was the one with index **23** (next to last square of row5). As usual,
this is the square with the highest desired time, 18m45s. The generator now looks at all the goals in the goal list
which have durations that are at most one minute away from the desired time. In this case, that's all goals with a
length between 17m45s and 19m45s:

* Beat the Spirit Temple (18m25s)
* 1 Skulltula from each Adult Dungeon (17m45s)
* Open all 6 gold rupee chests (18m25s)
* Both Rusty Switches in Spirit Temple (18m15s)
* 3 Swords, Tunics, Boots and Shields (17m45s)

Since the board is still completely empty, no restrictions stop the first goal of the list to be picked. So the square
with index **23** gets populated with 'Beat the Spirit Temple'.

If somehow none of these goals would have been legal to pick (which is not the case now), the time range would have been
increased to 16m45 - 20m45s. For normal bingo boards, this range (2 minutes away from desired time) is the maximum. If
none of the goals within this increased range would fit, the generator would fail to generate.

## Blackout boards

Generating blackout boards is actually very similar to normal boards. Different parameters are being given to the
generator, but it still uses a magic square and looks at synergies like a normal board. This way, the boards have a nice
distribution of short and long goals. In addition, it makes the total duration of a blackout card not vary too much
between seeds.

The *only* difference in the generator itself, apart from these different parameters, is the `hasConflictsOnBoard()`
check. This check requires that any goal that gets picked does not have too much synergy with any other goal already on
the board, regardless of which row it is in. If a goal has more than the `maximumIndividualSynergy` with another goal,
that is regarded as too much.

The (current) biggest parameter differences are the higher amount of synergies allowed within rows, a higher maximum
deviation of goal times from desired times (6 minutes), and a higher individual synergy (4.5 instead of 3.75).

### Todo

* Mention frequency balancing
* Mention skill?