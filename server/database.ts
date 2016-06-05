
import knex = require('knex')
import knexfile = require('./knexfile')

declare var global: any

const createDB = () => knex((<any>knexfile).development)

if (typeof global.db === 'undefined') {
  global.db = createDB()
}

export const db:knex = global.db