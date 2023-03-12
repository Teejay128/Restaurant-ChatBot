const welcomeMessage = require('./library')

const socketHandler = (socket) => {
    socket.emit('message', welcomeMessage())
    // socket.emit('sourceChange', "rating");

    socket.on("mainmenu", (msg) => {
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
}

module.exports = socketHandler
