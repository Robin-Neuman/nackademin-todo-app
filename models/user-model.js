const db = require('./DB')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

async function loginUser(username, password) {
    const query = new Promise((resolve, reject) => {
        db.users.find({ username: username }, function (err, docs) {
            if (err) reject(err)
            if (docs[0]) {
                if (bcrypt.compareSync(password, docs[0].password)) {
                    jwt.sign({ user: docs[0], role: docs[0].role}, process.env.SECRET_TOKEN, {expiresIn: '10 h'}, (err, token) => {
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

async function deleteUser(headers) {
    let token;
    if (headers !== undefined && headers !== null) {
        token = headers.split(' ')
    }
    if (token !== undefined && token !== null && token[1] !== 'null') {  
        const decoded = jwt_decode(token[1])
        if (decoded.role == 'admin' && Date.now() <= decoded.exp * 1000) {
            jwt.verify(token[1], process.env.SECRET_TOKEN, async function (err) {
                if (err) return err
                const query = new Promise((resolve, reject) => {
                    db.users.remove({ _id: decoded.user._id }, function (err, docs) {
                        if (err) reject(err)
                        if (!docs[0]) {                
                            db.todoLists.remove({ user_id: decoded.user._id }, { multi: true }, function () {
                                db.todos.remove({ user_id: decoded.user._id }, { multi: true }, function () {
                                    resolve({
                                        success: true,
                                        message: 'User successfully removed!',
                                        status: 200
                                    })
                                })
                            })
                        } else {
                            reject({
                                success: false,
                                message: "User not removed",
                                status: 401
                            })
                        }
                    })
                }).catch((err) => {
                    return(err)
                })
                return await query
            })            
        }
    } else {
        return res.status(401).json({
            success: false,
            message: 'Please sign in to delete user'
        })
    }
}

module.exports = { loginUser, registerUser, deleteUser }