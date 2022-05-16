# Balancing (the Bingo Sheet)

## Contents

1. [Introduction](#introduction)
2. [Bingo sheet](#bingo-sheet)
3. [Synergies](#synergies)
    1. [Type synergies](#type-synergies)
    2. [Subtype synergies](#subtype-synergies)
    3. [Rowtype synergies](#rowtype-synergies)
4. [Synergy filters](#synergy-filters)
    1. [Combining synergies in a row](#combining-synergies-in-a-row)
    2. [Filters](#filters)
    3. [Rowtype synergies](#rowtype-synergies)
    4. [Filter example](#filter-example)
5. [Goal information](#goal-information)
    1. [timey](#timey)
    2. [skill](#skill)
    3. [time](#time)
    4. [difficulty](#difficulty)
6. [Special synergy categories](#special-synergy-categories)
    1. [selfsynergy](#selfsynergy)
    2. [endon](#endon)
7. [True goal duration](#true-goal-duration)
8. [The goal list](#the-goal-list)

## Introduction

This document explains the concepts that have to do with balancing OoT Bingo goals. The lengths and synergies of goals
are determined completely separate from the generator, and can be found on
the [Bingo sheet](https://docs.google.com/spreadsheets/d/1-mD-OTM0Re7PyNf224MAsRuqQ0umI0E_Qq6nr1vA1aE/edit?usp=sharing).
It gets updated before every bingo version release. There is a [converter](https://bingosync.com/convert)
(which uses [this script](https://github.com/kbuzsaki/bingosync/blob/master/bingosync-app/bingosync/goals_converter.py))
that transforms the bingo sheet into a [goal list](#the-goal-list). Each bingo version has a unique goal list.

There are a lot of different numbers on the Bingo sheet linked above, and this document aims to explain what they all
mean. Note that the synergy amounts mentioned in the examples may have been adjusted since.

## Bingo sheet

The bingo sheet contains all the information about the bingo goals that the generator needs to generate boards. This
includes goal names (in English and Japanese), lengths, skill bonus, and all the synergies. What these all mean will be
explained in detail later, but the structure of the sheet is as follows:

* The first few columns contain general information on the goals.
* The columns `*ms`, `*bottle`, `*hookshot`, and `*gclw` contain **rowtype synergies**. These have a `*` at the start of
  the column name, and a threshold number at the end.
* All the other columns after these contain the **regular synergies**.
* The first row (after the header) contains the **synergy filters**. These are modifiers that change the way synergies
  are applied. Note that only a few of the synergy columns actually have a filter applied.

The columns with synergies in them will also be referred to as synergy 'categories' in this doc.

## Synergies

The term *synergy* is used to describe how combining goals can lead to shorter or longer times needed to complete them.
Generally, when people speak of synergy between goals, they mean the goals have some overlap or that things you collect
in one goal help complete the other faster. Negative synergy, on the other hand, means that it takes more time to
complete two goals together than individually. That can be the case when one goal would force you to delete something
with RBA that you'd want to collect for the other goal.

There are three kinds of synergies:

* Type synergies
* Subtype synergies
* Rowtype synergies

### Type synergies

**Type synergies** are the 'standard' synergies. On the sheet, these are numbers that are not in a rowtype column and do
**not** have a `*` in front. If goal A and goal B have a *type synergy* of **2**, that means that if you complete both
these goals, the time you spend should be two minutes shorter than if you did each goal separately. For example, the
goals *Iron Boots* and *All 3 Skulltulas in Ice Cavern* have a synergy of **2**, because doing one of these goals saves
time for the other; you already spent time going to Ice Cavern for Iron Boots, so you save that time for the skulls.

On the sheet, goals with a number in the same column share a type synergy. The lowest value of the two counts. For
example, the goal *1 Skulltula from each Child Dungeon* has a `deku` synergy of **2**. This roughly means that you'd
spend two minutes going to and being in (the main part of) Deku for this goal. *Defeat Queen Gohma* has a synergy of
**5**, since it's a deep Deku goal. We take the lower of the two, so these goals have a `deku` synergy of **2**.

Note that although the synergy values are in minutes, they are only a rough estimation. The actual overlap between goals
depends heavily on the route and other factors. In addition, sometimes the values are exaggerated to prevent goals from
appearing together. The many columns at the end of the sheet that start with `inc` have synergies of **100** to prevent
'free' goals like *All 9 Gorons in Fire Temple* and *Fire Temple Boss Key*.

### Subtype synergies

**Subtype synergies** work roughly the same as type synergies, but have a twist: they synergize with type synergies, but
not with each other. On the sheet, these are numbers that start with a `*` (and are not in the rowtype columns). You can
regard them as 'indirect' synergies, and you will often see them appear on collection goals.

For example, take *All 3 Skulltulas in Bottom of the Well*. It has a `skulls` subtype synergy of **1.5**. The reason
that it's a subtype and not a regular type is that you don't want this goal to synergize with every single goal that
also gets skulls. That is, having collected the BotW skulls does not save time for *All 3 Skulltulas in Ice Cavern*. But
it does for the goal *15 Different Skulltulas*, which therefore has a regular `skulls` type synergy of **8**.

You'll generally see a lot of subtype synergies for collection items, like skulls, hearts, maps, compasses, and songs.
Only the goals that allow you to collect a certain amount of these will have type synergies, and the specific collection
goals have subtypes. That way, *8 Hearts* synergizes with any goal that collects hearts, but there won't be synergy
between *Desert Colossus HP* and *Ice Cavern HP*.

### Rowtype synergies

The durations of the goals that we determined do *not* include preparation stuff that you would need to do in any row.
Think about watching the intro, collecting items to escape, watching master sword cutscene, grabbing hookshot, et
cetera. For specific rows, however, it may be possible and faster to skip some of these things. **Rowtype synergies**
were created to take those cases into account. There are currently **four** different rowtypes:

* `ms` (watching master sword cutscene)
* `bottle` (collecting a bottle)
* `hookshot` (collecting the hookshot)
* `gclw` (going to Goron City area and/or Lost Woods)

It is assumed you do all of these every bingo, unless the synergies for at least one of these remain below the threshold
value. Rowtype category names start with a `*` and have a value for this threshold that denotes how long it takes to do
the thing. For example, the threshold for master sword cs is **9.5** minutes (going to temple of time, dot skip,
watching the cs, leaving). The numbers in the rowtype columns show *how much longer* a goal would take if you skipped
the thing.

For example, looking at the `ms` category, you see that *Defeat Barinade* takes **2** minutes longer as child, and *
Fairy Bow* takes **4** minutes longer. If the other three goals in the row would not take any longer as child, it's
worth it to skip master sword cutscene. So the generator would give a rowtype synergy of **3.5** to the
row (`9.5 - 2 - 4`), because you can save that amount of time by not going adult. Note that there are goals with a `ms`
synergy of 100; these are impossible to do as child.

This type of synergy is called 'rowtype' because you can only determine it for a whole row, not for two individual
goals. Only once you know all the goals of a row can you determine if it's worth skipping one of these preparation
things; if skipping loses too much time for just one of the goals, it's not worth it anymore.

## Synergy filters

### Combining synergies in a row

Before looking at the synergy filters, it's important to understand how the synergy values of multiple goals get
combined into a total synergy. Imagine we have a row containing three goals with a `hovers` synergy: *4 Compasses* with
**2**, *Shadow Temple Boss Key* with **1.5** and *Beat the Water Temple* with **\*1**. What is the total amount
of `hovers` synergy in this row? By default, the **highest value always gets dropped**, and the rest gets summed. So, in
this example, the row has a `hovers` synergy of `1.5+1=2.5`.

This rule goes for any number of goals; in the case of two goals, the higher number gets removed and only the lower
number is counted. If there is only one goal in a row with a certain synergy, that gets ignored; you need at least two
goals for a synergy to have an effect.

### Filters

Almost all synergy categories get combined as just described. But there are a few that work differently. These are the
categories where the first cell of the column contains a filter. A filter starts with the word `min` or `max`, followed
by a positive or negative number. If the word is `min`, you look at the lowest numbers, and if it's `max`, you look at
the highest. The filter `min 2` means that you take the lowest two synergies. If the filter is `max 1`, you take the
highest synergy. For negative numbers, you take everything *except* for an amount at the end. So `min 2` means that you
take all the lowest synergies, but leave out the highest two. And `max 1` means you take all the highest synergies and
leave out the lowest value. Take a look at the example in the table before.

Note that categories on the sheet without a synergy filter all implicitly use the filter `min -1`, since the standard
way of combining synergies is removing the highest value.

So what's the point of these custom filters? Take the `legitlacs` category for example, which aims to prevent free light
arrows. It has a synergy value of *100* for Beat Shadow, Beat Spirit and Light Arrow goals. If the standard filter
of `min -1` were applied, only one out of those three could appear in a row. But two out of these three would also be
okay, since only all three together result in Light Arrows being free. Therefore, `legitlacs` has a filter of `min -2`,
which removes the two highest synergies. Beat Shadow and Beat Spirit can appear together, or Light Arrow and Beat Shadow
for example. In those cases, both synergies are removed. But if all three appear, one synergy of **100** remains, which
is always too high for the generator to allow.

Another example is the `endon` synergies, explained in the [endon](#endon) section.

### Filter example

Imagine we have a row with five goals, and those goals all have an `x` synergy: **0.5**, **1**, **2.5**, **2** and
**-1** respectively. The following table shows which of those synergies would be added to the row total for different
synergy filters.

| filter / syn | -1 | 0.5 | 1   | 2   | 2.5 |
|--------------|---|-----|-----|-----|-----|
| min 1        | x |     |     |     |     |
| min 2        | x | x   |     |     |     |
| min -1       | x | x   | x   | x   |     |
| min -2       | x | x   | x   |     |     |
| max 1        |   |     |     |     | x   |
| max 2        |   |     |     | x   | x   |
| max -1       |   | x   | x   | x   | x   |
| max -2       |   |     | x   | x   | x   |

## Goal information

The following columns on the sheet contain non-synergy information the generator needs:

### timey

The `#timey` column contains the pure duration of a goal in minutes. It was determined by timing how long a goal takes
to complete optimally, assuming the general preparation (as discussed in the [Rowtype synergies](#rowtype-synergies)
section) has already been done. This time is **not** actually used by the generator, but is used to calculate the `time`
column. The `#` in front of the column name makes it so that it won't appear in the goal list.

For goals that have `selfsynergy` or `endon` synergies, the `timey` value is actually not equal to the pure duration
(see [Special synergy categories](#special-synergy-categories)).

### skill

Some goals are more difficult to complete than others. The `skill` column contains a bonus to reward picking difficult
goals. The skill number of a goal is added to the `timey` duration to make it artificially longer. When performing
optimally, that means players should be able to save a little time because the goals take less time than the generator
thinks. The skill bonus goes up to **1** minute max.

### time

The goal times that the generator uses can be found in the `time` column. They are currently the sum of the `timey`
and `skill` columns. Potential new adjustment columns could be added to it in the future, but currently:

```
time = timey + skill
```

### difficulty

The term 'difficulty' in bingo lingo is pretty confusing. It has nothing to do with how difficult a goal is; that
is [skill](#skill). Difficulty is solely linked to duration. There are **25** difficulty 'buckets', one for each square
on a bingo board. The shortest goals go in bucket **1**, and the longest in bucket **25**. To convert regular goal
durations to their difficulty, you divide the duration by the `timePerDifficulty` constant defined in
[definitions.ts](/src/definitions.ts), and round the result. More information on how this all works can be found in
the [Generator doc](/doc/GENERATOR.md).

The difficulties defined on the sheet are not directly used by the generator; it actually converts the difficulties of
the board to desired goal times and uses those (again, see the balancing doc for further explanation). However, when the
script converts the bingo sheet to a goal list, the resulting JSON groups all the goals by their difficulty. This is for
legacy/BingoSync format reasons, since the generator flattens the goal list before using it.

In short:

```
difficulty = round(time / timePerDifficulty)
```

## Special synergy categories

### selfsynergy

Typically, collection goals (skulls, hearts, songs, maps, etc.) have many synergies in common with other goals. There is
a maximum amount of synergy a row can have, and these collection goals tend to eat up a lot of it. To mitigate this a
bit, the concept of **selfsynergy** was created. A small amount of time (usually between **1** and **3** minutes) was
removed from the raw goal time `timey`, making these goals artificially shorter. The time was added back in the
selfsynergy column as a **negative synergy**. Since negative synergies get added to the total expected time of the row,
this does not directly make the row shorter. However, the total synergy limit of the row that the collection goal
appears in practically gets increased.

*5 Compasses*, for example, has a `selfsynergy` value of **-3** but a raw `timey` of **9.25**. This means that the
actual duration of this goal is **12.25**. The total amount of synergy in a row with this goal is now **3** minutes
lower, making the row seem **3** minutes slower. This practically undoes the shortening of the raw time, but results
in **3** minutes of extra synergy that can now be added to this row. The result is that *5 Compasses* now has a better
chance of appearing.

In addition to collection goals, the `selfsynergy` category can also be used to slightly adjust the time of a goal to
move it to a different [difficulty](#difficulty) bucket. For example, if there are no goals with a difficulty of **23**,
you could remove a little time from a goal with difficulty **24** and turn it into `selfsynergy`. These small
adjustments don't have a big impact on the balance, but they help to get more variety in goals on the board.

### endon

Some goals are shorter when they are the final goal you complete, like when they are directly followed by a cutscene.
The `timey` column only takes into account when the goal is completed, and ignores the fact that you might be stuck in a
cutscene afterwards. Therefore, we have `endon` antisynergy for goals that are slower when you don't end on them.

This `endon` synergy should apply to all the goals in the row that you don't end on. The `max -1` synergy takes all
the `endon` values except for the lowest (most negative) value, assuming the player ends on the goal which would be
followed by the most downtime.

## True goal duration

As mentioned earlier, `timey` is not always exactly equal to the raw goal duration. If there's selfsynergy, it should be
subtracted from `timey`. The `endon` value should also be subtracted when you *do not end* on the goal.

So in short, the true raw durations are as follows.

When ending on a goal:

```
raw duration = timey - selfsynergy
```

When **not** ending on a goal:

```
raw duration = timey - selfsynergy - endon
```

## The goal list

Each bingo version has its own goal list. The script mentioned in the [introduction](#introduction) is used to convert
the sheet to a javascript object. Here is a shortened example of a goal list that the converter outputs:

```js
var bingoList = {
  0: [], // list of goals with difficulty 0
  1: [], // list of goals with difficulty 1
  //...
  50: [], // list of goals with difficulty 50
  info: { version: "v10" },
  rowtypes: { // all the rowtype categories with their threshold values
    bottle: 2.0,
    gclw: 1.0,
    hookshot: 3.0,
    ms: 11.0
  },
  synfilters: { // all the synergy categories that have a none-default synergy filter
    childchu: "min 1",
    endon: "max -1",
    legitlacs: "min -2"
  },
}
```

The lists of some difficulties may be empty. Typically, for regular bingo, only difficulties **1** to **24** have goals.
A goal looks like this for example:

```js
var goal = {
  difficulty: 8,
  id: "beat-dodongo-s-cavern", // 'name' from the sheet, with non-alphanumerical characters converted to dashes
  jp: "ドドンゴの洞窟クリア",
  name: "Beat Dodongo's Cavern",
  rowtypes: { bottle: 0.5, gclw: 0.5, hookshot: 0, ms: 1 }, // has the values this goal has for each rowtype
  skill: 0.25,
  subtypes: { compass: 2, hearts3: 3, hearts4: 1, map: 2, skulls: 0.5 }, // all subtype synergies of this goal (values on the sheet that start with * )
  time: 5.75,
  types: { dc: 3, fortress: 2, incdodongo: 100, kd: 2, selfsynergy: 0 }, // all type synergies of this goal (non-rowtype values on the sheet without * )
}
```

Apart from the goal list for regular bingo, we also have one for short bingo. After using the converter for both goal
lists, we combine them to one final list for the version. The info property contains `combined: "true"` to tell the
generator both the regular and short bingo list is present:

```js
// the goal list as used by the generator
export var bingoList = {
  info: {
    combined: "true", // true or false string
    version: "v10",
  },
  normal: {}, // the regular bingo list object
  short: {}, // the short bingo list object
}
```

Take a look at the [example goal list](/src/sandbox/exampleBingoList.ts) to see what an actual list looks like. You'll
see that each goal also has a `weight` property. The weights are for the **frequency balancing**, and they are added by
the [balancer script](https://github.com/srmcconomy/balanced-bingo/blob/master/auto-balancer.js). Read more on frequency
balancing in the [generator doc](/doc/GENERATOR.md).

Blackout bingo uses the same goal list as normal bingo, but has a different settings profile in the generator.
Unfortunately, a bingo version is currently not solely defined by the goal list. The generator settings can vary between
versions. These settings are defined in the generator code itself, so we bundle every bingo version with its own
generator file. In the future, we may move those settings to the goal list, making it easier to adjust generator
settings between versions.
