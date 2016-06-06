
import knex = require('knex')
import knexfile = require('./knexfile')

declare var global: any

const environment = process.env.NODE_ENV || 'development' 
const createDB = () => knex((<any>knexfile)[environment])

if (typeof global.db === 'undefined') {
  global.db = createDB()
}

export const db:knex = global.db