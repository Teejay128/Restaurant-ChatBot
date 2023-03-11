const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
require('dotenv').config()

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
    // socket.on('request', (msg) => {
    //     console.log("New request: ", msg)
    //     socket.emit('message', response(`You just typed in ${msg}`))
    // })

    socket.on("mainmenu", (msg) => {
        console.log("mainmenu")
        const question =  "What can I help you with?"
        const options = {
            1: "Place an order",
            99: "Checkout order",
            98: "See order history",
            97: "See current order",
            0: "Cancel order"
        }

        socket.emit('message', question)
        socket.emit('options', options)
    })
    // CREATE A CONNECTION FOR EACH REQUEST
    // SOCKET.ON FOR "HOW wOULD YOU RATE OUR SERVICES"

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