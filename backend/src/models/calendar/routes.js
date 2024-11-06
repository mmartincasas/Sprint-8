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

module.exports = router
