import * as express from 'express'
import { boardCollection, Board, serializeBoard } from './board'
import * as base64url from 'base64-url'
import * as crypto from 'crypto'

export const boardRouter = express.Router()

const writeBoard = (res:express.Response) => (board:Board) => {
  res.header('Content-Type', 'application/json')
  res.write(serializeBoard(board))
}

const writeError = (res:express.Response, code:number) => (err:any) => {
  res.status(code)
  res.write(err.toString())
}

boardRouter.post('/api/boards', (req:express.Request, res:express.Response) => {
  const board = {url_token: base64url.encode(crypto.randomBytes(16)), name: req.body.name}
  boardCollection.insert(board)
    .then(writeBoard(res))
    .catch(writeError(res, 422))
    .finally(() => res.end())
})

boardRouter.get('/api/boards/:name/:urlToken', (req:express.Request, res:express.Response) => {
  boardCollection.getByUrlToken(req.params.urlToken)
    .then(writeBoard(res))
    .catch(writeError(res, 400))
    .finally(() => res.end())
})