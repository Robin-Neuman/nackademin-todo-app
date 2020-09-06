const db = require('./DB')

async function getTodos() {
    const query = new Promise((resolve, reject) => {
        let todoLists = []
        db.todoLists.find({}, function (err, lists) {
            if (err) reject(err)
            db.todos.find({}, async function (err, todos) {
                if (err) reject(err)
                lists.map((list) => {
                    console.log("map")
                    let currList = {
                        id: list.id,
                        title: list.title,
                        todos: []
                    }
                    for (todo of todos) {
                        if (list.id == todo.listId) {
                            currList.todos.push(
                                {
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
    console.log(await query)
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

module.exports = { getTodos, addTodo, updateTodo, removeTodo, addTodoList }