var Datastore = require('nedb')
    , db = new Datastore();

async function getTodos() {
    const query = new Promise((resolve, reject) => {
        db.find({}, function (err, docs) {
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
    const todo = {
        title: title,
        done: false
    }
    const query = new Promise((resolve, reject) => {
        db.insert(todo, function (err, newDoc) {
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
        db.update({_id: id}, {title: title, done: done}, function (err, numReplaced) {
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
        db.remove({_id: id}, function (err, numRemoved) {
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