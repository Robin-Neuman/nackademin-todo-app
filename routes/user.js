const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user-controller')
const auth = require('../middleware/auth')

router.post('/login', user_controller.loginUser)
router.post('/register', user_controller.registerUser)

module.exports = router