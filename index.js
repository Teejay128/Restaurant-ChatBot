const path = require('path')
const express = require('express')
const { createServer } = require('http')
const socketio = require('socket.io')
const session = require('express-session')
// const bodyParser = require('body-parser')
require('dotenv').config()

const socketHandler = require('./src/utils/sockets')

const app = express()
const httpServer = createServer(app)
const io = socketio(httpServer)
const PORT = process.env.PORT || 3000
const sessionMiddleware = session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(sessionMiddleware)

app.post("/login", (req, res) => {
    req.session.authenticated = true
    res.status(204).end()
})


// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
// io.use(wrap(sessionMiddleware))
// io.use((socket, next) => {
//     const session = socket.request.session
//     if(session && session.authenticated) {
//         next()
//     } else {
//         next(new Error("Unauthorized"))
//     }
// })

io.on("connection", socketHandler)

httpServer.listen(PORT, () => {
    console.log("Server running on port", PORT)
})