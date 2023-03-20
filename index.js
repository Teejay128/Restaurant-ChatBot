const path = require('path')
const express = require('express')
const { createServer } = require('http')
const socketio = require('socket.io')
const session = require('express-session')
const MongoStore = require('connect-mongo')
// const bodyParser = require('body-parser')
require('dotenv').config()

const socketHandler = require('./src/utils/sockets')

const app = express()
const httpServer = createServer(app)
const io = socketio(httpServer)
const PORT = process.env.PORT || 3000
const sessionMiddleware = session({
    cookie:{
        secure: true,
        maxAge:60000
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/foodgpt'}),
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false
})

// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(sessionMiddleware)
app.set('trust proxy', 1)

app.use((req, res, next) => {
    if(req.session) {
        next()    
    }
    return next(new Error('Oh no, Session has failed'))

})

io.on("connection", socketHandler)

httpServer.listen(PORT, () => {
    console.log("Server running on port", PORT)
})