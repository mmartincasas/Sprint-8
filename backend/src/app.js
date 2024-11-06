const express = require('express')
const config = require('./config')
const cors = require('cors')
const users = require('./models/users/routes')
const charts = require('./models/charts/routes')
const map = require('./models/map/routes')
const events = require('./models/calendar/routes')

const app = express()

app.set('port', config.app.port)

app.use(cors(
  {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
    // credentials: true
  }))

// Middleware to parse JSON
app.use(express.json())

// Middleware to process data in x-www-form-urlencoded format
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', users)
app.use('/api/visits', charts)
app.use('/api/map', map)
app.use('/api/events', events)

module.exports = app
