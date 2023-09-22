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
            total_case: Number
        },
        about: [String],
        achievements: [String]
    },
    avilable: Boolean,
    tag: [String],
    address: { type: String },
    T_rating: String,
   
    

    // ratings :[
    //     {
    //         star:Number,
    //         postedby:{type: mongoose.Schema.Types.ObjectId,ref:"User_SIH"}
    //     }
    // ],
    // totalrating:[{
    //     type:String,
    //     default:0
    // }],
    // points: [{
    //     point_complete: String,
    // }]


    review: [{
        Id: {type:ObjectId, ref:"User_SIH"},
        name: String, 
        rating: String,
        description: String
    }],

   
    
     
    }, { timestamps: true });
    
  
    module.exports = mongoose.model('A_User_SIH', userSchema);