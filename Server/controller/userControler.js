
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const task = require('../model/task')
const users = require('../model/users')
const { ObjectId } = require('mongodb');


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
          expiresIn: "10m",
         })
        //  let userData={
        //   userName:UserEmail[0].username,
        //   email:UserEmail[0].email,
        //  }
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
const getTasks= async(req,res)=>{
  console.log("entered task..",req.params.id)
  console.log("Status..",req.params.status)
  let userId=req.params.id

  try{

    let Task =await task.find({user:ObjectId(userId),status :req.params.status}).populate('user')
    if(Task.length>0){
      res.status(200).json({Task:Task})
    }

  }
  catch(error){
    console.log("getTask error",error)
  }
}
// ------------------UPDATING TASK STATUS------------------------------//
                   //START-----COMPLETE//
const UpdateTask = async(req,res)=>{
  console.log("enterd to upadate task",req.body)
  const {taskId,userId,status} =req.body

  try{
      let findedTask=  await task.
      findOne({_id:taskId,user:ObjectId(userId)})

                 //START
      if(findedTask.status==="assigned"){
          console.log("task..",findedTask)
          findedTask.status=status//STARTED TIME
          findedTask.started = Date.now()///STARTED TIME NOW
          console.log("updated to START task..",findedTask)
      }

      else if(findedTask.status == "completed"){
        findedTask.status = req.body.status ;
        findedTask.finished = Date.now()//COMPLETE/FINISH DATE NOW
      }
              //TOTAL TIME TAKED IN TASK//
      else{
        //FINIHED DATA WITH TOTAL TIME TAKED IN TASK
            let time = new Date(Date.now()).getTime() - new Date(findedTask.started).getTime()
            const differenceInMinutes = Math.round(time / 1000 / 60)
            console.log(time , differenceInMinutes , "time..." )

            findedTask.status = req.body.status ;//
            findedTask.totalTime = differenceInMinutes
      }
      await findedTask.save()
      res.status(200).json({sucess:"updated"})
  }
  catch(err){
    console.log("cant save updated task..",err)
    res.status(500).json({ error: "something  on server wrong" })
  }

}

module.exports = { userLogin ,getTasks,UpdateTask};




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