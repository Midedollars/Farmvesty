const dotenv = require('dotenv').config();
module.exports = {
    google: {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
    },
        mongodb: {
            DATABASE_URI: 'mongodb+srv://space-ex:12345@cluster0.kh4cu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        },

    session: {
        cookieKey: process.env.cookieKey,
      },
};