const db = require('./DB')

async function getTodos() {
    const query = new Promise((resolve, reject) => {
        let todoLists = []
        db.todoLists.find({}, function (err, lists) {
            if (err) reject(err)
            db.todos.find({}, async function (err, todos) {
                if (err) reject(err)
                lists.map((list) => {
                    let id = "id" + list._id
                    let currList = {
                        _id: id,
                        title: list.title,
                        todos: []
                    }
                    for (todo of todos) {
                        if (list._id == todo.listId) {
                            let id = "id" + todo._id
                            currList.todos.push(
                                {
                                    _id: id,
                                    date_added: todo.date_added,
                                    title: todo.title,
                                    done: todo.done,
                                    date_updated: todo.date_updated,
                                    listId: todo.listId
                                }
                            )
                        }
                    }
                    todoLists.push(currList)
                })
                resolve(todoLists)
            })
        })
    }).catch((err) => {
        console.log(err)
    })
    return await query
}

async function addTodoList(title) {
    const todoList = {
        title: title
    }
    const query = new Promise((resolve, reject) => {
        db.todoLists.insert(todoList, function (err, newDoc) {
            if (err) {
                reject(err)
            } else {
                resolve(newDoc)
            }
        })
    })
    return await query
}

async function addTodo(title, listId) {
    const currDate = new Date()
    const parsedDate = currDate.toUTCString()
    const todo = {
        date_added: parsedDate.substr(5, 21),
        title: title,
        done: false,
        listId: listId
    }
    const query = new Promise((resolve, reject) => {
        db.todos.insert(todo, function (err, newDoc) {
            if (err) {
                reject(err)
            } else {
                console.log("Runs", newDoc)
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
        db.todos.update({ _id: id }, { $set: { title: title, done: done, date_updated: parsedDate.substr(5, 21) } }, function (err, numReplaced) {
            if (err) {
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
        db.todos.remove({ _id: id }, function (err, numRemoved) {
            if (err) {
                reject(err)
            } else {
                resolve(numRemoved)
            }
        })
    })
    return await query
}

async function removeList(id) {
    const query = new Promise((resolve, reject) => {
        db.todoLists.remove({ _id: id }, function (err, numRemoved1) {
            if (err) reject(err)
                db.todos.remove({ listId: id }, { multi: true }, function (err, numRemoved2) {
                    if (err) reject(err)
                    resolve(numRemoved1, numRemoved2)
                })
        })
    })
    return await query
}

module.exports = { getTodos, addTodo, updateTodo, removeTodo, addTodoList, removeList }