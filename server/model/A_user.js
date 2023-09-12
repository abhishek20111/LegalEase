const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default:'User'
    },
    photo: String,
    uid: {
        type: String,
        require: true
    },
    phone_no: Number,
    position: String,
    description: {
        experience: {
            year: Number,
            winning: Number,
            total_case: Number
        },
        about: [String],
        achievements: [String]
    },
    avilable: Boolean,
    tag: [String],
    address: { type: String },
    T_rating: String,
    review: [{
        Id: ObjectId,
        name: String,
        rating: String,
        description: String
    }],
    points: [{
        point_to_complete: String,
    }]


}, { timestamps: true })

module.exports = mongoose.model('A_User_SIH', userSchema);