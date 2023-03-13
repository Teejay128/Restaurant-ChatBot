const mongoose = require('mongoose')
const Order = require('./orderModel')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: Order
    }]
})

const User = mongoose.model('user', userSchema)
module.exports = User