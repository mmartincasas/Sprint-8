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
      console.log('Connection to DB!')
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

function one(table, id){

}

function add(table, data) {

}

function remove(table, id) {

}

module.exports = {
  all,
  one,
  add,
  remove
}
