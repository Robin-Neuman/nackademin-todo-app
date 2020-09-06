var Datastore = require('nedb');
const bcrypt = require('bcryptjs')

db = {}
db.users = new Datastore(__dirname + '/nedb/users.db')
db.todos = new Datastore(__dirname + '/nedb/todos.db')
db.todoLists = new Datastore(__dirname + '/nedb/todoLists.db')
db.users.loadDatabase(function (err) {
    if (err) throw err
    console.log('Database USERS loaded successfully')
})

db.todos.loadDatabase(function (err) {
    if (err) throw err
    console.log('Database TODOS loaded successfully')
})

db.todoLists.loadDatabase(function (err) {
    if (err) throw err
    console.log('Database TODOLISTS loaded successfully')
})

module.exports = db