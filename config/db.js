require("dotenv").config();



module.exports = {
    SQL_PASSWORD : process.env.SQL_PASSWORD,
    SQL_USER : process.env.SQL_USER,
    SQL_HOST : process.env.SQL_HOST,
    SQL_DATABASE : process.env.SQL_DATABASE,
    PG_HOST : process.env.PG_HOST,
    PG_USER : process.env.PG_USER,
    PG_PORT : process.env.PG_PORT,
    PG_PASSWORD : process.env.PG_PASSWORD,
    PG_DATABASE : process.env.PG_DATABASE
}