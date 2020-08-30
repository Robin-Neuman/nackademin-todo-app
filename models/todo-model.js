const db = require('./DB')

async function getTodos() {
    const query = new Promise((resolve, reject) => {
        db.todos.find({}, function (err, docs) {
            if(err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
    return await query
}

async function addTodo(title) {
    const currDate = new Date()
    const parsedDate = currDate.toUTCString()
    const todo = {
        date_added: parsedDate.substr(5, 21),
        title: title,
        done: false
    }
    const query = new Promise((resolve, reject) => {
        db.todos.insert(todo, function (err, newDoc) {
            if(err) {
                reject(err)
            } else {
                resolve(newDoc)
            }
        })
    })
    return await query
}

async function updateTodo(id, title, done) {
    const query = new Promise((resolve, reject) => {
        const currDate = new Date()
        const parsedDate = currDate.toUTCString()
        db.todos.update({_id: id}, { $set: {title: title, done: done, date_updated: parsedDate.substr(5, 21)}}, function (err, numReplaced) {
            if(err) {
                reject(err)
            } else {
                resolve(numReplaced)
            }
        })
    })
    return await query
}

async function removeTodo(id) {
    const query = new Promise((resolve, reject) => {
        db.todos.remove({_id: id}, function (err, numRemoved) {
            if(err) {
                reject(err)
            } else {
                resolve(numRemoved)
            }
        })
    })
    return await query
}

module.exports = { getTodos, addTodo, updateTodo, removeTodo }