const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
// creating connection
const connection = mysql.createConnection({
  host: process.env.sql_host,
  user: process.env.sql_user,
  password: process.env.sql_password,
  database: process.env.sql_database,
});

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});
module.exports = connection.promise();
