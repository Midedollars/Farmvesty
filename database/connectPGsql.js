const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// ==> Conexão com a Base de Dados:
const pool = new Pool({
  host: process.env.hostpg,
  user: process.env.userpg,
  post: process.env.postpg,
  password: process.env.passwordpg,
  databasepg: process.env.databasepg,
});

pool.query('SELECT NOW()', (err, res) => {
  if (!err) {
    console.log("connected to PGsql");
  } else {
    console.log(err.message);
  }
  //   console.log("connected PGSQL");
});

module.exports = pool;