const express = require('express')
const config = require('./config')
const cors = require('cors')
const users = require('./models/users/routes')

const app = express()

app.set('port', config.app.port)

app.use(cors(
  {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
    // credentials: true
  }))

// Middleware para parsear JSON
app.use(express.json())

// Middleware para procesar datos en formato x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', users)

module.exports = app
