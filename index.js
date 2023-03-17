const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const verifyToken = require('./src/utils/middleware')
const socketHandler = require('./src/utils/sockets')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 4000


app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.post('/login', (req, res) => {
    const username = req.body
    console.log(username)

    // if(isAuthenticated(username)) {
    //     const token = jwt.sign({ username }, process.env.SECRET_KEY)

    //     res.cookie('jwt', token, { httpOnly: true })

    //     res.send("You have been logged in")
    // } else {
    //     res.status(401).send("Credentials are invalid")
    // }
})

app.get('/chat', verifyToken, (req, res) => {
    const username = req.user

    res.send(`Welcome, ${username}`)
})

io.on('connection', socketHandler)


server.listen(PORT, () => {
    console.log("Server running on port", PORT)
})