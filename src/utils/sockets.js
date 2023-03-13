const User = require('../models/userModel')
/*
* TODO
* Add room functionality
* But with different bots
* Different languages or styles
* Should use an API for that
*/

const socketHandler = (socket) => {
    socket.emit('message', `<h3>Welcome to foodGPT</h3>`)

    const question =  `What can I help you with?`
    const options = {
        1: "Place an order",
        99: "Checkout order",
        98: "See order history",
        97: "See current order",
        0: "Cancel order"
    }

    socket.emit('response', { question, options })
    // socket.emit('options', options)

    socket.on("mainmenu", (msg) => {
        if(options[msg]) {
            let text = options[msg]
            let route = msg.toString()
            socket.emit('redirect', { text, route })
        } else {
            socket.emit('message', "Please select a valid option:")
        }
    })


    socket.on("1", (msg) => {
        socket.emit('message', msg)
    })

    socket.on("99", (msg) => {
        socket.emit('message', msg)
    })

    socket.on("98", (msg) => {
        socket.emit('message', msg)
    })

    socket.on("97", (msg) => {
        socket.emit('message', msg)
    })

    socket.on("0", (msg) => {
        socket.emit('message', msg)
    })


    socket.on("rating", (msg) => {
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
}

module.exports = socketHandler
