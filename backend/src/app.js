const express = require('express')
const config = require('./config')

const costumers = require('./models/costumers/routes')

const app = express()

app.set('port', config.app.port)

app.use('/api/costumers', costumers)

module.exports = app
