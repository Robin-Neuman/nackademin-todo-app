const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user-controller')
const auth = require('../middleware/auth')

router.post('/login', user_controller.loginUser)
router.post('/register', auth.authenticateTokenAdmin, user_controller.registerUser)
router.delete('/', auth.authenticateTokenUser, user_controller.deleteUser)

module.exports = router