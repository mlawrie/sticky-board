import ImmutableClone from './immutable_clone'

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

export class StickyClone extends ImmutableClone<Sticky, StickyMutator> {}

