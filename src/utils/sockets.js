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
        // socket.emit(`Hi ${user.name}, you are being redirected to the main menu`)
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
        let divider = " to order"
        let orders = {
            1: "Shakshuka",
            2: "Stroganoff",
            3: "Grilled Salmon",
            4: "Ratatouille",
            5: "Fruit Salad",
        }

        let options = {
            "1 - 5": "Place another order",
            98: "View your orders",
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

        // You also need to wipe the memory of the entire order
        socket.emit('message', question)
        // Emit the order to them, also give details about time and date of delivery and other bullshit
        // Give them options to rate us, go to main menu, or place a new order
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
            socket.emit('message', `All placed orders - (${user.orders.length})`)
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
            case "Shakshuka":
                socket.emit('message', "Shashuka is a popular North African and Middle Eastern dish made with eggs poached in a spicy tomato sauce with onions, peppers, and garlic")
                break;
            case "Stroganoff":
                socket.emit('message', "Stroganoff is a Russian dish made with tender strips of beef cooked in a creamy sauce with mushrooms, onions, and sour cream.")
                break;
            case "Grilled Salmon":
                socket.emit('message', "Grilled Salmon is a simple and healthy dish made with fresh salmon fillets grilled to perfection and seasoned with lemon, garlic, and herbs.")
                break;
            case "Ratatouille":
                socket.emit('message', "Ratatouille is a classic French dish made with eggplant, zucchini, bell peppers, onions, and tomatoes stewed in olive oil and seasoned with herbs.")
                break;
            case "Fruit Salad":
                socket.emit('message', "Fruit Salad is a refreshing and colorful dish made with a variety of fresh fruits, such as strawberries, blueberries, kiwi, mango, and pineapple, served with a light dressing made with honey and lime juice.")
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
