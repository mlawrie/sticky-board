import * as express from 'express'
import { Board, boardCollection, serializeBoard } from './models/board'
import * as base64url from 'base64-url'
import * as crypto from 'crypto'

const app = express()
const router = express.Router()

router.get('/', (req:express.Request, res:express.Response) => {
  boardCollection.insert({url_token: base64url.encode(crypto.randomBytes(16)), name: 'foo'}).then((board: Board) => {
    res.header('Content-Type', 'application/json')
    res.write(serializeBoard(board))
  }).catch((err) => {
    res.status(500)
    res.write(err.toString())
  }).finally(() => res.end())
})

app.use(router)

const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + port);
}).on('error', (err:any) => {
  console.log('Cannot start server, port most likely in use');
  console.log(err);
});

