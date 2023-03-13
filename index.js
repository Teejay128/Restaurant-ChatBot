const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
require('dotenv').config()


const socketHandler = require('./src/utils/sockets')


const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 4000


app.use(express.static(path.join(__dirname, 'public')))

app.get('/1', (req, res) => {
    res.send("Hello from San Francisco")
})

app.get('/2', (req, res) => {
    res.send("Hello from San Diego")
})


io.on('connection', socketHandler)


server.listen(PORT, () => {
    console.log("Server running on port", PORT)
})