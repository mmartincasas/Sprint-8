const mysql = require('mysql')
const config = require('../config')

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
}

let connection

function conMysql () {
  connection = mysql.createConnection(dbconfig)
  connection.connect((err) => {
    if (err) {
      console.log('[db err]', err)
      setTimeout(conMysql, 200)
    } else {
      console.log('Connected to DB')
    }
  })

  connection.on('error', err => {
    console.log('[db err]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      conMysql()
    } else {
      throw err
    }
  })
}

conMysql()

function all (table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

function add (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

function updateUser (table, data, id) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id = ?`,
      [data, id],
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      })
  })
}

function removeUser (table, id) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${table} WHERE id = ?`
    connection.query(query, [id], (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

function getVisits () {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM num_visits', (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

module.exports = {
  all,
  add,
  updateUser,
  removeUser,
  getVisits
}
