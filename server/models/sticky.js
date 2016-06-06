const db = require('../database')
const Board = require('./board')

const Sticky = db.Model.extend({
  tableName: 'stickies',
  board: () => this.belongsTo(Board)
})

module.exports = Sticky