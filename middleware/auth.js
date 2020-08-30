const jwt = require('jsonwebtoken')

async function authenticateToken(req, res, next) {
    let bearer = req.headers.authorization
    let token;
    if (bearer !== undefined) {
        token = bearer.split(' ')
    }
    if (token !== undefined) {
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
    } else {
        return res.status(401).json({
            success: false,
            message: 'Please sign in to delete comments'
        })
    }
}

module.exports = authenticateToken