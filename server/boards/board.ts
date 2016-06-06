import { db } from '../database'
import * as Promise from 'bluebird'

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

const table = () => db('boards')

const firstResult = (results: [any]) => {
  if(results.length > 0) {
    return results[0]
  }
  throw('record not found')
}

export const boardCollection = {
  getById: (id: number):Promise<Board> => table().where({id}).select('*').limit(1)
    .then(firstResult),
  getByUrlToken: (url_token: string):Promise<Board> => table().where({url_token}).select('*').limit(1)
    .then(firstResult),
  insert: (board: CreateBoard):Promise<Board> => table().insert(board).returning('id')
    .then(firstResult)
    .then((id) => boardCollection.getById(id))
}

const filterKeys = (obj:any, whitelist:[string]) => {
  const validKeys = Object.keys(obj).filter((k) => whitelist.indexOf(k) != -1)
  const newObj:any = {}
  validKeys.forEach((key) => newObj[key] = obj[key])
  return newObj  
}

export const serializeBoard = (board: Board) => JSON.stringify(filterKeys(board, ['name', 'url_token', 'created_at']))