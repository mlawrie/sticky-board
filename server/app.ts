import * as express from 'express'

import { boardRouter } from './boards/boardRouter'

import * as bodyParser from 'body-parser'

export const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true})) 

app.use(boardRouter)

