const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    }, 
    
    
    template:[{type:String}]

},{timestamps: true})

module.exports = mongoose.model('AssigR2', userSchema);