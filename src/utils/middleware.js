const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req, res, next) {
    const token = req.cookies.jwt

    if(!token) {
        return res.status(401).send("Access denied. Please provide a token")
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded

        next()
    } catch(err) {
        res.status(400).send('Invalid token')
    }
}

module.exports = verifyToken