
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const task = require('../model/task')
const users = require('../model/users')
const { ObjectId } = require('mongodb');
var moment = require('moment')

var tc = require("timezonecomplete");   




// ---------------USER LOGIN-----------------------------------------//

const userLogin = async(req, res) => {
  try{
    console.log("entered admin longi",req.body);
    const { userName, password,email} = req.body;

    let UserEmail =await users.find({email:email})
    if(UserEmail.length>0){
      //Need to usebcrypt 
      console.log("email..",UserEmail)
      if(UserEmail[0].password===password){
        console.log("acess granted")
        let userId=UserEmail[0]._id
        const UserToken = jwt.sign({ userId },
          "process.env.JWT_USER_SECRET_KEY", {
          expiresIn: "365d",
         })
   
         res.status(200).json({UserToken:UserToken,userId:UserEmail[0]._id})
      }
      else{
        console.log("Wrong password",UserEmail[0].password)
        res.status(401).json({error:"wrong password"})
      }
    }
    else{
      console.log("No email founded")
      res.status(401).json({error:"wrong email"})
    }
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:"something wrong in server"})
  }

};

// ------------------------GETTING TASKS FOR USER-----------------------//
const viewTask= async(req,res)=>{
  console.log("entered task..",req.params.id)
  console.log("Status..",req.params.status)
  let userId=req.params.id

  try{
    console.log("inside try")

    let Task =await task.find({user:ObjectId(userId),status :req.params.status})

    console.log("finded task...",Task)
    
    if(Task.length>0){
      console.log("task > 0..")
      res.status(200).json({Task:Task})
    }

  }
  catch(error){
    console.log("getTask error",error)
  }
}
// ------------------UPDATING TASK STATUS------------------------------//
                   //START-----COMPLETE//
//this function conver mill second to time for getting the time take to finish this task

                   function msToTime(ms) {
                    let seconds = (ms / 1000).toFixed(1);
                    let minutes = (ms / (1000 * 60)).toFixed(1);
                    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
                    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
                    if (seconds < 60) return seconds + " Sec";
                    else if (minutes < 60) return minutes + " Min";
                    else if (hours < 24) return hours + " Hrs";
                    else return days + " Days"
                  }



const UpdateTask = async(req,res)=>{
  console.log("enterd to upadate task",req.body)
  const {taskId,userId,status} =req.body

  try{
      let findedTask=  await task.
      findOne({_id:taskId,user:ObjectId(userId)})

                 //START
      if(findedTask.status==="assigned"){//DEFAULT ASSIGN
          console.log("task..",findedTask)
          findedTask.status=status//STARTED TIME
          findedTask.started = Date.now()///STARTED TIME NOW
          console.log("updated to START task..",findedTask)
      }
                //COMPLETE
      else{//else finddedTask.status=="completed"
        findedTask.status = req.body.status ;//COMPLETED STATUS
        findedTask.finished = Date.now()//COMPLETE/FINISH DATE NOW
        //CALCULATING TOTAL TIME TAKEN TO FINISH THIS TASK
        var startDate = moment(findedTask.started)
        var endDate = moment( Date.now())
        var duration = endDate.diff(startDate)
        
        console.log("moment",msToTime(duration))
        var diffrence=  msToTime(duration)
        console.log("diffrence",diffrence)
        findedTask.totalTime =diffrence

        console.log("Completed time updated task..",findedTask)
      }
 
      await findedTask.save()
     res.status(200).json({sucess:"updated"})
  }
  catch(err){
    console.log("cant save updated task..",err)
   res.status(500).json({ error: "something  on server wrong" })
  }

}

module.exports = { userLogin ,viewTask,UpdateTask};




// return new Promise(async (resolve, reject) => {
//   var updateUser = await User.updateOne(
//     { _id: userid },
//     { $set: { blocked: true } }
//   );
//   resolve({ status: true });
//   console.log("updated user status to true..", updateUser);
// }).then((response) => {
//   res.json(response);
// });




// (findedTask.status == "completed")

             //TOTAL TIME TAKED IN TASK//
            //  else{
            //   //FINIHED DATA WITH TOTAL TIME TAKED IN TASK
      
            //     console.log("else...*****************************")
      
                  // let time = new Date(Date.now()).getTime() - new Date(findedTask.started).getTime()
                  // const differenceInMinutes = Math.round(time / 1000 / 60)
                  // console.log(time , differenceInMinutes , "time..." )
      
                  // findedTask.status = req.body.status ;
                  // findedTask.totalTime = differenceInMinutes
            // }