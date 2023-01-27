const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const task = require('../model/task')
const users = require('../model/users')




const verifyAdmin =(req,res,next)=>{

    console.log("admin login athtiction..",req.body)

    // res.status(200).json({message:"admin"})
next()
}


module.exports={verifyAdmin}
