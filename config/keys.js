const dotenv = require('dotenv').config();
module.exports = {
    google: {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
    },
    session: {
        cookieKey: process.env.cookieKey,
      },
};