//befor saving data,
//describe user collection structure -> schema

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//OrderSchema schema
const OrderSchema = new mongoose.Schema({
    type: Array,
    orderDate: Date,
    userId: String,
    orderStatus: Number,
    isActive: Boolean,
    dayOfOrder: Date
});


module.exports = mongoose.model('Order', OrderSchema);