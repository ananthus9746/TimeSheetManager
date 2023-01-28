import React, { useState, useEffect } from "react";
import { ViewAllUsers } from "../../Api/AdminAPI/AdminAPI";
import { useForm } from "react-hook-form";
import AxiosInstance from '../../../AxiosInstance/AxiosInstance'




import "./AssignTask.css";
function AssignTask() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');


  const { register, handleSubmit, watch,reset, formState: { errors } } = useForm()


  const onSubmit = async(taskData) =>{
  console.log("inside on submit")
  console.log(taskData);

  const response = await AxiosInstance({
    method:"post",
    url:"/admin/create-task",
    data:{
      taskData
    }
  }).then((response)=>{
    alert("Task added")

    reset({
      taskName: '',
      time: '',
      user:'',
      discription:'',
    })

  })
  }




  


  useEffect(() => {
    try {
      let users = ViewAllUsers().then((data) => {
        console.log(data.data.user);
        let usersdata = data.data.user;
        setUsers(usersdata);
        console.log("users..",usersdata)
      });
      // console.log(users);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 403) {
        // console.log("hiiii")
        // localStorage.removeItem('Admintoken')
        // Navigate("/admin/admin-login")
      } else {
        alert("render errpor page");
      }
    }
  }, []);

  return (
    <div className="assign-container">


      <form className="assign-task-form"  onSubmit={handleSubmit(onSubmit)}>

        <h1  className='assign-task-heading'>ASSIGN TASK TO USERS</h1>

        <label className="assign-label-names" >Task Name</label>
        <br />

        <input className="assign-input"   type="text" placeholder="task"  {...register("taskName", { required: true })}/>
        <br />
        {errors.taskName && <span className="reqired-field">Task name required ?</span>}


        <label  className="assign-label-names">Time</label>
        <br />

        <input  className="assign-input" type="number" placeholder="Time"  {...register("time", { required: true })} />
        <br />
        {errors.time && <span  className="reqired-field">Time field is required ?</span>}

        
        <label  className="assign-label-names" for="">Select user</label>
        <br />

        <select className="assign-input" name="cars" id="cars"  {...register("user", { required: true })}  >

        <option   selected disabled hidden>Select an Option</option>
       {users?.map((obj) => {
            return (<option value={obj._id}>{obj.username}</option>)
          })}
        </select>
        
        {errors.user && <span  className="reqired-field">Must need select a user ?</span>}


        <br />
        <p  className="assign-label-names">Discription</p>
        <br/>
        <textarea
          className="discription"
          placeholder="discription..."
          {...register("discription")}
        ></textarea>
        <br />

        {/* <input {...register("exampleRequired", { required: true })} />


        {errors.exampleRequired && <span>This field is required</span>} */}

        <button className="assign-button">Assign</button>
        {/* <input className="assign-button" type="submit" /> */}
        
      </form>

    </div>
  );
}

export default AssignTask;
