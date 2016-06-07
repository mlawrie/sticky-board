import { db } from '../database'
import * as Promise from 'bluebird'
import { filterKeys, firstResult } from '../utils/databaseUtils'
import { stickyCollection } from '../stickies/sticky'

interface CreateBoard {
  readonly name: string
  readonly url_token: string
}

export interface Board {
  readonly name: string
  readonly created_at: Date
  readonly id: number
  readonly url_token: string
}


interface WithStickies {
  readonly stickies: [{readonly body: string}]   
}

const table = () => db('boards')

export const boardCollection = {
  getById: (id: number):Promise<Board> => table()
    .where({id})
    .select('*').limit(1).then(firstResult),
    
  getByUrlToken: (url_token: string):Promise<Board> => table()
    .where({url_token})
    .select('*').limit(1).then(firstResult),
    
  insert: (board: CreateBoard):Promise<Board> => table()
    .insert(board).returning('id')
    .then(firstResult)
    .then((id) => boardCollection.getById(id))
}

export const serializeBoard = (board: Board) =>filterKeys(board, ['name', 'url_token'])