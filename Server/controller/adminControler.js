
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const task = require('../model/task')
const users = require('../model/users')
const { find } = require('../model/task')


// ---------------CREATING USERS AND TASKS-------------------------------//
// ADMIN PASSWORD AND USERNAME
const Username="ananthu"
const Password="123"
// ---------------------------------------------------------------------//


const adminLogin =(req,res)=>{

    console.log("entered admin longi")
    // process.env.

    const {userName,password}=req.body
    try{
        if(userName===Username){

            if(Password===password){
                const token = jwt.sign(
                    {username:userName,auth: true},
                    "process.env.JWT_ADMIN_SECRET_KEY", {
                    expiresIn: "10m",
                })

                res.json({ Admintoken: token, auth: true })
                console.log("admin verified")
            }
            else{
                res.status(401).json({error:"Incorrect Passwoard"})
                console.log("incorrect password")

            }
        }
        else{
         res.status(401).json({error:"Incorect username"})
         console.log("Incorect username")
      }
    }
    catch(error){
        res.status(500).json({error:"server error"})
        console.log("server error",error)
    }
  
}


const createUser =async(req,res)=>{
    console.log("post admin",req.body)
    const user = new users({
        username:req.body.userName,
        password:req.body.password,
        email:req.body.email
    })
    user.save().then((user)=>{
        console.log("user saved..",user)
    })
      console.log("newly inseted user..",user)
     res.status(200).json(user)
}

// ----------------------------VIWE ALL USERS-----------------------------//

const viewUsers =async(req,res)=>{
    console.log("gat all users")
    // let count = await users.find({}).count()
    let user = await users.find({})//.skip((req.params.page - 1) * 5).limit(5).exec();
    if(!user){
        res.status(500).json({Error:"no users"})
    }
    else{
        res.status(200).json({sucess:"All users",user})
        console.log("all users..",users)
        
    }
    
}
// ----------------------------CREATING TASK------------------------------//

const creatingTasks = (req,res) =>{
    console.log("creating task ",req.body)
    const {taskName,user,time,discription} =req.body.taskData


    const Task = new task({
        user:user,
        taskname:taskName,
        time :time,
        status:"assigned",
        created:Date.now(),
        description:discription
    })
    Task.save().then((task)=>{
        res.status(200).json(task)
        console.log("task saved..",task)
    })
      console.log("newly inseted task..",task)
    

}

// -------------------ADMIN DASHBOARD GET ALL DETAILS--------------------//

const adminDashboard = async(req,res)=>{
    console.log("get all details for admin dash board")

    try{
        const totalUsers= await users.find({}).count()
        const totalCompleted=await task.find({status: "completed"}).count()
        const totalStarted=await task.find({status: "started"}).count()
        const totalTask= await task.find({status: "assigned"}).count()
        let statistics={
            totalUsers,
            totalCompleted,
            totalStarted,
            totalTask
            }
        console.log("statistics..",statistics)
        res.status(200).json({statistics})

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"server error"})
    }

}



module.exports={adminLogin,createUser,viewUsers,creatingTasks,adminDashboard}








