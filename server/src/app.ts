import * as express from 'express'
import * as bodyParser from 'body-parser'
import { boardRouter } from './boards/boardRouter'
import * as  path from 'path'

export const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true})) 

app.use(boardRouter)

app.use(express.static(path.join(__dirname, '../public')))

const clientRouter = express.Router()

clientRouter.get('/boards/:name/:urlToken', (req:express.Request, res:express.Response) => {
  res.send(200, `
    <!DOCTYPE html>
    <html lang="en">
      <head>
      </head>
      <body>
        <div id="app"></div>
        <script type="text/javascript" src="/app.js"></script>
      </body>
    </html>
  `)
})

app.use(clientRouter)
