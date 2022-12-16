// Setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const session = require('express-session');
const passport = require("passport");
const { checkLogin } = require("./auth/passport")
checkLogin(passport)

// Mongo DB connection
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log("Connected to the DB"))
    .catch(err => console.log(err));

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize(undefined));
app.use(passport.session(undefined))

// Routes
app.use("", require("./routes/index"))
app.use("/", require("./routes/login"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log("Server running on port " + PORT))

