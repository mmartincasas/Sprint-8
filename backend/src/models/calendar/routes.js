const express = require('express')

const response = require('../../routes/responses')
const controller = require('./controller')

const router = express.Router()

router.get('/', function (req, res) {
  controller.all()
    .then((items) => {
      response.success(req, res, items, 200)
    })
    .catch((error) => {
      response.error(req, res, 'Error retrieving visits', 500, error)
    })
})

router.post('/', function (req, res) {
  const newEvent = req.body
  controller.add(newEvent)
    .then((result) => {
      response.success(req, res, { message: 'Event created', EventId: result.insertId }, 201)
    })
    .catch((error) => {
      response.error(req, res, error.message, 400)
    })
})

router.put('/:id', function (req, res) {
  const EventId = req.params.id
  const newEvent = req.body

  controller.updateEvent(EventId, newEvent)
    .then((result) => {
      response.success(req, res, { message: 'User updated' }, 200)
    })
    .catch((error) => {
      response.error(req, res, error.message, 400)
    })
})

router.delete('/:id', function (req, res) {
  const EventId = req.params.id
  controller.removeEvent(EventId)
    .then(() => {
      response.success(req, res, { message: 'User deleted' }, 200)
    })
    .catch((error) => {
      response.error(req, res, 'Error deleting user', 500, error)
    })
})

module.exports = router
