# Balancing

## Contents

1. [Introduction](#introduction)
2. [Bingo sheet](#bingo-sheet)
3. [Synergies](#synergies)
    1. [Type synergies](#type-synergies)
    2. [Subtype synergies](#subtype-synergies)
    3. [Rowtype synergies](#rowtype-synergies)
4. [Goal information](#goal-information)

## Introduction

This document explains the concepts that have to do with balancing OoT Bingo goals. The lengths and synergies of goals
are determined completely separate from the generator, and can be found on
the [Bingo sheet](https://docs.google.com/spreadsheets/d/1-mD-OTM0Re7PyNf224MAsRuqQ0umI0E_Qq6nr1vA1aE/edit?usp=sharing).
It gets updated before every bingo version release. A [script](https://bingosync.com/convert) exists to convert the
bingo sheet to a goal list (in JSON format), which the generator uses to generate boards. Each bingo version has a
unique goal list.

There are a lot of different numbers on Bingo sheet linked above, and this document aims to explain what they all mean.
Note that the synergy amounts mentioned in the examples may have been adjusted since.

## Bingo sheet

The bingo sheet contains all the information on the bingo goals that the generator needs to generate boards. This
includes goal names (in English and Japanese), lengths, skill bonus, and of course all the synergies. What these all
mean will be explained in detail later, but the structure of the sheet is as follows:

* The first few columns contain general information on the goals
* The columns `*ms`, `*bottle`, `*hookshot` and `*gclw` contain **rowtype synergies**. These have a `*` at the start of
  the column name, and a threshold number at the end.
* All the other columns after these contain the **regular synergies**.
* The first row (after the header) contains the **synergy filters**. These are modifiers that change the way synergies
  are applied. Note that only a few of the synergy columns actually have a filter applied.

## Synergies

The term *synergy* is used to describe how combining goals can lead to shorter or longer times needed to complete them.
Generally, when people speak of synergy between goals, they mean the goals have some overlap or that things you collect
in one goal help complete the other faster. Negative synergy on the other hand means that it takes more time to do two
goals together than individually. That can be the case when for one goal you'd remove something with RBA that you'd want
to collect for theother goal.

There are 3 types of synergies:

* Type synergies
* Subtype synergies
* Rowtype synergies

### Type synergies

Type synergies are the 'standard' synergies. On the sheet, these are numbers that are not in a rowtype column and do
**not** have a `*` in front. If goal A and goal B have a *type synergy* of 2, that means that if you complete both these
goals, the time you spend should be two minutes shorter than doing each goal separately. For example, the goals *Iron
Boots* and *All 3 Skulltulas in Ice Cavern* have a synergy of 2, because doing one of these goals saves time for the
other; you already spent time going to Ice Cavern for Iron Boots, so you save that time for the skulls.

On the sheet, goals with a number in the same column share a type synergy. The lowest number of the two counts. For
example, the goal *1 Skulltula from each Child Dungeon* has a `deku` synergy of 2. This roughly means that you'd spend
two minutes going to and being in (the main part of) Deku for this goal. *Defeat Queen Gohma* has a synergy of 5, since
it's a deep Deku goal. We take the lower of the two, so these goals have a `deku` synergy of 2.

Note that although the synergy numbers are in minutes, they are a rough estimation. The actual overlap between goals
depends heavily on the route and other factors. In addition, sometimes the numbers are exaggerated to prevent goals from
appearing together. The many columns at the end of the sheet that start with `inc` have synergies of a 100 to prevent
'free' goals like *All 9 Gorons in Fire Temple* and *Fire Temple Boss Key*.

### Subtype synergies

Subtype synergies work roughly the same as type synergies, but have a twist: they synergize with type synergies, but not
with each other. On the sheet, these are numbers that start with a `*` (and are not in the rowtype columns). You can
view them as 'indirect' synergies, and will often see them appear on collection goals.

For example, take *All 3 Skulltulas in Bottom of the Well*. It has a `skulls` subtype synergy of 1.5. The reason that
it's a subtype and not a regular type, is that you don't want this goal to synergize with every single goal that also
gets skulls. That is, having collected the BotW skulls does not save time for *All 3 Skulltulas in Ice Cavern*. But it
does for the goal *15 Different Skulltulas*, which therefore has a regular `skulls` type synergy of 8.

You'll generally see a lot of subtype synergies for collection items, like skulls, hearts, maps, compasses, and songs.
Only the goals that allow you to collect x amount of these will have type synergies, and the specific collection goals
have subtypes. That way, *8 Hearts* synergizes with any goal that collects hearts, but there won't be synergy between
*Desert Colossus HP* and *Ice Cavern HP*

### Rowtype synergies

The durations of the goals that we determined do *not* include preparation stuff that you would need to do in any row.
Think watching intro, collecting items to escape, watching master sword cutscene, getting hookshot, et cetera. For
specific rows however, it may be possible and faster to skip some of these things. Rowtype synergies were created to
take those cases into account. There are currently **four** different rowtypes:

* ms (Watching master sword cutscene)
* bottle (Collecting a bottle)
* hookshot (Collecting the hookshot)
* gclw (Going to Goron City area and/or Lost Woods)

It is assumed you do all of these every bingo, unless the synergies for one of these stays below the threshold. Rowtype
column names start with a `*`, and have a number for this threshold that denotes how long it takes to do the thing. For
example, the threshold for master sword cs is 9.5 minutes (going to temple of time, dot skip, watching the cs, leaving).
The numbers in the rowtype columns show *how much longer* a goal would take if you would skip the thing.

For example, looking at the `ms` column, you see that *Defeat Barinade* takes 2 minutes longer as child, and *Fairy Bow*
takes 4 minutes longer. If the other three goals in the row would not take any longer as child, it's worth it to skip
master sword cutscene. So the generator would give a rowtype synergy of 3.5 to the row (`9.5 - 2 - 4`), because you can
save that amount of time by not going adult. Note that there are goals with a `ms` synergy of 100; these are impossible
to do as child.

This type of synergies is called 'rowtype' because you can only determine them for a whole row, not for two individual
goals. Only if you know all the goals of a row can you determine if it's worth to skip one of these preparation things;
if skipping loses too much time for just one of the goals, it's not worth anymore.

## Synergy filters

## Goal information

The following columns on the sheet contain non-synergy information the generator needs:

### timey

The `#timey` column contains the pure durations of the goals in minutes. These were determined by timing how long a goal
takes to complete optimally, assuming the general preparation (as discussed in
the [Rowtype synergies](#rowtype-synergies) section) has already been done. These times are **not** actually used by the
generator, but is used to calculate the `time` column. The `#` in front of the column name makes it so that it won't
appear in the goal list.

### skill

Some goals are more difficult to complete than others. The `skill` column contains a bonus to reward picking difficult
goals. The skill number of a goal is added to the `timey` duration to make it artificially longer. When performing
optimally, that means players should be able to save a little time because the goals take shorter than the generator
thinks. The skill bonus goes up to 1 minute max.

Confusingly enough, the `difficulty` column means something completely different and has nothing to do with the skill
required for a goal.

### time

The goal times that the generator receives are present in the `time` column. They are currently the sum of the `timey`
and the `skill` columns. Possible other adjustment columns could be added to it as well in the future.

### difficulty

## Todo

- Meaning of column names on the sheet
- SelfSynergy