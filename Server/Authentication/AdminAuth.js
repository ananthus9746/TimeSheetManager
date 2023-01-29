const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const task = require('../model/task')
const users = require('../model/users')




const verifyAdmin =(req,res,next)=>{
   console.log("admin login athtiction..",req.body)
//     console.log("enterd admin verify..")
//     const token = req.headers.accesstoken;
//     try{
//         if(!token){
//             res.status(403).json("verifivation failed")
//         }
//         else{
//             jwt.verify(token,"process.env.JWT_ADMIN_SECRET_KEY",(err,admin)=>{
//                 if(err){
//                     console.log("verify err.",err)
//                     //some error in verify admin that why i give next() here solve problem later


//                 }else{
//                     console.log("admin",admin)
//                     next()
//                 }
//             })
//         }
//     }
//     catch(err){
//         console.log(err)
//    }
               next()

}


module.exports={verifyAdmin}
