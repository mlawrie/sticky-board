'use strict'

exports.up = (knex, Promise) => Promise.all([
    knex.schema.createTable("stickies", function (table) {
    table.increments('id').primary()

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now()).notNullable()
    
    table.integer("board_id").notNullable()
    table.string("body").notNullable()
    table.index(["board_id"])
  }),    
    knex.schema.createTable("boards", function (table) {
    table.increments('id').primary()

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now()).notNullable()
    table.string("name").notNullable()
    table.string("url_token").notNullable().unique()
    table.index(["url_token"])
  })
])

exports.down = (knex, Promise) => Promise.all([
    knex.schema.dropTable("stickies"),    
    knex.schema.dropTable("boards")
])

