const express = require('express');
const router = express.Router();
const todo_controller = require('../controllers/todo-controller')
const auth = require('../middleware/auth')

router.get('/', todo_controller.getTodos)
router.post('/:listId', auth.authenticateTokenUser, todo_controller.addTodo)
router.post('/', auth.authenticateTokenUser, todo_controller.addTodoList)
router.put('/:_id', auth.authenticateTokenUser, todo_controller.updateTodo)
router.delete('/:_id', auth.authenticateTokenAdmin, todo_controller.removeTodo)

module.exports = router