const express  = require('express')
const router=express.Router()
const {adminLogin,createUser,viewUsers,creatingTasks,adminDashboard,weeklyReport,monthlyReport,graphReport} = require('../controller/adminControler')
const {verifyAdmin} = require('../Authentication/AdminAuth')



router.post('/login',adminLogin)
router.post('/createUser',verifyAdmin,createUser)
router.get('/view-user',verifyAdmin,viewUsers)
router.post ('/create-task' ,verifyAdmin,creatingTasks)
router.get('/dashboard',verifyAdmin,adminDashboard)

router.get('/graphReport',verifyAdmin,graphReport)
router.get('/weeklyReport',verifyAdmin,weeklyReport)
router.get('/monthlyReport',verifyAdmin,monthlyReport)



module.exports=router