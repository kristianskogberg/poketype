//DO NOT CHANGE THE ORDER!
const allTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
]

/*
    _ = neutral
    H = not very effective
    2 = super effective
  */
const _ = 1
const H = 0.5
/**
 * typeMatrix contains each type from
 */
const typeMatrix = [
  [_, _, _, _, _, _, _, _, _, _, _, _, H, 0, _, _, H, _],
  [_, H, H, _, 2, 2, _, _, _, _, _, 2, H, _, H, _, 2, _],
  [_, 2, H, _, H, _, _, _, 2, _, _, _, 2, _, H, _, _, _],
  [_, _, 2, H, H, _, _, _, 0, 2, _, _, _, _, H, _, _, _],
  [_, H, 2, _, H, _, _, H, 2, H, _, H, 2, _, H, _, H, _],
  [_, H, H, _, 2, H, _, _, 2, 2, _, _, _, _, 2, _, H, _],
  [2, _, _, _, _, 2, _, H, _, H, H, H, 2, 0, _, 2, 2, H],
  [_, _, _, _, 2, _, _, H, H, _, _, _, H, H, _, _, 0, 2],
  [_, 2, _, 2, H, _, _, 2, _, 0, _, H, 2, _, _, _, 2, _],
  [_, _, _, H, 2, _, 2, _, _, _, _, 2, H, _, _, _, H, _],
  [_, _, _, _, _, _, 2, 2, _, _, H, _, _, _, _, 0, H, _],
  [_, H, _, _, 2, _, H, H, _, H, 2, _, _, H, _, 2, H, H],
  [_, 2, _, _, _, 2, H, _, H, 2, _, 2, _, _, _, _, H, _],
  [0, _, _, _, _, _, _, _, _, _, 2, _, _, 2, _, H, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, 2, _, H, 0],
  [_, _, _, _, _, _, H, _, _, _, 2, _, _, 2, _, H, _, H],
  [_, H, H, H, _, 2, _, _, _, _, _, _, 2, _, _, _, H, 2],
  [_, H, _, _, _, _, 2, H, _, _, _, _, _, _, 2, 2, H, _],
]

export { allTypes, typeMatrix }
