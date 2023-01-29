const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const task = require('../model/task')
const users = require('../model/users')




const verifyUser =(req,res,next)=>{
    console.log("enterd user verify..")
    const token = req.headers.accesstoken;
    try{
        if(!token){
            res.status(403).json("verifivation failed")
        }
        else{
            jwt.verify(token, "process.env.JWT_USER_SECRET_KEY",(err,user)=>{
                if(err){
                    console.log("verify err verifivation failed time out.",err)
                    res.status(403).json("verifivation failed time out")

                }else{
                    console.log("user",user)
                    next()
                }
            })
        }
    }
    catch(err){
        console.log(err)
   }


   

}


module.exports={verifyUser}