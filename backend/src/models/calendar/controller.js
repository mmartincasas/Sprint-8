const db = require('../../DB/mysql')

const TABLE = 'events'

function all () {
  return db.all(TABLE)
}

module.exports = {
  all
}
