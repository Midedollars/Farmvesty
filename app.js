// require dependencies
const express = require('express');
const Admin = require("./models/admin.model");
const User = require("./models/user.model");
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
const farminvestpackageRouter = require("./routes/farminvestpackage.route"); 
const mongoose = require('mongoose');
const keys = require('./config/keys');
const mysql = require('mysql');

const app = express();
const dotenv = require("dotenv");
dotenv.config();


const PORT = 5657

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
// mongoose.connect(keys.mongodb.dbURI, () => {
//     console.log('connected to mongodb');
// });

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

// extracting information from the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// base endpoint
app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", farminvestpackageRouter);

const { DATABASE_URI } = process.env;

// database and server connection
app.listen(PORT, async () => {
  try {
    await mongoose.connect('mongodb+srv://space-ex:12345@cluster0.kh4cu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.log(`Database Is Not Connected`);
  }
  console.log(`The app is listening on PORT ${PORT}`);
});


// // server connection
// app.listen(PORT, async () => {
//   console.log(`The app is listening on PORT ${PORT}`);
// });

