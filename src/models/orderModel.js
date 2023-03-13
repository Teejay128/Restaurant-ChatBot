const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
})

const Order = mongoose.model('order', orderSchema)
module.exports = Order