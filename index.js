// Setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
dotenv.config();

// Mongo DB connection
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log("Connected to the DB"))
    .catch(err => console.log(err));

// Routes
app.use("/", require("./routes/login"));
app.use("", require("./routes/index"))
const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log("Server running on port " + PORT))

