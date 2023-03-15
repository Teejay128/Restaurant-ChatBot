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
        let question =  `Main menu:`
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
                socket.emit('redirect', { text: "", route: "mainmenu"})
            } else if(options[msg]) {
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
        } else if (options[msg]){
            switch(msg) {
                case "1":
                    socket.emit("message", options[1])
                    break;
                case "2":
                    socket.emit("message", options[2])
                    break;
                case "3":
                    socket.emit("message", options[3])
                    break;
                case "4":
                    socket.emit("message", options[4])
                    break;
                case "5":
                    socket.emit("message", options[5])
                    break;
                default:
                    console.log("The thing is not thinging")
            }
        } else if(msg == 100) {
            socket.emit('redirect', { text: "", route: "mainmenu"})
        } else {
            socket.emit('message', "Please select a valid option")
        }
    })

    
    socket.on("99", (msg) => {
        // Find a way to check if there is a valid order
        let order = false

        let options = {
            1: "Place an order",
            2: "Return all placed orders",
        }

        if(order) {
            socket.emit('message', "Order Placed, Redirecting to main menu...")
            socket.emit('redirect', { text: "", route: "mainmenu"})
        } else {
            if(!msg) {
                socket.emit('response', { question: "No order to place", options })
            } else {
                switch(msg) {
                    case "1":
                        socket.emit('redirect', { text: "", route: "1"})
                        break;
                    case "2":
                        socket.emit('redirect', { text: "", route: "98"})
                        break;
                    case "100":
                        socket.emit('redirect', { text: "", route: "mainmenu"})
                        break;
                    default:
                        socket.emit('message', "Please select a valid option")
                }
    
            }
        }

    })

    
    socket.on("98", (msg) => {
        // Check if there are any orders
        let orders = true

        // Orders should be returned as options
        let options = {
            1: "View Egg dishes",
            2: "View Meat dishes",
            3: "View Fish dishes",
            4: "View Vegetable dishes",
            5: "View Fruit dishes",
        }

        if(orders) {
            if(!msg) {
                socket.emit('response', { question: "All placed orders", options })
            } else if(options[msg]){
                socket.emit('message', options[msg])
            } else if(msg == 100) {
                socket.emit('redirect', { text: "", route: "mainmenu"})
            } else {
                socket.emit('message', "Please select a valid option")
            }
        } else {
            socket.emit('message', "There are no placed orders, Redirecting to main menu...")
            socket.emit('redirect', { text: "", route: "mainmenu"})
        }

    })
    
    socket.on("97", (msg) => {
        // If the order exists
        // order should equal orders[msg]

        let order = true
        let options = {
            1: "Checkout order",
            2: "View all orders",
        }

        // Orders should be returned as options

        if(order) {
            socket.emit('message', "This is your order")
            socket.emit('response', { question: "What would you like to do next?", options })
        } else {
            socket.emit('message', "There is no current order, Please place an order")
            socket.emit('redirect', { text: "", route: "mainmenu"})
        }

    })

    
    socket.on("0", (msg) => {
        // Find a way to check if there are any orders
        let orders = false

        let options = {
            1: "Place a new order",
        }

        if(orders) {
            socket.emit('response', { question: "Your Order has been cancelled, what would you like to do", options })
        } else {
            if(!msg) {
                socket.emit('response', { question: "There are no orders to cancel", options })
            } else {
                switch(msg) {
                    case "1":
                        socket.emit('redirect', { text: "", route: "1"})
                        break;
                    case "100":
                        socket.emit('redirect', { text: "", route: "mainmenu"})
                        break;
                    default:
                        socket.emit('message', "Please select a valid option")
                }
    
            }
        }

    })


    socket.on("rating", (msg) => {
        let question =  `How would you rate our services?`
        let options = {
            1: "Excellent",
            2: "Good",
            3: "Average",
            4: "Inadequate",
            5: "Poor"
        }

        if(!msg) {
            socket.emit('response', { question, options })
        } else if (options[msg]){
            switch(msg) {
                case "1":
                    socket.emit("message", options[1])
                    break;
                case "2":
                    socket.emit("message", options[2])
                    break;
                case "3":
                    socket.emit("message", options[3])
                    break;
                case "4":
                    socket.emit("message", options[4])
                    break;
                case "5":
                    socket.emit("message", options[5])
                    break;
                case "100":
                    socket.emit('redirect', { text: "", route: "mainmenu"})
                    break;
                default:
                    console.log("The thing is not thinging")
            }
        } else {
            socket.emit('message', "Please select a valid option")
        }
    })

    console.log("connection successul")
}

module.exports = socketHandler
