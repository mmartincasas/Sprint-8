const db = require('../../DB/mysql')

const TABLE = 'num_visits'

function all () {
  return db.all(TABLE)
}

module.exports = {
  all
}
