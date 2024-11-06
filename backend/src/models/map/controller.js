const db = require('../../DB/mysql')

const TABLE = 'locations'

function all () {
  return db.all(TABLE)
}

module.exports = {
  all
}
