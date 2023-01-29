const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const task = require("../model/task");
const users = require("../model/users");
const { find } = require("../model/task");

// ---------------CREATING USERS AND TASKS-------------------------------//
// ADMIN PASSWORD AND USERNAME
const Username = "ananthu";
const Password = "123";
// ---------------------------------------------------------------------//

const adminLogin = (req, res) => {
  console.log("entered admin longi");
  // process.env.

  const { userName, password } = req.body;
  try {
    if (userName === Username) {
      if (Password === password) {
        const token = jwt.sign(
          { username: userName, auth: true },
          "process.env.JWT_ADMIN_SECRET_KEY",
          {
            expiresIn: "365d",
          }
        );

        res.json({ Admintoken: token, auth: true });
        console.log("admin verified");
      } else {
        res.status(401).json({ error: "Incorrect Passwoard" });
        console.log("incorrect password");
      }
    } else {
      res.status(401).json({ error: "Incorect username" });
      console.log("Incorect username");
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
    console.log("server error", error);
  }
};

const createUser = async (req, res) => {
  console.log("post admin", req.body);
  const user = new users({
    username: req.body.userName,
    password: req.body.password,
    email: req.body.email,
  });
  user.save().then((user) => {
    console.log("user saved..", user);
  });
  console.log("newly inseted user..", user);
  res.status(200).json(user);
};

// ----------------------------VIWE ALL USERS-----------------------------//

const viewUsers = async (req, res) => {
  console.log("gat all users");
  // let count = await users.find({}).count()
  let user = await users.find({});
  if (!user) {
    res.status(500).json({ Error: "no users" });
  } else {
    res.status(200).json({ sucess: "All users", user });
    console.log("all users..", users);
  }
};
// ----------------------------CREATING TASK------------------------------//

const creatingTasks = async (req, res) => {
  console.log("creating task ", req.body);
  const { taskName, user, time, discription } = req.body.taskData;

  var findUsername = await users.find({ _id: user });
  if (findUsername) {
    console.log("username..", findUsername[0].username);
    var username = findUsername[0].username;
  }
  const Task = new task({
    user: user,
    username: username,
    taskname: taskName,
    time: time,
    status: "assigned",
    created: Date.now(),
    description: discription,
  });
  Task.save().then((task) => {
    console.log("task saved..", task);

    res.status(200).json(task);
  });
  console.log("newly inseted task..", task);
};

// -------------------ADMIN DASHBOARD GET ALL DETAILS--------------------//

const adminDashboard = async (req, res) => {
  console.log("get all details for admin dash board");

  try {
    const totalUsers = await users.find({}).count();
    const totalCompleted = await task.find({ status: "completed" }).count();
    const totalStarted = await task.find({ status: "started" }).count();
    const totalTask = await task.find({ status: "assigned" }).count();
    let statistics = {
      totalUsers,
      totalCompleted,
      totalStarted,
      totalTask,
    };
    console.log("statistics..", statistics);
    res.status(200).json({ statistics });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};
// -------------------------WEEKLY REPORT---------------------------------//
const weeklyReport = async (req, res) => {
  console.log("entered weekly report..");

  try {
    let weeklyReport = await task.aggregate([
      {
        $match: {
          created: {
            $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          },
          status:'completed'
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$created" },
            },
            username: "$username",
            "status": '$completed'

          },
          totaHrsInWeek: { $sum: "$totalTime" },
          totalTaskDoneInWeek: { $sum: 1 },
        },
      },
    ]);

    console.log("weekly data..", weeklyReport);
    res.status(200).json({ weeklyReport });
  } catch (err) {
    console.log("eror..", err);
  }
};




//TASK DATA LOOK LIKE//
// created:"2023-01-28T21:37:12.810Z"
// description:"esdfada"
// finished :"2023-01-28T21:42:28.627Z"
// started :"2023-01-28T21:38:49.911Z"
// status :"completed"
// taskname :"ecomerce"
// time: "1"
// totalTime:"3.6 Min"
// user:"63d59551be73f970d5d90496"
// __v:0
// _id:"63d59588be73f970d5d9049e"





// ---------------------MONTHLY REPORT------------------------------//

const monthlyReport = async (req, res) => {
  console.log("enterd mothly report..");

  try {
    let monthly = await task.aggregate([
      //stage 1 mathing getting all document graterthan this date
      {
        $match: {
          created: {
            $gte: new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000),
          },
          status:'completed'
        },
      },
      //stage 2 grouping data with specific field
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m", date: "$created" } },
            username: "$username",

          },
          totaHrsInMonth: { $sum: "$totalTime" },
          totalTaskDoneInMonth: { $sum: 1 },
        },
      },
    ]);

    console.log("mothly report agrigatated..", monthly);
    res.status(200).json({ monthly });
  } catch (err) {
    console.log("mothreport error..", err);
  }
};



module.exports = {
  adminLogin,
  createUser,
  viewUsers,
  creatingTasks,
  adminDashboard,
  weeklyReport,
  monthlyReport,
};
