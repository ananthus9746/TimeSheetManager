const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const task = require('../model/task')
const users = require('../model/users')




const verifyUser =(req,res,next)=>{

    console.log("admin login athtiction..",)

    // res.status(200).json({message:"admin"})
next()
}


module.exports={verifyUser}