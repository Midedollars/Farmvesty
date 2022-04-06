const mysql = require('mysql');
require("dotenv").config();

 const dataBase = async () => {
    try {
      const conn = await mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
      });

      
      console.log("MySQL server is running");
    } catch (error) {
      console.log("oops");
    }
  };

  module.exports = dataBase ()