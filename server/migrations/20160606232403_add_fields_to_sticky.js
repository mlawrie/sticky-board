
exports.up = (knex, Promise) => knex.schema.table('stickies', (table) => {
  table.string('uuid').unique().notNullable() 
  table.integer('x').notNullable() 
  table.integer('y').notNullable()
});

exports.down = (knex, Promise) => knex.schema.table('stickies', (table) => {
  table.dropColumn('uuid')
  table.dropColumn('x')
  table.dropColumn('y')
});
