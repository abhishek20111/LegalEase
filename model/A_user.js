const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    ID:{type:ObjectId , ref:"User_SIH"},
    uid: {
        type: String,
        require: true,
        unique: true
    },
    phone_no: Number,
    title : String,
    position: String,
    description: {
        experience: {
            year: Number,
            winning: Number,
            total_case: Number,
        },
        about: [String],
        achievements: [String]
    },
    avilable: Boolean,
    tag: [String],
    verifyUser:{ type:Boolean, default:false},
    address: { type: String },
    city:String,
    State:String,
    T_rating: String,
    review: [{
        Id: {type:ObjectId, ref:"User_SIH"},
        name: String, 
        rating: String,
        description: String
    }],
    clientId:[{
        Id:String,
        Objectives:[{
            task:{
                complete:Boolean,
                task_info:[String],
                task_point: {type:Number, default:0}
            } 
        }]
    }],
    document:[{
        adhar:String,
        pan:String,
        lic:String,
    }],
    points: [{
        point_curr: {type:Number, default:0},
        profile_v:{type:Number, default:0},
        externalPoint:{type:Number, default:0}
    }]

}, { timestamps: true })

module.exports = mongoose.model('A_User_SIH', userSchema);