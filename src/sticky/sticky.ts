import immutablyModifyMap from 'utils/immutablyModifyMap'

interface StickyMutator {
  readonly x?: number
  readonly y?: number
  readonly z?: number
  readonly body?: string
  readonly hovered?: boolean
}

export interface Sticky {
  readonly x: number
  readonly y: number
  readonly z: number
  readonly body: string
  readonly hovered: boolean
}

export const modifySticky = immutablyModifyMap<Sticky, StickyMutator>()