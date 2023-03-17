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
    socket.on('startChat', (username) => {
        
        const user = {
            name: username,
            id: socket.id,
            orders: []
        }

        console.log(user)
        console.log("Bot is starting")
        socket.emit('redirect', "mainmenu")
    })
    

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
            socket.emit('message', question)
            socket.emit('options', options)
            return
        }

        if(!options[msg]) {
            socket.emit('message', "Please enter a valid option")
            return
        }

        socket.emit('redirect', msg)

    })


    socket.on("1", (msg) => {
        let question = "Placing An Order:"
        // There should be an option that redirects to 99, to checkout an order
        // Orders should be present here
        // Maybe an option to view menu list?
        let options = {
            1: "Choose Egg dishes",
            2: "Choose Meat dishes",
            3: "Choose Fish dishes",
            4: "Choose Vegetable dishes",
            5: "Choose Fruit dishes",
        }

        if(!msg) {
            socket.emit('message', question)
            socket.emit('options', options)
            return
        }

        if(!options[msg]) {
            socket.emit('message', "Please enter a valid option")
            return
        }

        socket.emit('message', options[msg])
        // user.orders.push(options[msg])
        // console.log(user.orders)
        
        // socket.emit('message', user.orders)
        // switch(msg) {
        //     case "1":
        //         socket.emit("message", options[1])
        //         break;
        //     case "2":
        //         socket.emit("message", options[2])
        //         break;
        //     case "3":
        //         socket.emit("message", options[3])
        //         break;
        //     case "4":
        //         socket.emit("message", options[4])
        //         break;
        //     case "5":
        //         socket.emit("message", options[5])
        //         break;
        //     default:
        //         socket.emit('message', "Invalid request")
        // }

    })

    
    socket.on("99", (msg) => {
        // Find a way to check if there is a valid order
        let order = false

        let question = "No order to place"
        let options = {
            1: "Place an order",
            2: "Return all placed orders",
        }

        if(order) {
            socket.emit('message', "Order Placed, Redirecting to main menu...")
            socket.emit('redirect', "mainmenu")
            return
        } 
    
        if(!msg) {
            socket.emit('message', question)
            socket.emit('options', options)
            return
        }
        
        if(!options[msg]) {
            socket.emit('message', "Please enter a valid option")
            return
        }

        switch(msg) {
            case "1":
                socket.emit('redirect', "1")
                break;
            case "2":
                socket.emit('redirect', "98")
                break;
            default:
                socket.emit('message', "Invalid request")
        }

    })

    
    socket.on("98", (msg) => {
        let orders = { ...user.orders }
        let question = "All placed orders"
        let options = {
            1: "View Egg dishes",
            2: "View Meat dishes",
            3: "View Fish dishes",
            4: "View Vegetable dishes",
            5: "View Fruit dishes",
        }

        if(!orders) {
            socket.emit('message', "There are no placed orders, Redirecting to main menu...")
            socket.emit('redirect', { text: "", route: "mainmenu"})
            return
        }

        if(!msg) {
            socket.emit('message', question)
            socket.emit('options', options)
            return
        }

        if(!options[msg]) {
            socket.emit('message', "Please enter a valid option")
            return
        }

        socket.emit('message', options[msg])

    })
    
    socket.on("97", (msg) => {
        // If the order exists
        // order should equal orders[msg]

        let order = true
        let question = "What would you like to do next"
        let options = {
            1: "Checkout order",
            2: "View all orders",
        }

        // Orders should be returned as options
        if(!order) {
            socket.emit('message', "There is no current order, Please place an order")
            socket.emit('redirect', { text: "", route: "mainmenu"})
            return
        }

        socket.emit('message', "This is your order")
        socket.emit('message', question)
        socket.emit('options', options)

    })

    
    socket.on("0", (msg) => {
        // Find a way to check if there are any orders
        let orders = false

        let options = {
            1: "Place a new order",
        }

        if(orders) {
            socket.emit('message', "Your Order has been cancelled")
            socket.emit('options', options)
            return
        }

        if(!msg) {
            socket.emit('message', "There are no orders to cancel")
            socket.emit('options', options)
            return
        } 
            
        switch(msg) {
            case "1":
                socket.emit('redirect', "1")
                break;
            case "100":
                socket.emit('redirect', "mainmenu")
                break;
            default:
                socket.emit('message', "Please enter a valid option")
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
            socket.emit('message', question)
            socket.emit('options', options)
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
