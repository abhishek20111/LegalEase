const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    ID:{
        type:ObjectId, ref:"User_SIH"
    },
    comment:{
        type:String,
        reply:[String],
    },
    likes:[String],

}, { timestamps: true })

module.exports = mongoose.model('forums', userSchema);