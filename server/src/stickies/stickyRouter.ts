import * as express from 'express'
import { stickyCollection, Sticky, serializeSticky } from './sticky'

export const stickyRouter = express.Router()

const writeSticky = (res:express.Response) => (sticky: Sticky) => {
  res.header('Content-Type', 'application/json')
  res.write(JSON.stringify(serializeSticky(sticky)))
}

const writeError = (res:express.Response, code:number) => (err:any) => {
  res.status(code)
  res.write(err.toString())
}

stickyRouter.post('/api/stickies', (req:express.Request, res:express.Response) => {
  const sticky = {board_id: 1, body: req.body.body, x: req.body.x, y: req.body.y, uuid: req.body.uuid}
  return stickyCollection.insert(sticky)
    .then(writeSticky(res))
    .catch(writeError(res, 422))
    .finally(() => res.end())
})