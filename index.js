const path = require('path')
const express = require('express')
const { createServer } = require('http')
const socketio = require('socket.io')
const session = require('express-session')
require('dotenv').config()


const socketHandler = require('./sockets')
const app = express()
const httpServer = createServer(app)
const io = socketio(httpServer)
const port = process.env.PORT || 3000
const sessionMiddleware = session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false
})
const connect = (middleware) => {
    return (socket, next) => {
        middleware(socket.request, {}, next);
    }
}


app.use(sessionMiddleware)
app.use(express.static(path.join(__dirname, 'public')))
app.set('trust proxy', 1)


io.use(connect(sessionMiddleware))
io.on("connection", socketHandler)


httpServer.listen(port, () => {
    console.log("Server running on port", port)
})