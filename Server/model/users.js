const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        require : true,
        trim: true,
    },
    password:{
        type : String,
        require : true,
        trim: true,
    },
    email:{
        type : String,
        require : true,
        trim: true,
    },
    blocked:{
        type:Boolean,
        default:false,
    },
    // createdAt:{
    //     default: Date.now

    // }

},{timestamps:true})

module.exports = mongoose.model("users", UserSchema);
