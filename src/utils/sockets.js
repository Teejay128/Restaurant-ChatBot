const User = require('../models/userModel')
const Order = require('../models/orderModel')
/*
* TODO
* Add room functionality
* But with different bots
* Different languages or styles
* Should use an API for that
*/



const socketHandler = (socket) => {
    socket.emit('message', `<h3>Welcome to foodGPT</h3>`)
    socket.emit('redirect', { text: "", route: "mainmenu" })

    socket.on("mainmenu", (msg) => {
        let question =  `What can I help you with?`
        let options = {
            1: "Place an order",
            99: "Checkout order",
            98: "See order history",
            97: "See current order",
            0: "Cancel order"
        }

        if(!msg) {
            socket.emit('response', { question, options })
        } else {
            if(options[msg]) {
                let text = options[msg]
                let route = msg.toString()
                socket.emit('redirect', { text, route })
            } else {
                socket.emit('message', "Please select a valid option")
            }
        }
    })

    socket.on("1", (msg) => {
        let question = msg
        let options = {
            1: "Place an order",
            99: "Checkout order",
            98: "See order history",
            97: "See current order",
            0: "Cancel order"
        }
        if(!msg) {
            socket.emit('response', {question, options })
        } else {
            socket.emit('message', question)
            socket.emit('redirect', { text: "", route: "mainmenu"})
        }
    })

    socket.on("99", (msg) => {
        let question = msg
        let options = {
            1: "Place an order",
            99: "Checkout order",
            98: "See order history",
            97: "See current order",
            0: "Cancel order"
        }
        if(!msg) {
            socket.emit('response', {question, options })
        } else {
            socket.emit('message', question)
            socket.emit('redirect', { text: "", route: "mainmenu"})
        }
    })

    socket.on("98", (msg) => {
        let question = msg
        let options = {
            1: "Place an order",
            99: "Checkout order",
            98: "See order history",
            97: "See current order",
            0: "Cancel order"
        }
        if(!msg) {
            socket.emit('response', {question, options })
        } else {
            socket.emit('message', question)
            socket.emit('redirect', { text: "", route: "mainmenu"})
        }
    })

    socket.on("97", (msg) => {
        let question = msg
        let options = {
            1: "Place an order",
            99: "Checkout order",
            98: "See order history",
            97: "See current order",
            0: "Cancel order"
        }
        if(!msg) {
            socket.emit('response', {question, options })
        } else {
            socket.emit('message', question)
            socket.emit('redirect', { text: "", route: "mainmenu"})
        }
    })

    socket.on("0", (msg) => {
        let question = msg
        let options = {
            1: "Place an order",
            99: "Checkout order",
            98: "See order history",
            97: "See current order",
            0: "Cancel order"
        }
        if(!msg) {
            socket.emit('response', {question, options })
        } else {
            socket.emit('message', question)
            socket.emit('redirect', { text: "", route: "mainmenu"})
        }
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
