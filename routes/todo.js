const express = require('express');
const router = express.Router();
const todo_controller = require('../controllers/todo-controller')
const auth = require('../middleware/auth')

router.get('/', todo_controller.getTodos)
router.post('/:listId', todo_controller.addTodo)
router.post('/', todo_controller.addTodoList)
router.put('/:_id', todo_controller.updateTodo)
router.delete('/:_id', todo_controller.removeTodo)
router.delete('/list/:_id', todo_controller.removeList)

module.exports = router