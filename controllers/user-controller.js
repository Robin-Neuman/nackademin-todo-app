const user_model = require('../models/user-model')

async function loginUser(req, res) {
    try {
        let response = await user_model.loginUser(req.body.username, req.body.password)
        return res.status(response.status).json(response)
    } catch (err) {
        res.status(500).send("Server error, contact admin for more info")
        throw err
    }
}

async function registerUser(req, res) {
    try {
        let response = await user_model.registerUser(req.body.username, req.body.password, req.body.role)
        return res.status(200).json(response)
    } catch (err) {
        res.status(500).send("Server error, contact admin for more info")
        throw err
    }
}

module.exports = { loginUser, registerUser }