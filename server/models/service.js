//befor saving data,
//describe user collection structure -> schema

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//OrderSchema schema
const ServiceSchema = new mongoose.Schema({
    type: Number,
    name:String,
    price:Number,
    description:String,
    isActive: Boolean,
});


module.exports = mongoose.model('Service', ServiceSchema);