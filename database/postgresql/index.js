const config = require("../../config/db")
const promise = require('bluebird')
const pg = require('pg-promise')
const options = {
    promiseLib: promise
  }
const pgp = pg(options)


const cn = {
    host: config.PG_HOST,
    port: config.PG_PORT,
    database: config.PG_DATABASE,
    user: config.PG_USER,
    password: config.PG_PASSWORD
}

const db = pgp(cn)

module.exports = db
