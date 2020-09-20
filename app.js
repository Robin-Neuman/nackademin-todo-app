const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config();

const indexRouter = require("./routes/index")
const todoRouter = require("./routes/todo")
const userRouter = require("./routes/user")

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter)
app.use('/todo', todoRouter)
app.use('/user', userRouter)

const server = app.listen(3006)

module.exports.app = app;
module.exports.server = server;