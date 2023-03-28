export const CardTypes = [
  'land',
  'creature',
  'enchantment',
  'artifact',
  'instant',
  'sorcery',
  'tribal',
  'planeswalker',
  'battle'
]

export type Color = { label: string; value: string }

export const Colors: Color[] = [
  { label: 'White', value: 'w' },
  { label: 'Blue', value: 'u' },
  { label: 'Black', value: 'b' },
  { label: 'Red', value: 'r' },
  { label: 'Green', value: 'g' }
]
