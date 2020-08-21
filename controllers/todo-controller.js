const todo_model = require('../models/todo-model')

async function getTodos(req, res) {
    let todos = await todo_model.getTodos()
    return res.status(200).json(todos)
}

async function addTodo(req, res) {
    console.log(req.params._id)
    let response = await todo_model.addTodo(req.params._id, req.body.title)
    return res.status(200).json(response)
}

async function updateTodo(req, res) {
    let response = await todo_model.updateTodo(req.params._id, req.body.title, req.body.done)
    return res.status(200).json(response)
}

async function removeTodo(req, res) {
    let response = await todo_model.removeTodo(req.params._id)
    return res.status(200).json(response)
}

module.exports = { getTodos, addTodo, updateTodo, removeTodo }