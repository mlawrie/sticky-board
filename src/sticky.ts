import immutablyModifyMap from './immutablyModifyMap'

interface StickyMutator {
  x?: number
  y?: number
  z?: number
  body?: string
}

export interface Sticky {
  readonly x: number
  readonly y: number
  readonly z: number
  body: string
}

export const modifySticky = immutablyModifyMap<Sticky, StickyMutator>()