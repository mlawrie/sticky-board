import * as express from 'express'
import { stickyCollection, Sticky, serializeSticky } from './sticky'
import { boardCollection } from '../boards/board'
export const stickyRouter = express.Router()

const writeSticky = (res:express.Response) => (sticky: Sticky) => {
  res.header('Content-Type', 'application/json')
  res.write(JSON.stringify(serializeSticky(sticky)))
}

const writeError = (res:express.Response, code:number) => (err:any) => {
  res.status(code)
  res.write(err.toString())
}

stickyRouter.delete('/api/stickies', (req:express.Request, res:express.Response) => {
  return boardCollection.getByUrlToken(req.body.url_token)
    .then((board) => stickyCollection.deleteByBoardIdAndUuid(board.id, req.body.uuid))
    .then(() => {
      res.header('Content-Type', 'application/json')
      res.status(200)
      res.write('{}')
    })
    .catch(writeError(res, 422))
    .finally(() => res.end())
})

stickyRouter.put('/api/stickies', (req:express.Request, res:express.Response) => {
  return boardCollection.getByUrlToken(req.body.url_token)
    .then((board) => {
      const sticky = {board_id: board.id, body: req.body.body, x: req.body.x, y: req.body.y, uuid: req.body.uuid}
      return stickyCollection.update(sticky)  
    })
    .then(writeSticky(res))
    .catch(writeError(res, 422))
    .finally(() => res.end())
})

stickyRouter.post('/api/stickies', (req:express.Request, res:express.Response) => {
  return boardCollection.getByUrlToken(req.body.url_token)
    .then((board) => {
      const sticky = {board_id: board.id, body: req.body.body, x: req.body.x, y: req.body.y, uuid: req.body.uuid}
      return stickyCollection.insert(sticky)  
    })
    .then(writeSticky(res))
    .catch(writeError(res, 422))
    .finally(() => res.end())
})