const dotenv = require('dotenv').config();
module.exports = {
    google: {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
    },
        mongodb: {
            DATABASE_URI: process.env.DATABASE_URI,
        },

    session: {
        cookieKey: process.env.cookieKey,
      },
};