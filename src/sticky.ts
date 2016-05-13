import immutablyModifyMap from './immutablyModifyMap'

interface StickyMutator {
  x?: number
  y?: number
  z?: number
}

export interface Sticky {
  readonly x: number
  readonly y: number
  readonly z: number
}

export const modifySticky = immutablyModifyMap<Sticky, StickyMutator>()