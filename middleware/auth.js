const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

async function authenticateTokenUser(req, res, next) {
    let bearer = req.headers.authorization
    let token;
    if (bearer !== undefined && bearer !== null) {
        token = bearer.split(' ')
    }
    if (token !== undefined && token !== null && token[1] !== 'null') {
        const decoded = jwt_decode(token[1])
        if (decoded.role == 'user' || 'admin' && Date.now() <= decoded.exp * 1000) {
            jwt.verify(token[1], process.env.SECRET_TOKEN, function (err) {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Please sign in to delete comments'
                    })
                } else {
                    next()
                }
            })            
        }
    } else {
        return res.status(401).json({
            success: false,
            message: 'Please sign in to delete comments'
        })
    }
}

async function authenticateTokenAdmin(req, res, next) {
    let bearer = req.headers.authorization
    let token;
    if (bearer !== undefined && bearer !== null) {
        token = bearer.split(' ')
    }
    if (token !== undefined && token !== null && token[1] !== 'null') {  
        const decoded = jwt_decode(token[1])
        if (decoded.role == 'admin') {
            jwt.verify(token[1], process.env.SECRET_TOKEN, function (err) {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Contact your administrator'
                    })
                } else {
                    next()
                }
            })
        }
    } else {
        return res.status(401).json({
            success: false,
            message: 'Contact your administrator'
        })
    }
}

module.exports = { authenticateTokenUser, authenticateTokenAdmin}