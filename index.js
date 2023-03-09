const path = require('path')
const http = require('http')
const express = require('express')
const socket = require('socket.io')
require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = socket(server)
const PORT = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/1', (req, res) => {
    res.send("Hello from San Francisco")
})

app.get('/2', (req, res) => {
    res.send("Hello from San Diego")
})

io.on('connection', (ws) => {
    ws.emit('message', "Welcome, how can I help you")
    console.log("connection successul")
    /*
    * TODO
    * Add room functionality
    * But with different bots
    * Different languages or styles
    * Should use an API for that
    */
})

server.listen(PORT, () => {
    console.log("Server running on port", PORT)
})