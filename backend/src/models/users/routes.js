const express = require('express')

const response = require('../../routes/responses')
const controller = require('./controller')

const router = express.Router()

router.get('/', function (req, res) {
  controller.all()
    .then((items) => {
      response.success(req, res, items, 200)
    })
})

router.post('/', function (req, res) {
  const userData = req.body
  controller.add(userData)
    .then((result) => {
      response.success(req, res, { message: 'User created', userId: result.insertId }, 201)
    })
    .catch((error) => {
      response.error(req, res, error.message, 400)
    })
})

router.put('/:id', function (req, res) {
  const userId = req.params.id
  const userData = req.body

  controller.updateUser(userId, userData)
    .then((result) => {
      response.success(req, res, { message: 'User updated' }, 200)
    })
    .catch((error) => {
      response.error(req, res, error.message, 400)
    })
})

router.delete('/:id', function (req, res) {
  const userId = req.params.id
  controller.removeUser(userId)
    .then(() => {
      response.success(req, res, { message: 'User deleted' }, 200)
    })
    .catch((error) => {
      response.error(req, res, 'Error deleting user', 500, error)
    })
})

module.exports = router
