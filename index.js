const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
require('dotenv').config()

// const library = require('./src/utils/library')
const welcomeMessage = require('./src/utils/library')

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


io.on('connection', (socket) => {
    socket.emit('message', welcomeMessage())
    // socket.emit('sourceChange', "rating");

    socket.on("mainmenu", (msg) => {
        console.log("mainmenu")
        const question =  `Okay ${msg}, What can I help you with?`
        const options = {
            1: "Place an order",
            99: "Checkout order",
            98: "See order history",
            97: "See current order",
            0: "Cancel order"
        }

        socket.emit('message', question)
        socket.emit('options', options)
        socket.emit('sourceChange', "rating");
    })

    socket.on("rating", (msg) => {
        console.log("rating")
        const question =  `How would you rate our services?`
        const options = {
            1: "Excellent",
            2: "Good",
            3: "Average",
            4: "Inadequate",
            5: "Poor"
        }

        socket.emit('message', question)
        socket.emit('options', options)
        socket.emit('sourceChange', "mainmenu");
    })

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