const mongoose = require('mongoose')
 const mongoURL = "mongodb+srv://ananthu:Sandeep.A97@cluster0.doqvtqs.mongodb.net/taskManager?retryWrites=true&w=majority"



    const connectDB =()=>{
         mongoose.connect(mongoURL,()=>{
            console.log(`connected to database`)
        })
    }




module.exports = connectDB;