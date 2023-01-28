const express  = require('express')
const router=express.Router()
const {adminLogin,createUser,viewUsers,creatingTasks,adminDashboard} = require('../controller/adminControler')
const {verifyAdmin} = require('../Authentication/AdminAuth')



router.post('/login',adminLogin)
router.post('/createUser',verifyAdmin,createUser)
router.get('/view-user',verifyAdmin,viewUsers)
router.post ('/create-task' ,verifyAdmin,creatingTasks)
router.get('/dashboard',verifyAdmin,adminDashboard)



module.exports=router