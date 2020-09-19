// var Datastore = require('nedb');
// const bcrypt = require('bcryptjs')

// db = {}
// db.users = new Datastore(__dirname + '/nedb/users.db')
// db.todos = new Datastore(__dirname + '/nedb/todos.db')
// db.todoLists = new Datastore(__dirname + '/nedb/todoLists.db')
// db.users.loadDatabase(function (err) {
//     if (err) throw err
//     console.log('Database USERS loaded successfully')
// })

// db.todos.loadDatabase(function (err) {
//     if (err) throw err
//     console.log('Database TODOS loaded successfully')
// })

// db.todoLists.loadDatabase(function (err) {
//     if (err) throw err
//     console.log('Database TODOLISTS loaded successfully')
// })

// module.exports = db

require('dotenv').config();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

let mongoDatabase

switch(process.env.ENVIRONMENT){
    case 'development':
        mongoDatabase = {
            getUri: async () => 
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DEV}?retryWrites=true&w=majority`
        }
        connect()
        break;
    case 'test':
        const {MongoMemoryServer} = require('mongodb-memory-server')
        mongoDatabase = new MongoMemoryServer({ binary: { version: '4.4.1' } } )
;
        connect()
        break;
    case 'production':
    case 'staging':
        mongoDatabase = {
            getUri: async () => 
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        }
        connect()
        break;
}

async function connect(){    
    let uri = await mongoDatabase.getUri()
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

async function disconnect(){
    if(process.env.ENVIRONMENT == 'test'){
        await mongoDatabase.stop()
    }
    await mongoose.connection.close()
}

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
})

var TodoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    todos: {
        type: Array,
        required: false
    },
})

const User = mongoose.model("users", UserSchema)
const TodoList = mongoose.model("todo_lists", TodoListSchema)

module.exports = {
    connect, disconnect, User, TodoList
}
