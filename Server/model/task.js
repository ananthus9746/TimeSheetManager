const mongoose = require('mongoose')
const { Schema } = mongoose;


const taskSchema = new Schema({
   
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },  
    taskname : {
        type : String,
        require : true,
        trim: true,
    },
    time : {
        type : String,
        require : true,
        trim: true,
    },
    description : {
        type : String,
        require : true,
        trim: true,
    },
    status:{
        type:String
    },

    
    created : {
        type:Date
    },
    started : {
        type :Date
    },
    finished :{
        type : Date
    },
    totalTime :{
        type : Number
    },
})

module.exports =  mongoose.model('task', taskSchema)
