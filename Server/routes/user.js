const express  = require('express')
const { verifyUser } = require('../Authentication/UserAuth')
const router=express.Router()
const {userLogin,getTasks,UpdateTask} = require('../controller/userControler')



router.post('/login',userLogin)

router.get('/tasks/:id/:status',verifyUser,getTasks)//getTasks

router.put('/updateStatus',verifyUser,UpdateTask)//update


module.exports=router