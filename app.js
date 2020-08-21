const express = require('express');
const app = express();
const path = require('path')

var indexRouter = require("./routes/index")
var todoRouter = require("./routes/todo")

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
// app.use(bodyParser.json)
app.use(express.json())
app.use('/todo', todoRouter)

app.listen(3006, function () {
    console.log("Listening on port 3006")
})

module.exports = app;