const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config();

var indexRouter = require("./routes/index")
var todoRouter = require("./routes/todo")
var userRouter = require("./routes/user")

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter)
app.use('/todo', todoRouter)
app.use('/user', userRouter)

app.listen(3006, function () {
    console.log("Listening on port 3006")
})

module.exports = app;