const express = require('express');
require("dotenv").config();  
const connectDB = require("./Config/db")
const port= 8000
const app = express();
app.use(express.json())
const adminRouter = require('./routes/admin')
const UserRouter = require('./routes/user')

connectDB()

var cors = require('cors')

app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.use('/admin',adminRouter);

app.use('/',UserRouter);





app.listen(port,()=>{
    console.log(`Server started running at port: ${port}`);
});