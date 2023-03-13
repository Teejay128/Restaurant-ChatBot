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
            if(msg == 100){
                socket.emit('message', "Main menu:")
                socket.emit('redirect', { text: "", route: "mainmenu"})
            } else if(options[msg]) {
                let text = options[msg]
                let route = msg.toString()
                socket.emit('redirect', { text: "", route })
            } else {
                socket.emit('message', "Please select a valid option")
            }
        }
    })

    socket.on("1", (msg) => {
        let question = "Placing An Order:"
        let options = {
            1: "Choose Egg dishes",
            2: "Choose Meat dishes",
            3: "Choose Fish dishes",
            4: "Choose Vegetable dishes",
            5: "Choose Fruit dishes",
        }

        if(!msg) {
            socket.emit('response', { question, options })
        } else {
            if(msg == 100) {
                socket.emit('message', "Main menu:")
                socket.emit('redirect', { text: "", route: "mainmenu"})
            } else if(options[msg]) {
                // TODO: SWITCH STATEMENT TO HANDLE EACH OPTION
                socket.emit('message', options[msg])
                // socket.emit('message', question)
            } else {
                socket.emit('message', "Please select a valid option")
            }

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
