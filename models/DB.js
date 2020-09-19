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

let mongoDatabase

console.log(process.env.ENVIRONMENT);
switch(process.env.ENVIRONMENT){
    case 'development':
        mongoDatabase = {
            // mongodb+srv://user:password@host/dbname
            getUri: async () => 
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_TEST}?retryWrites=true&w=majority`
        }
        connect()
        break;
    case 'test':
        console.log('inne i test');
        const {MongoMemoryServer} = require('mongodb-memory-server')
        mongoDatabase = new MongoMemoryServer({ binary: { version: '4.4.1' } } )
;
        connect()
        break;
    case 'production':
    case 'staging':
        console.log('Inne i atlas conneciton');
        mongoDatabase = {
            // mongodb+srv://user:password@host/dbname
            getUri: async () => 
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        }
        connect()
        break;
}

async function connect(){
    
    let uri = await mongoDatabase.getUri()
    console.log(uri);
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

async function disconnect(){
    console.log('disconnecting');
    if(process.env.ENVIRONMENT == 'test' || process.env.ENVIRONMENT == 'development'){
        console.log('test iz stop');
        await mongoDatabase.stop()
    }
    await mongoose.connection.close()
}

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
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
    adress: {
        street: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    orderHistory: {
        type: Array
    }
})

const User = mongoose.model("users", UserSchema)

module.exports = {
    connect, disconnect, User
}
