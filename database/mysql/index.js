const mysql = require('mysql2');
const config = require("../../config/db")

// create the connection to database
const db = mysql.createConnection({
  host: config.SQL_HOST,
  user: config.SQL_USER,
  database: config.SQL_DATABASE,
  password : config.SQL_PASSWORD
}).promise();

module.exports = db