const express = require('express');
const router = express.Router();
const todo_controller = require('../controllers/todo-controller')

router.get('/', todo_controller.getTodos)
router.post('/:_id', todo_controller.addTodo)
router.put('/:_id', todo_controller.updateTodo)
router.delete('/:_id', todo_controller.removeTodo)

module.exports = router