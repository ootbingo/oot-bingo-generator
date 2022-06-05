# Timing

## Contents

1. [Introduction](#introduction)
2. [Part 1: Determining `timey`](#part-1-determining-timey)
    1. [Base](#base)
    2. [RTA Method](#rta-timing-method)
    3. [Bingo recording method](#bingo-recording-method)
3. [Part 2: Taking synergies into account](#part-2-taking-synergies-into-account)
    1. [Rowtype synergies](#rowtype-synergies)

## Introduction

This document aims to explain how the timing of goals is determined. It is recommended to first read
the [Balancing document](BALANCING.md), which explains a lot of the concepts mentioned here in further detail (like
types of synergies, skill, basetime, etc.).

The premise of a goal's timing is this: how much time is the goal going to add to a row that otherwise didn't have it?
Of course, this question is not answerable with a single number since a goal will synergize differently in every row, so
we do this in two parts. Part 1 assumes no synergy at all. This is the `timey` that you see on
the [Bingo spreadsheet](https://docs.google.com/spreadsheets/d/1-mD-OTM0Re7PyNf224MAsRuqQ0umI0E_Qq6nr1vA1aE/edit?usp=sharing)
. Part 2 is trying to account for synergies that will cause the goal to actually take less time than that in practice.

## Part 1: Determining `timey`

### Base

For Part 1, we need to first understand what the **base** is. Generally, every bingo will require certain things that
are not part of any goal, like general preparation, watching required cutscenes, and getting items you always need. Here
is the current list of what's included in the **base**:

* Intro Cutscene
* Escape forest
* Get a bottle (usually Kakariko)
* Door of Time skip
* Get explosives (either Bottom of the Well chus or Cojiro RBA)
* Get hookshot
* Navigate to Lost Woods or Goron City

There are exceptions where you can skip some of these in a row. Those are accounted for with
the [rowtype synergies](#rowtype-synergies).

### RTA timing method

In general, the `timey` for a goal is calculated by performing these actions while doing an RTA of that goal in
isolation. Usually one would do the RTA after finishing all the **base** stuff, but some goals (for example *Kokiri
Skulls*) would be done in the middle of the base. Any non-base actions contribute toward the timing of the goal.

For a simple goal like *Beat the Fire Temple*, it is really easy to just time how long it takes to beat the Fire Temple
from entering Goron City, and that is the `timey`. *All 3 Kokiri Forest area Skulltulas* is a bit more difficult.
Without it, the child section would only get a bottle in Kakariko and then head straight adult. But when including the
goal, one resets after bottle, collects the child Kak skulls, and then heads adult. You would need to time both of these
and consider the difference between the two in order to figure out how much time the child skulls took.

For the adult Kokiri Skull, you can time from Lost Woods and run to the skull. You can assume the player has routed in
such a way that it will be night time. If it is deemed tedious or difficult to generally line the time up this way, it
can be accounted for in the `skill` column. For example, *All 8 Zora's Domain Area Skulltulas* gets a skill bonus
because it is especially difficult to make time of day work well.

Also, generally assume the time needed to get back on track to the next objective is negligible. After collecting the
Kokiri Skull, the player may even play a warp song and immediately begin making progress to their next goal. A notable
exception is goals like *Beat the Water Temple*, which end on a cutscene. This time will be accounted for with
the `endon` synergy, which records how much longer the goal takes if the player does not end on that goal.

### Bingo recording method

The `timey` can also be calculated by watching a bingo someone has done. All the time that someone contributes toward
completing a goal is noted, and the sum of those contributions represents the `timey`. If progress is made toward
multiple goals at the same time, it counts for all of those goals and the overlap will be accounted for entirely by
synergies.

For example, if a row contains the goals *3 Shields* and *Nayru's Love*, the time spent heading from Water Temple or
Temple of Time to the Spirit area counts for both goals. The synergies `fortress` and `spirit` should entirely explain
this overlap.

You could approach this by making a document with timestamps of every important point in the run where the player
switches from going after one goal to going after another. That way, you can just add up the times corresponding to
progress for each goal. For example:

```
25:00 leaves graveyard
26:00 enters DC (to kill Lizalfos)
(-0:30 you suck at this game)
30:30 leaves DC
31:15 enters Goron City
```

From these timestamps we would conclude that killing the Lizalfos took 4:30 to complete, but there were 30 seconds of
mistakes, so we really time it at 4 minutes. The rest of those timestamps involve things we consider part of the
**base** (heading from Graveyard to Goron City), so they do not contribute time toward any goal.

Some things to watch out for:

* **Suboptimal play** If a player makes mistakes (either in routing or execution), do **not** count these in the time.
  The `timey` assumes optimal play, within reason. If a goal is really tough and even good players often make mistakes
  on it, we can partially account for that using the `skill` column on the sheet.

* **Extra items** For example, when just doing the *Fairy Bow* goal, it is actually faster to skip Hover Boots and just
  push the blocks in Forest Temple. Remember, Hover Boots are **not** part of the **base**. If the player happens to
  have Hover Boots while doing Fairy Bow, you **cannot** use that for `timey`, although it may help to determine how
  much Hover Boots synergy the goal should have. For *3 Shields*, the time it takes to get Hover Boots is included in
  the timing of the goal since Hover Boots are always collected for it.

Always keep in mind as you are thinking about this method - how much shorter would the bingo be if that item was not in
the bingo? That is the essence of what we are trying to calculate. In addition, the synergies involved with the items
that are in the row have to be considered.

#### Example of a video timing

[This video](https://www.twitch.tv/videos/250416373) demonstrates in detail how the timing for a full run is determined.
It is kinda long, but you may not need to watch the whole thing. Watch until you get a feeling for how the timestamps
work, and then skip to the [part after the run](https://www.twitch.tv/videos/250416373?t=1h10m36s) to see how the
timestamps are used to determine the timings of the goals.

#### Timing collection goals

Collection goals are difficult to time. Just timing a collection goal like *8 Hearts* or *30 Different Skulltulas* in
isolation doesn't really tell you how long it would take in a full row. For these goals, we kind of just have to make an
educated guess after watching a lot of real bingos and seeing how long they generally take. We can get an idea of how
long 1 Piece of Heart or 1 Skulltula takes to collect on average, and then if a row gives you access to easy Heart
Pieces or Skulls that take less time to collect, we can account for that with the appropriate synergy.

## Part 2: Taking synergies into account

The best way to get an idea for Part 2 of timing (calculating synergy) is just to watch a lot of bingos and see how the
synergies come up in real examples. This also takes a long time, though.

### Rowtype synergies

Theoretically, we should also consider if it's possible to skip any of the **base** and whether that saves time for a
goal. Rowtype synergy values show whether that's the case (the [Balancing doc](BALANCING.md) explains them in detail).
The biggest rowtype category is `ms` (Master Sword cutscene). How much longer does a goal take if you do it only as
child? This time difference is recorded in the `ms` column. If it is not possible to do the goal child-only, we put a
value of **100** to indicate "impossible".

For rowtypes like `bottle`, since it only takes 2 minutes to collect, sometimes we were lazy and just put **100** as the
value even though it is possible to skip. In those cases, it definitely took longer than 2 minutes to skip the bottle,
and we didn't bother to figure out by how much. An example is *Quiver 40*. It's possible to time legit *Quiver 40* and
compare it to using RBA (needing bottle), but it doesn't matter because the difference is way more than 2 minutes.

Note: It is possible in the future that Hover Boots may work better as part of the base if we think people are getting
the boots more than 80% of the time.