const express = require('express');
const app = express();
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/login'));
app.use('', require('./routes/index'))
const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log("Server running on port " + PORT))
