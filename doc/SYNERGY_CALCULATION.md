# Synergy calculation

## Contents

1. [Introduction](#introduction)
2. [The row](#the-row)
3. [Merging synergies](#merging-synergies)
    1. [Merging type synergies](#merging-type-synergies)
    2. [Merging subtype synergies](#merging-subtype-synergies)
    3. [Unifying (sub)type synergies](#unifying-subtype-synergies)
    4. [Merging rowtype synergies](#merging-rowtype-synergies)
4. [Filtering synergies](#filtering-synergies)
    1. [Filtering unified type synergies](#filtering-unified-type-synergies)
    2. [Filtering rowtype synergies](#filtering-rowtype-synergies)
5. [Time differences](#time-differences)

## Introduction

## The row

In all the examples in this doc we're going to be looking at a row with the following five goals:

* *Silver Scale*
* *Defeat Meg*
* *Bombchu Chest in Spirit*
* *6 Gold Rupees*
* *Desert Colossus HP*

We're going to calculate the total amount of synergy in this row. To do this we need to know all the individual
synergies of the goals. We can find those in the goal list; shown below is a simplified version of these five goals. A
few synergies and properties have been removed to keep the example from getting to complicated, but these values are
realistic:

```js
const goals = [
  {
    goal: "Silver Scale",
    time: 3,
    rowtypes: { bottle: 0, gclw: 0, hookshot: 0, ms: 0 },
    subtypes: { skulls: 100, strength: 100 },
    types: { selfsynergy: 0 }
  },
  {
    goal: "Defeat Meg (purple Poe), time 14.25",
    time: 14.25,
    rowtypes: { bottle: 0.5, gclw: 1, hookshot: 100, ms: 6 },
    subtypes: { compass: 4, map: 2.5, skulls: 1.75, },
    types: { selfsynergy: 0, forest: 3, hovers: 2, incforest: 100 }
  },
  {
    goal: "Get Bombchu chest in Spirit Temple",
    time: 7,
    rowtypes: { bottle: 0, gclw: 0, hookshot: 2, ms: 1 },
    subtypes: {
      compass: 1,
      hovers: 1,
      map: 2,
      skulls: 0.75
    },
    types: { selfsynergy: 0, fortress: 2.5, spirit: 5 }
  },
  {
    goal: "6 Gold Rupees",
    time: 18.25,
    rowtypes: { bottle: 0, gclw: 1, hookshot: 100, ms: 100 },
    subtypes: {
      compass: 2,
      hovers: 1,
      map: 6,
      skulls: 2,
      strength: 1.5,
    },
    types: {
      selfsynergy: -2,
      dmc: 1,
      fire: 5,
      fortress: 2.5,
      gtg: 3,
      botw: 0,
    }
  },
  {
    goal: "Desert Colossus HP",
    time: 8.75,
    rowtypes: { bottle: 0, gclw: 0, hookshot: 0, ms: 0 },
    subtypes: { compass: 1, map: 3, skulls: 0.75, },
    types: { selfsynergy: 0, fortress: 2.5, spirit: 3, }
  }
]
```

When the generator considers a new goal for a square, it calculates the synergy of all rows it will be in. For example,
if it tries to put a goal on the top-left square, it calculates the synergy of `row 1`
, `column 1` and `tlbr`. For each of these, the function `calculateSynergyOfSquares()`
in [synergyCalculator.ts](/src/synergyCalculator.ts) is called with the potential square and any other squares that were
already put in that row.

In this doc we're calculating the synergy for a complete row with five goals. During generation that would happen when
the final goal is added to a row, so for our example you can imagine that one of the goals (e.g. *Defeat Meg*) is being
considered here as the fifth goal while the others were already picked for the board.

## Merging synergies

First, the generator merges the synergies for each type with `mergeSynergiesOfSquares()`.

### Merging type synergies

For the **type synergies** this results in the following object. Basically for each synergy category (that appears in at
least one of the five goals) it lists all the type synergies in the row.

```js
const typeSynergiesOfSquares = {
  forest: [3],
  hovers: [2],
  incforest: [100],
  meg: [8.75],
  selfsynergy: [0, 0, -2, 0, 0],
  fortress: [2.5, 2.5, 2.5],
  spirit: [5, 3],
  dmc: [1],
  fire: [5],
  gtg: [3],
  botw: [0],
}
```

This shows that there is only one goal with `hovers` type synergy (*Defeat Meg*), two goals with `spirit` type
synergy (*6 Gold Rupees* and *Bombchu Chest in Spirit*), and that all the goals have `selfsynergy`. Compare this to the
goal list [from earlier](#the-row) to verify all the type synergies are here.

### Merging subtype synergies

The merged **subtype synergies** work similarly:

```js
const subtypeSynergiesOfSquares = {
  compass: [4, 1, 2, 1],
  map: [2.5, 2, 6, 3],
  skulls: [1.75, 0.75, 2, 0.75, 100],
  hovers: [1, 1],
  strength: [1.5, 100],
}
```

The `hovers` subtypes come from *Bombchu Chest in Spirit* and *6 Gold Rupees* for example, and all of the goals
have `skulls` subtype synergy.

### Unifying (sub)type synergies

Now it's time to merge the **types** and **subtypes** together to get the **unified type synergies**. As explained in
the [balancing doc](/doc/BALANCING.md), subtype synergies only count when a corresponding type is present.
So `unifyTypeSynergies()` looks at the types of [`typeSynergiesOfSquares`](#merging-type-synergies) and adds the
corresponding subtypes from [`subtypeSynergiesOfSquares`](#merging-subtype-synergies); the remaining subtypes are
dropped.

```js
const unifiedTypeSynergies = {
  forest: [3],
  hovers: [2, 1, 1],
  incforest: [100],
  meg: [8.75],
  selfsynergy: [0, 0, -2, 0, 0],
  fortress: [2.5, 2.5, 2.5],
  spirit: [5, 3],
  dmc: [1],
  fire: [5],
  gtg: [3],
  botw: [0],
}
```

The only subtype synergies that ended up here are `hovers`; all the others were not present as types. So apart from
adding the two `hovers` subtype values to the existing one, there were no changes compared
to [`typeSynergiesOfSquares`](#merging-type-synergies).

### Merging rowtype synergies

The **rowtype synergies** of the five goals are also collected into one object:

```js
const rowtypeSynergiesOfSquares = {
  bottle: [0.5, 0, 0, 0, 0],
  gclw: [1, 0, 1, 0, 0],
  hookshot: [100, 2, 100, 0, 0],
  ms: [6, 1, 100, 0, 0]
}
```

Each goal always has a value for every category of rowtype synergy, so they all have five numbers here. From the values
for `bottle` it can be concluded that one of the goals would take half a minute longer if bottle is skipped in this row,
but for the other goals it makes no difference. The two *100* values for `hookshot` mean that for two of the goals, it's
never worth to skip hookshot (*Defeat Meg* and *6 Gold Rupees*). For another goal it takes 2 minutes longer without
(*Bombchu Chest in Spirit*). Rowtypes are explained in more detail in the [balancing doc](/doc/BALANCING.md).

## Filtering synergies

### Filtering unified type synergies

Now it's time for the generator to decide which of the synergy values are relevant to keep, by applying the **synergy
filters**. The [balancing doc](/doc/BALANCING.md) describes in detail what they do, but in short: each synergy category
has a filter which determines what synergy values are relevant. Almost all categories use the same standard filter which
removes the highest value from the list (`min -1`), but some use other filters.

The function `filterTypeSynergies()` takes the [`unifiedTypeSynergies`](#unifying-subtype-synergies) and transforms each
list based on the corresponding synergy filter. The property `synergyFilters` class contains all the synergy categories
that have a non-standard filter:

```ts
 const synergyFilters = {
  botw: { filterType: 'min', filterValue: 1 },
  childchu: { filterType: 'min', filterValue: 1 },
  endon: { filterType: 'max', filterValue: -1 },
  ganonchu: { filterType: 'min', filterValue: 1 },
  legitlacs: { filterType: 'min', filterValue: -2 }
}
```

So for each category in [`unifiedTypeSynergies`](#unifying-subtype-synergies) the generator looks if it appears
in `synergyFilters`, and if so, applies that filter. If it does not appear there, it applies the standard filter
of `min -1` by removing the highest number from the synergies. In `filterForTypeCategory()` you see that for 'max'
filters the values get sorted ascending, and for `min` filters descending. Then for filters with `filterValue` *n* it
takes the first *n* values. For filters with
*-n* it removes *n* values from the end.

The only category from the example that appears in `synergyFilters` is `botw`, so the `min 1` filter is applied to its
values. All the other categories (`forest`, `hovers`, etc) just have their highest value removed, resulting in
the `filteredTypeSynergies` below. A few categories like `forest`, `meg` and `gtg` have disappeared, because they only
had one synergy value. One goal with a synergy generally doesn't do anything, you need two for a synergy to be relevant.

```ts
const filteredTypeSynergies = {
  hovers: [2, 1, 1],
  selfsynergy: [0, 0, -2, 0, 0],
  fortress: [2.5, 2.5, 2.5],
  spirit: [5, 3],
}
```

### Filtering rowtype synergies

To figure out which rowtype synergies are relevant to keep, the generator adds up the rowtype synergies for each rowtype
category. That is the amount of extra time needed in this row to skip the thing associated with the rowtype category (
e.g. hookshot). If it stays under the time gained from skipping (the threshold defined in the `rowtypeTimeSave` property
of the class), the difference between the two will be kept as the final rowtype synergy.

```ts
const rowtypeTimeSave = { bottle: 2, gclw: 1, hookshot: 2.75, ms: 9.5 }

```

Looking back at [`rowtypeSynergiesOfSquares`](#merging-rowtype-synergies), the only rowtype where the sum stays under
the threshold is `bottle` with 0.5 minutes lost. That is less than the 2-minute time save, so a total of `2 - 0.5 = 1.5`
minutes can be saved by skipping bottle in this row. The `gclw` values sum up to 2 which is higher than the threshold of
1, and the other rowtypes have 100 values making them impossible to do.

```ts
const filteredRowtypeSynergies = {
  bottle: 1.5,
}
```

Note that the code also allows for 'reverse' rowtype synergy. This would apply to rowtypes with a negative treshhold,
but there are currently none.

## Time differences