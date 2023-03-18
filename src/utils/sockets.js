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
        // There should be an option that redirects to 99, to checkout an order
        // Orders should be present here
        // Maybe an option to view menu list?
        let question = "Place An Order:"
        let divider = " to order"
        let orders = {
            1: "Egg dish",
            2: "Meat dish",
            3: "Fish dish",
            4: "Vegetable dish",
            5: "Fruit dish",
        }

        let options = {
            "1 - 5": "Place another order",
            98: "View all orders",
            99: "Checkout order",
            0: "Cancel order"
        }

        if(!msg) {
            socket.emit('message', question)
            socket.emit('options', { options: orders, divider })
            return
        }

        if(options[msg]) {
            socket.emit('redirect', { route: msg, text: ""})
            return
        }

        if(!orders[msg]) {
            socket.emit('message', "Please enter a valid option")
            return
        }

        // Emit some details about the dish "Route 97", and current order and stuff
        socket.emit('message', `${orders[msg]} has been added to your orders`)
        socket.emit('options', { options, divider: "to" })
        user.orders.push(orders[msg])

    })

    
    socket.on("99", (msg) => {
        let orders = user.orders

        let question = "Order placed"
        let divider = "to"
        let options = {
            1: "Place an order",
        }

        // Refactor this stuff
        if(msg == 1) {
            socket.emit('redirect', { route: msg, text: "" })
            return
        }

        if(msg != "") {
            socket.emit('message', "Please enter a valid option")
            return
        }

        if(!orders.length) {
            socket.emit('message', "No order to place")
            socket.emit('options', { options, divider })
            return
        }

        socket.emit('message', question)
        socket.emit('redirect', { route: "mainmenu", text: ""})
    })

    
    socket.on("98", (msg) => {
        let orders
        let question = "All placed orders"
        let divider = "to view"
        // let options = {
        //     1: "Place an order",
        //     99: "Checkout order"
        // }

        if(user.orders.length) {
            orders = {...user.orders}
        }

        if(!orders) {
            socket.emit('message', "There are no placed orders")
            socket.emit('redirect', { route: "1", text: "" })
            return
        }

        if(!msg) {
            socket.emit('message', question)
            socket.emit('options', { options: orders, divider })
            return
        }
        
        // if(options[msg]) {
        //     socket.emit('redirect', ({ route: msg, text: "" }))
        //     return
        // }
        
        if(orders[msg]) {
            socket.emit('redirect', ({ route: "97", text: orders[msg]}))
            return
        }
        
        socket.emit('message', "Please enter a valid option")

    })

    
    socket.on("97", (msg) => {
        console.log("view current")
        let divider = "to"
        let options = {
            1: "Place another order",
            99: "Checkout order",
            // 0: "Cancel order",
        }

        if(!msg) {
            socket.emit('message', "There is no current order")
            socket.emit('redirect', { route: "1", text: "" })
            return
        }

        if(options[msg]) {
            socket.emit('redirect', { route: msg, text: ""})
            return
        }

        // SWITCH STATEMENT FOR THE FIVE DISHES
        switch(msg) {
            case "Egg dish":
                socket.emit('message', "This dish is made with eggs and is very fantabulous")
                break;
            case "Meat dish":
                socket.emit('message', "This dish is made with meat and is very fantabulous")
                break;
            case "Fish dish":
                socket.emit('message', "This dish is made with fish and is very fantabulous")
                break;
            case "Vegetable dish":
                socket.emit('message', "This dish is made with vegetables and is very fantabulous")
                break;
            case "Fruit dish":
                socket.emit('message', "This dish is made with fruits and is very fantabulous")
                break;
            default:
                socket.emit('message', "Please enter a valid option")
        }
            
        socket.emit('options', { options, divider })
    })

    
    socket.on("0", (msg) => {
        let divider = "to"
        let options = {
            1: "Place a new order",
        }

        if(user.orders.length) {
            user.orders = []
            socket.emit('message', "Your Order has been cancelled")
            socket.emit('options', { options, divider })
            return
        }

        if(!msg) {
            socket.emit('message', "There are no orders to cancel")
            socket.emit('options', { options, divider })
            return
        }

        if(options[msg]) {
            socket.emit('message', "There are no orders to cancel")
            socket.emit('redirect', { route: msg, text: ""})
            return
        }

        socket.emit('message', "Please enter a valid option")

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
