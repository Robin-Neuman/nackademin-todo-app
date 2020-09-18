const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config();

const indexRouter = require("./routes/index")
const todoRouter = require("./routes/todo")
const userRouter = require("./routes/user")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter)
app.use('/todo', todoRouter)
app.use('/user', userRouter)

const server = app.listen(process.env.PORT || 3006)

module.exports.app = app;
module.exports.server = server;