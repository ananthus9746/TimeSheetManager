const express  = require('express')
const { verifyUser } = require('../Authentication/UserAuth')
const router=express.Router()
const {userLogin,viewTask,UpdateTask} = require('../controller/userControler')



router.post('/login',userLogin)

router.get('/tasks/:id/:status',verifyUser,viewTask)

router.put('/updateStatus',verifyUser,UpdateTask)


module.exports=router