import { db } from '../database'
import * as Promise from 'bluebird'
import { filterKeys, firstResult } from '../utils/databaseUtils'


interface CreateSticky {
  readonly body: string
  readonly board_id: number
  readonly x: number
  readonly y: number
  readonly uuid: string
}

export interface Sticky {
  readonly body: string
  readonly created_at: Date
  readonly id: number
  readonly board_id: number
}

const table = () => db('stickies')

export const stickyCollection = {
  getById: (id: number):Promise<Sticky> => table().where({id}).select('*').limit(1)
    .then(firstResult),
    
  getByBoardId: (board_id: number):Promise<[Sticky]> => table().where({board_id}).select('*'),
  
  insert: (sticky: CreateSticky):Promise<Sticky> => table().insert(sticky).returning('id')
    .then(firstResult)
    .then((id) => stickyCollection.getById(id)),

  update: (sticky: CreateSticky):Promise<Sticky> => table().where({board_id: sticky.board_id, uuid: sticky.uuid}).update(sticky).returning('id')
    .then(firstResult)
    .then((id) => stickyCollection.getById(id))
}

export const serializeSticky = (board: Sticky) => filterKeys(board, ['body', 'x', 'y', 'uuid'])