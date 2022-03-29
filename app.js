// require dependencies
const express = require("express");
const router = express.Router();
const admin = require("./models/admin.model");
const user = require("./models/user.model");
const app = express();
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
const farminvestpackageRouter = require("./routes/farminvestpackage.route"); 
 
const PORT = 5657

 
// set view engine
app.set('view engine', 'ejs')

//set auth router
app.use('/auth', authRoutes)

app.get('/', (req, res)=>{
    res.render('home')
})


const dotenv = require("dotenv");
dotenv.config();

// extracting information from the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // extracting PORT from dotenv
// const { PORT, DATABASE_URI } = process.env;



// connecting to DB
// const {connectDB} = require("./database/connect.database");
// connectDB();

// base endpoint
// app.get("/", function (req, res) {
//   res.send("Hello World!");
// });

// base endpoint
app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", farminvestpackageRouter);



// app.listen(PORT,()=>{
//   console.log(`listening on https://localhost:${PORT}`)
// })

// server connection
app.listen(PORT, async () => {
  console.log(`The app is listening on PORT ${PORT}`);
});