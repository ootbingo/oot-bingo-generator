# Balancing

## Contents

1. [Introduction](#introduction)
2. [Bingo sheet](#bingo-sheet)
3. [Synergies](#synergies)
    1. [Type synergies](#type-synergies)
    2. [Subtype synergies](#subtype-synergies)
    3. [Rowtype synergies](#rowtype-synergies)

## Introduction

This document explains the concepts that have to do with balancing OoT Bingo goals. The lengths and synergies of goals
are determined completely separate from the generator, and can be found on
the [Bingo sheet](https://docs.google.com/spreadsheets/d/1-mD-OTM0Re7PyNf224MAsRuqQ0umI0E_Qq6nr1vA1aE/edit?usp=sharing).
These get updated before every bingo version release. There is [a script](https://bingosync.com/convert) to convert the
bingo sheet to a goal list (in JSON format), which the generator uses to create boards. Each bingo version has a unique
goal list.

There are a lot of different numbers on Bingo sheet linked above, and this document aims to explain what they all mean.
Note that the synergy amounts mentioned in the example may be different on the sheet if they have been changed after
writing.

## Bingo sheet

The bingo sheet states all the information on the bingo goals that the generator needs to generate boards. This includes
their names (in English and Japanese), lengths, skill bonus, and of course all the synergies. What these all mean will
be explained in detail later, but the structure of the sheet is as follows:

* The first few columns contain general information on the goals
* The columns `ms`, `bottle`, `hookshot` and `gclw` contain **rowtype synergies**. They can be recognized by the
  `*` at the start of the column name, and the number at the end.
* All the other columns after these contain the **regular synergies** of the goals.
* The first row (after the header) contains the **synergy filters**. These are modifiers, that change the way synergies
  are applied. Note that only a few of synergy columns actually have filters applied.

## Synergies

First of all, the term *synergy* is being used to describe how much overlap there is between goals.

There are 3 types of synergies:

* Type synergies
* Subtype synergies
* Rowtype synergies

### Type synergies

These are the 'standard' synergies. On the sheet, these are the numbers *without a `*` in front*. If goal A and goal B
have a *type synergy* of 2, that means that if you complete both these goals, the time you spent should be two minutes
shorter than doing each goal separately. For example, the goals *Iron Boots* and *All 3 Skulltulas in Ice Cavern* have a
synergy of 2, because doing one of these goals saves time for the other; you already spent time in Ice Cavern for one of
the goals, and save time for the other.

On the sheet, goals with type synergy both have a number in the same column. *The lowest number* then counts as the
synergy. For example, the goal *1 Skulltula from each Child Dungeon* has a `deku` synergy of 2. This roughly means that
you'd spent two minutes going to Deku and getting the skull. *Defeat Queen Gohma* as a synergy of 5. We take the lower
of the two, so these goals have a `deku` synergy of 2.

Note that although the synergy numbers are in minutes, they are a rough estimation. The actual overlap between goals
depends heavily on the route and other factors. In addition, sometimes the numbers are exaggerated to prevent goals from
appearing together. The many columns at the end of the sheet that start with `inc` have synergies of a 100. Of course
those are not actual minutes.

### Subtype synergies

These synergies work roughly the same as type synergies, but have a twist: they synergize with type synergies, but not
with each other. On the sheet, these are the number that start with a `*`. You can view them as *indirect synergies*.
You will often see them appear on collection goals.

For example, take *All 3 Skulltulas in Bottom of the Well*. It has a `skulls` subtype synergy of 1.5. The reason that
it's a subtype and not a regular type, is that you don't want this goal to synergize with every single goal that also
gets skulls. That is, having collected the BotW skulls does not save time for *All 3 Skulltulas in Ice Cavern*. But it *
does* for the goal *15 Different Skulltulas*, which therefore has a regular `skulls` type synergy of 8.

### Rowtype synergies

The durations of the goals do *not* include preparation stuff that you would need to do for any row. Think watching
intro, collecting items to escape, watching master sword cutscene, getting hookshot, et cetera. For specific rows
however, it may be possible and faster to skip some of these things. Rowtype synergies were created to take those cases
into account. There are currently **four** different rowtypes:

* ms (Watching master sword cutscene)
* bottle (Collecting a bottle)
* hookshot (Collecting the hookshot)
* gclw (Going to Goron City area and/or Lost Woods)

It is assumed you do all of these every bingo, unless the synergies for one of these stays below the threshold. Rowtype
column names start with a `*`, and have a number for this threshold. That denotes how long it takes to do the thing,
e.g. 9.5 minutes for master sword cs (going to temple of time, dot skip, watching the cs). The numbers in the column
then denote *how much longer* a goal would take if you would skip the thing.

For example, *Defeat Barinade* takes 2 minutes longer as child, and *Fairy Bow* takes 4 minutes longer. If the other
three goals in the row would not take any longer without going adult, it's worth it to skip master sword cutscene,
because that takes 9.5. So the generator would add rowtype synergy of `9.5 - 2 - 4 = 3.5` to the row, because you can
save that amount of time by not going adult. Note that there goals with a `ms` synergy of 100: these are goals that are
impossible to do as child.

This type of synergies is called 'rowtype' because you can only determine these synergies for a whole row, not for two
individual goals. Because only if you know all the goals of the row, you can determine if it's worth to skip one these
preparation things; if skipping loses too much time one one of the goals, it's not worth anymore.