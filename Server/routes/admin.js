const express  = require('express')
const router=express.Router()
const {adminLogin,createUser,viewUsers,creatingTasks,adminDashboard,weeklyReport,monthlyReport} = require('../controller/adminControler')
const {verifyAdmin} = require('../Authentication/AdminAuth')



router.post('/createUser',verifyAdmin,createUser)
router.get('/view-user',verifyAdmin,viewUsers)
router.post ('/create-task' ,verifyAdmin,creatingTasks)

router.post('/login',adminLogin)
router.get('/dashboard',verifyAdmin,adminDashboard)
router.get('/weeklyReport',verifyAdmin,weeklyReport)
router.get('/monthlyReport',verifyAdmin,monthlyReport)



module.exports=router