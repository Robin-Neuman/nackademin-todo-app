const express = require('express');
const router = express.Router();
const todo_controller = require('../controllers/todo-controller')
const auth = require('../middleware/auth')

router.get('/', todo_controller.getTodos)
router.post('/', todo_controller.addTodo)
router.put('/:_id', todo_controller.updateTodo)
router.delete('/:_id', auth, todo_controller.removeTodo)

module.exports = router