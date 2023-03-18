// const User = require('../models/userModel')
// const Order = require('../models/orderModel')

/*
* TODO
* Add room functionality
* But with different bots
* Different languages or styles
* Should use an API for that
*/


const socketHandler = (socket) => {
    const user = {}
    socket.on('startChat', (username) => {
        
        user.name = username
        user.id = socket.id
        user.orders = []

        socket.emit('redirect', { route: "mainmenu", text: "" })
    })
    
    
    socket.on("mainmenu", (msg) => {
        let question =  `Main menu:`
        let divider = "to"
        let options = {
            1: "Place an order",
            99: "Checkout order",
            98: "See order history",
            97: "See current order",
            0: "Cancel order"
        }

        if(!msg) {
            socket.emit('message', question)
            socket.emit('options', { options, divider })
            return
        }

        if(!options[msg]) {
            socket.emit('message', "Please enter a valid option")
            return
        }

        socket.emit('redirect', { route: msg, text: "" })

    })


    socket.on("1", (msg) => {
        let question = "Place An Order:"
        let divider = " to select"
        // There should be an option that redirects to 99, to checkout an order
        // Orders should be present here
        // Maybe an option to view menu list?
        let options = {
            1: "Egg dish",
            2: "Meat dish",
            3: "Fish dish",
            4: "Vegetable dish",
            5: "Fruit dish",
        }

        if(!msg) {
            socket.emit('message', question)
            socket.emit('options', { options, divider })
            return
        }

        if(!options[msg]) {
            socket.emit('message', "Please enter a valid option")
            return
        }

        // Emit some details about the dish "Route 97", and current order and stuff
        socket.emit('redirect', { route: "97", text: msg })
        user.orders.push(options[msg])

    })

    
    socket.on("99", (msg) => {
        // Find a way to check if there is a valid order
        // let order = false

        let question = "No order to place"
        let divider = "to"
        let options = {
            1: "Place an order",
        }


        if(user.orders.length) {
            // Give more info about the order
            socket.emit('message', "Order Placed")
            socket.emit('options', { options, divider })
            return
        } 
    
        if(!msg) {
            socket.emit('message', question)
            socket.emit('options', { options, divider })
            return
        }
        
        if(!options[msg]) {
            socket.emit('message', "Please enter a valid option")
            return
        }
        
        socket.emit('redirect', { route: msg, text: "" })
        socket.emit('message', `${options[msg]} has been added to your order`)

    })

    
    socket.on("98", (msg) => {
        let orders = { ...user.orders }
        let question = "All placed orders"
        let divider = "to view"
        let options = {
            1: "Egg dishes",
            2: "Meat dishes",
            3: "Fish dishes",
            4: "Vegetable dishes",
            5: "Fruit dishes",
        }
        console.log(orders)

        if(!orders) {
            socket.emit('message', "There are no placed orders")
            socket.emit('redirect', { route: "mainmenu", text: "" })
            return
        }

        if(!msg) {
            socket.emit('message', question)
            socket.emit('options', { orders, divider })
            return
        }

        if(!options[msg]) {
            socket.emit('message', "Please enter a valid option")
            return
        }

        socket.emit('message', options[msg])

    })
    
    socket.on("97", (msg) => {

        let orders = {
            1: "Egg dish",
            2: "Meat dish",
            3: "Fish dish",
            4: "Vegetable dish",
            5: "Fruit dish",
        }

        let divider = "to"
        let options = {
            99: "Checkout order",
            0: "Cancel order",
        }

        
        if(!msg) {
            socket.emit('message', "There is no current order")
            socket.emit('redirect', { route: "1", text: "" })
            return
        }
        
        if(orders[msg]) {
            let order = orders[msg]
            // Switch statement for each dish, and additional details
            socket.emit('message', `This is the ${order}`)
            socket.emit('options', { options, divider })
            return
        }

        if(options[msg]) {
            console.log(options[msg])
            socket.emit('redirect', { route: msg, text: options[msg]})
            return
        }

        socket.emit('message', "Please enter a valid option")
    })

    
    socket.on("0", (msg) => {
        // Find a way to check if there are any orders
        let orders = false
        let divider = "to"
        let options = {
            1: "Place a new order",
        }

        if(orders) {
            socket.emit('message', "Your Order has been cancelled")
            socket.emit('options', { options, divider })
            return
        }

        if(!msg) {
            socket.emit('message', "There are no orders to cancel")
            socket.emit('options', { options, divider })
            return
        } 
            
        switch(msg) {
            case "1":
                socket.emit('redirect', { route: "1", text: "" })
                break;
            case "100":
                socket.emit('redirect', { route: "mainmenu", text: "" })
                break;
            default:
                socket.emit('message', "Please enter a valid option")
        }

    })


    socket.on("rating", (msg) => {
        let question =  `How would you rate our services?`
        let divider = "to select"
        let options = {
            1: "Excellent",
            2: "Good",
            3: "Average",
            4: "Inadequate",
            5: "Poor"
        }

        if(!msg) {
            socket.emit('message', question)
            socket.emit('options', { options, divider })
            return
        }

        if(!options[msg]) {
            socket.emit('message', "Please enter a valid option")
            return
        }
        
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
    })

    console.log("connection successul")
}

module.exports = socketHandler
