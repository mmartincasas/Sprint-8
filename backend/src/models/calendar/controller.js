const db = require('../../DB/mysql')

const TABLE = 'events'

function all () {
  return db.all(TABLE)
}

function add (newEvent) {
  const { title, start, end } = newEvent

  const errors = []
  if (!title) errors.push("The 'title' field is required.")
  if (!start) errors.push("The 'start' date field is required.")
  if (!end) errors.push("The 'end' date field is required.")

  const formattedEvent = {
    ...newEvent,
    start: new Date(start).toISOString().slice(0, 19).replace('T', ' '),
    end: end ? new Date(end).toISOString().slice(0, 19).replace('T', ' ') : null
  }

  if (errors.length > 0) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ status: 400, message: errors })
  }

  return db.add(TABLE, formattedEvent)
}

function updateEvent (eventId, newEvent) {
  if (Object.keys(newEvent).length === 0) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ status: 400, message: 'At least one field is required to update.' })
  }

  return db.update(TABLE, newEvent, eventId)
}

function removeEvent (id) {
  return db.remove(TABLE, id)
}

module.exports = {
  all,
  add,
  updateEvent,
  removeEvent
}
