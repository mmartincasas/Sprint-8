const db = require('../../DB/mysql')

const TABLE = 'users'

function all () {
  return db.all(TABLE)
}

function add (user) {
  const { first, last, email } = user

  const errors = []
  if (!first) errors.push("The 'first' field is required.")
  if (!last) errors.push("The 'last' field is required.")
  if (!email) errors.push("The 'email' field is required.")

  if (errors.length > 0) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ status: 400, message: errors })
  }

  return db.add(TABLE, user)
}

function updateUser (userId, user) {
  if (Object.keys(user).length === 0) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ status: 400, message: 'At least one field is required to update.' })
  }

  return db.update(TABLE, user, userId)
}

function removeUser (id) {
  return db.remove(TABLE, id)
}

module.exports = {
  all,
  add,
  updateUser,
  removeUser
}
