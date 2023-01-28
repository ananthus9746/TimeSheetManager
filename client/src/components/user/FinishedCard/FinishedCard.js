import React,{useEffect,useState} from "react";
import "./FinishedCard.css";
import AxiosInstance from '../../../AxiosInstance/AxiosInstance'
import moment from 'moment';




function FinishedCard() {

  const [task, setTask] = useState([]);
  const [starTaskId,setStartTask] =useState('')
  const [startDocumentId,setStartDocumentId]=useState('')

  //--------------------GETTING STARTED TASKS----------------------//
  useEffect( () => {
    try{
      let userToken=localStorage.getItem('userToken')
      var userId=localStorage.getItem('user')
      console.log("local storage user id..",userId)
      const getTask =async()=>{
        const response = await AxiosInstance({
          method: "get",
          url: `/tasks/${userId}/completed`,
          data: {
            userid:userId
          },
        }).then((task)=>{
          console.log("completed task data..",task)
          console.log("completed task data...",task.data.Task)
          setTask(task.data.Task)
        })
      }
      getTask()
    }
    catch(err){
      alert("erorr",err)
    }
  },[]);
  // ---------------------------COMPLETING TASK-------------------//


  return (
    <>
      <h1 className='assigned-heading'>FINISHED TASKS</h1>
      <div className="finished-container">

          {
            task.map((obj,index)=>{


              return(
                <div className="finished-task-container">
                  <h2 className="card-heading">{obj.taskname}</h2>
                  <p className="card-paragraph">
                  {obj.description}
                  </p>
                  {/* <p>Task Assigned date:{obj.created}</p> */}
                  <h2 className="card-time">Time Allowcated: 1hr</h2>
                  <p>Task assigned date:{moment(obj.createdAt).format("dddd-MMM-DD")}</p>

                  <p>Time time:{obj.totalTime}</p>
              </div>
              )
            })
          }
      </div>

    </>
  );
}

export default FinishedCard;
