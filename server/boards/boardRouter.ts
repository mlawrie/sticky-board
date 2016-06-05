import * as express from 'express'
import { boardCollection, Board, serializeBoard } from './board'
import * as base64url from 'base64-url'
import * as crypto from 'crypto'

export const boardRouter = express.Router()

boardRouter.get('/', (req:express.Request, res:express.Response) => {
  boardCollection.insert({url_token: base64url.encode(crypto.randomBytes(16)), name: 'foo'}).then((board: Board) => {
    res.header('Content-Type', 'application/json')
    res.write(serializeBoard(board))
  }).catch((err) => {
    res.status(500)
    res.write(err.toString())
  }).finally(() => res.end())
})