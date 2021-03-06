# The Generator

## Contents

1. [Introduction](#introduction)
2. [Magic Square](#magic-square)
3. [Desired goal times](#desired-goal-times)
4. [Population order](#population-order)
5. [Picking goals](#picking-goals)
6. [Blackout boards](#blackout-boards)
7. [Theoretical row length](#theoretical-row-length)

## Introduction

This document explains in detail how an OoT bingo board gets generated. It includes all the steps the generator takes to
generate a board from scratch, **apart from the synergy calculations**. For a step-by-step explanation on those, read
the [Synergy Calculation doc](/doc/SYNERGY_CALCULATION.md).

You can use this document to help guide you through the code of the generator, but it was also written to be
understood **without any prior programming knowledge**! So if you're not into coding but still want to know what steps
the generator takes, you're in the right place. There are a few references to the code here and there, but those are not
essential to understand the generation process.

At the end of each section, you will find an example illustrating has just been explained with actual numbers. The
examples are consistent between sections and are all based on the same seed.

In the code of the generator, a **5x5** bingo board is represented as an array of **25** squares. The generator aims to
populate the positions **0** to **24** of the array with a goal. The first **5** elements of the array correspond to the
squares of `row 1`, the next **5** to the squares of `row 2`, et cetera.

## Magic Square

The first step to generating a board is calculating a **5x5** [magic square](https://en.wikipedia.org/wiki/Magic_square)
. In a magic square, the sum of the numbers in each row, column, and diagonal is the same. For bingo boards, the numbers
**1** to **25** are used to fill each position of the square, all only appearing once. The sum of each possible row,
column, or diagonal is equal to **65**.

In the code, this step is taken when the [`PotentialBingoBoard`](/src/potentialBingoBoard.ts) class is created.
In [magicSquare.ts](/src/magicSquare.ts) you can find the calculations for generating the magic square. Based on the
seed, the function `magicSquareNumber()` calculates what number should go in a given position of the square. It gets
called by `generateMagicSquare()`, which loops over positions **1** to **24** to calculate each magic square number.

### Example

With seed `112233`, the following magic square numbers are generated:

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
of a goal is related to its length and has nothing to do with how hard or easy the goal is to complete. The latter is
being taken into account by the timings sheet, and is called the '**skill**' of a goal (see
the [Balancing doc](/doc/BALANCING.md) for more info on skill).

The number on each tile of the generated magic square represents the difficulty of that tile. That means that the tile
with a **1** should get the shortest goal, and the tile with **25** should get the longest. Because of the properties of
the magic square, this approach results in rows that are all of similar length.

Note that from now on, the term 'square' will indicate one tile of the board.

### Time per difficulty

Now, to know what goals can go in what squares, we need to convert the difficulty of each square to an actual time in
minutes. That is accomplished by multiplying by the `timePerDifficulty` constant. All constants that the generator uses
are defined in [profiles.ts](/src/constants/profiles.ts). There are profiles with different constants for each type of
bingo board. In [types/settings.ts](/src/types/settings.ts) you can find a short explanation on each parameter.

### Desired time

Each difficulty gets multiplied by the timePerDifficulty to get the **desired time** of the square. The desired time is
the ideal amount of time a goal on that square should take to complete. The generator is allowed to deviate from it a
little; the `offset` constants define how much. More on that later.

When the magic square has been computed, each difficulty gets mapped to a `Square` object containing the
calculated `desiredTime` and the unchanged `difficulty` for reference.

### Example

For normal bingo boards, the `timePerDifficulty` is equal to **0.75**. Continuing the earlier example, the first square,
with the number **21**, gets a **desired time** of  **15.75** (`21 * 0.75`), i.e. **15m45s**. The second square gets a
desired time of **11.25** (`15 * 0.75`). Doing this for all squares results in the following
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

1. The 3 squares with the **highest difficulty** are *always* filled first (difficulty **25**, then **24**, then
   **23**)
2. Then the **center** square of the board
3. Then the squares on the **diagonals** (tlbr/bltr), in random order
4. Then all the other squares, in random order

Note that for steps 2-4, it can occur that some of the squares were already picked in step 1, then they get ignored in
these steps.

The reason that the squares with the highest difficulty get picked first, is that they will have the longest desired
times, meaning they will be populated with the longest goals. But there are significantly fewer long goals to pick from.
If you pick them late, there might not be any options left that do not conflict with already populated squares.

For similar reasons, the center square and diagonals get populated before the rest of the board. These squares appear in
the most rows, so goals on those squares deal with more restrictions caused by goals in the rows they're in. Generation
is more likely to be successful if you pick these first.

### Example

For our example board, the **population order** would be:

```ts
[23, 16, 14, 12, 8, 24, 20, 18, 6, 4, 0, 10, 1, 19, 22, 5, 21, 17, 7, 15, 3, 2, 11, 13, 9]
```

Index **23** belongs to the square with difficulty **25** (`row5`/`col4`), index **16** belongs to the square with
difficulty **24** (`row4`/`col2`) and index **14** belongs to the square with difficulty **23** (`row3`/`col5`).

The next index is **12**, which is the center square. Then the diagonal square indices follow in random order (**8**,
**24**, **20**, **18**, **6**, **4**, **0**). It's worth nothing that index number **24** is also on a diagonal, but it
appeared earlier in the list because its square has a difficulty of **24**.

The next indices belong to all the other squares, in random order.

## Picking goals

To fill the board with goals, the generator first picks the first square from the population order, and tries to pick a
goal for it. If it succeeds, it picks the next square from the population order, and continues until all squares have a
goal. If it fails to find any goal for a square that meets all the requirements, it gives up.

The `iterations` parameter of the generator decides how many times it will try to generate a board for a certain seed
before giving up. Usually this is a high number, like **100**. Every iteration it starts 'from scratch' with an empty
board, but the rng will be different, allowing for a new chance to possibly succeed.

Every time the generator tries to fill a square, the `pickGoalForPosition()` function is called. This looks at the
desired time of the square, and tries to pick a goal from the goal list that is close in length to that desired time.
The `initialOffset` parameter determines how much the length of a goal on this square may vary from the desired time.
The `getShuffledGoalsInTimeRange()` function then gathers and shuffles all goals from the goal list that fall within
this time range.

One by one, the generator takes a goal from this list and tries to pick it for this square. If it's already on the
board, or if it causes too much synergy in a row (or with any other goal when it's a blackout), it continues to the next
square. If none of the goals fit, the time range gets widened, which means the generator will also accept goals for this
square when they deviate a little more from the desired time. The `maximumOffset` parameter determines the maximum
allowed difference between the desired time and the actual goal length.

Calculating how much synergy adding a square to a row would cause is done
in [synergyCalculator.ts](/src/synergyCalculator.ts). Refer to [Synergy Calculation doc](/doc/SYNERGY_CALCULATION.md)
for a step-by-step explanation. Apart from that, we've now seen all the steps involved in generating a bingo board!

### Example

The first square to fill in the population order was the one with index **23** (next to last square of `row 5`). As
usual, this is the square with the highest desired time, **18m45s**. The generator now looks at all the goals in the
goal list that have durations that are at most one minute away from the desired time. In this case, that's all goals
with a length between **17m45s** and **19m45s**:

* *Beat the Spirit Temple* (**18m25s**)
* *1 Skulltula from each Adult Dungeon* (**17m45s**)
* *Open all 6 gold rupee chests* (**18m25s**)
* *Both Rusty Switches in Spirit Temple* (**18m15s**)
* *3 Swords, Tunics, Boots and Shields* (**17m45s**)

Since the board is still completely empty, no restrictions prevent the first goal of the list from being picked. So the
square with index **23** gets filled with 'Beat the Spirit Temple'.

If somehow none of these goals would have been legal to pick (which is not the case now), the time range would have been
increased to **16m45** - **20m45s**. For normal bingo boards, this **2**-minute range in either direction is the
maximum. If none of the goals within this increased range fits, the generator would fail to generate.

## Blackout boards

Generating blackout boards is actually very similar to generating normal boards. Different parameters are being given to
the generator, but it still uses a magic square and looks at synergies like a normal board. This way, the boards have a
nice distribution of short and long goals. In addition, it makes the total duration of a blackout board not vary too
much between seeds.

The *only* difference in the generator itself, apart from these different parameters, is the `hasConflictsOnBoard()`
check. This check requires that any goal that gets picked does not have too much synergy with any other goal already on
the board, regardless of which row it is in. If a goal has more than the `maximumIndividualSynergy` with another goal,
that is regarded as too much.

The current biggest parameter changes that were made for blackouts are the higher total amount of synergy allowed per
row, an increased maximum deviation of goal times from desired times (**6** minutes), and an increased maximum
individual synergy (**4.5** instead of **3.75**).

## Frequency balancing

Some goals are a lot more likely to appear on boards than others. As mentioned earlier, there are many more short goals
than long goals, resulting in the same long goals being picked often. In addition, some goals may also have specific
synergies that can make it harder for them to appear. To compensate for this effect a little bit, the concept of
**frequency balancing** was introduced. Each goal in the goal list had a weight between **-2** and **2** assigned to it;
the rarer the goal, the higher the weight (see
the [balancer script](https://github.com/srmcconomy/balanced-bingo/blob/master/auto-balancer.js)).

In the `getShuffledGoalsInTimeRange()` function in [generator.ts](/src/generator.ts), the generator shuffles the
potential goals that can be picked for a specific square. If frequency balancing is enabled, it uses a
`weightedShuffle`. This function pushes goals with a high weight towards the front of the list, so they get considered
before goals with lower weights. There is still an element of randomness involved though, the list is not sorted solely
based on the weights.

## Theoretical row length

For a given generator, we can calculate the **theoretical row length**. This is how long the generator aims to make each
row.

```
theoretical row length = baselineTime + timePerDifficulty * 65
```

The values of parameters can be found in [profiles.ts](/src/constants/profiles.ts). The `baselineTime` defines how long
the preparation setup of a row is expected to take. This includes things that are not included in the goal timings
themselves, like watching the intro, collecting items to escape, watching master sword cutscene, grabbing hookshot, et
cetera. The `baselineTime` is not actually used in the generator since it's the same for each row.

The value **65** is the sum of the magic square numbers of a row. Multiplying by the `timePerDifficulty` gives the
desired time of all the goals in the row.

For normal boards of the bingo version `v10.1` the theoretical row length is equal to **1:13:30**:

```
theoretical row length = 24.75 + 0.75 * 65 = 73.5
```

This is assuming the row has no synergies. The maximum amount of row synergy allowed in `v10.1` is **7**, and the
minimum is **-3**. So theoretically, the shortest possible row would take **1:06:30** while the longest possible row
would take
**1:16:30**:

```
theoretical shortest row length = 24.75 + 0.75 * 65 - 7 = 66.5
theoretical longest row length  = 24.75 + 0.75 * 65 + 3 = 76.5
```
