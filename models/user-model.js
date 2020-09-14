const db = require('./DB')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

async function loginUser(username, password) {
    const query = new Promise((resolve, reject) => {
        db.users.find({ username: username }, function (err, docs) {
            if (err) reject(err)
            if (docs[0]) {
                if (bcrypt.compareSync(password, docs[0].password)) {
                    jsonwebtoken.sign({ user: docs[0], role: docs[0].role}, process.env.SECRET_TOKEN, {expiresIn: '10 h'}, (err, token) => {
                        if (err) reject(err)
                        resolve({
                            success: true,
                            token: token,
                            status: 200
                        })
                    })
                } else {
                    reject({
                        success: false,
                        message: "Incorrect password or username",
                        status: 401
                    })
                }
            } else {
                reject({
                    success: false,
                    message: "Incorrect password or username",
                    status: 401
                })
            }
        })
    }).catch((err) => {
        return(err)
    })
    return await query
}

async function registerUser(username, password, role) {
    const query = new Promise((resolve, reject) => {
        db.users.find({ username: username }, function (err, docs) {
            if (err) reject(err)
            if (!docs[0]) {                
                db.users.insert({ username: username, password: bcrypt.hashSync(password), role: role}, function () {
                    resolve({
                        success: true,
                        message: 'User successfully created!',
                        status: 200
                    })
                })
            } else {
                reject({
                    success: false,
                    message: "User already exists",
                    status: 401
                })
            }
        })
    }).catch((err) => {
        return(err)
    })
    return await query
}

module.exports = { loginUser, registerUser }