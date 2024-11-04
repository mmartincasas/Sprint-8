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

module.exports = router
