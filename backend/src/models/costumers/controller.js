const db = require('../../DB/mysql')

const TABLE = 'costumers'

function all () {
  return db.all(TABLE)
}

module.exports = {
  all
}
