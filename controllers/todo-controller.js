const todo_model = require('../models/todo-model')

async function getTodos(req, res) {
    try {
        let todoLists = await todo_model.getTodos()
        return res.status(200).json(todoLists)
    } catch (err) {
        res.status(500).send("Server error, contact admin for more info")
        throw err
    }
}

async function addTodo(req, res) {
    try {
        let response = await todo_model.addTodo(req.body.title, req.params.listId, req.body.user_id)
        return res.status(200).json(response)
    } catch (err) {
        res.status(500).send("Server error, contact admin for more info")
        throw err
    }
}

async function addTodoList(req, res) {
    try {
        let response = await todo_model.addTodoList(req.body.title, req.body.user_id)
        return res.status(response.status).json(response)
    } catch (err) {
        res.status(500).send("Server error, contact admin for more info")
        throw err
    }
}

async function updateTodo(req, res) {
    try {
        let response = await todo_model.updateTodo(req.params._id, req.body.title, req.body.done)
        return res.status(200).json(response)
    } catch (err) {
        res.status(500).send("Server error, contact admin for more info")
        throw err
    }
}

async function removeTodo(req, res) {
    try {
        let response = await todo_model.removeTodo(req.params._id)
        return res.status(200).json(response)
    } catch (err) {
        res.status(500).send("Server error, contact admin for more info")
        throw err
    }
}

async function removeList(req, res) {
    try {
        let response = await todo_model.removeList(req.params._id)
        return res.status(200).json(response)
    } catch (err) {
        res.status(500).send("Server error, contact admin for more info")
        throw err
    }
}

module.exports = { getTodos, addTodo, updateTodo, removeTodo, addTodoList, removeList }