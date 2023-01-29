import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../AxiosInstance/AxiosInstance";
import "./AssignedCard.css";
import moment from 'moment';


function AssignedCard() {
  const [task, setTask] = useState([]);
  const [starTaskId, setStartTask] = useState("");
  const [startDocumentId, setStartDocumentId] = useState("");
  const[reload,setReload] = useState(false);

  //----------------GETTING ASSIGNED TASKS-----------------//

  useEffect(() => {
    try {
      let userToken = localStorage.getItem("userToken");
      var userId = localStorage.getItem("user");
      console.log("local storage user id..", userId);
      const getTask = async () => {
        const response = await AxiosInstance({
          method: "get",
          url: `/tasks/${userId}/assigned`,
          data: {
            userid: userId,
          },
        }).then((task) => {
          console.log("assigned task data..", task);
          console.log("taskdata..", task.data.Task);
          setTask(task.data.Task);
        });
      };
      getTask();
    } catch (err) {
      alert("erorr", err);
    }
  }, [reload]);

  // -------------------SARTING TASK--------------------//

  const handleStart = async (docId) => {
    var userId = localStorage.getItem("user");
    console.log("document id..", docId);
    console.log("userId...", userId);

    const response = await AxiosInstance({
      method: "put",
      url: "/updateStatus",
      data: {
        taskId: docId,
        userId: userId,
        status: "started",
      },
    }).then((response) => {
      setReload(!reload)

      alert("started", response);
    });
  };
  // --------------------------------------------------------//

  return (
    <>
      <h1 className="assigned-heading">ASSIGNED TASKS</h1>
      <div className="finished-container">
        {task.map((obj, index) => {
          return (
            <div className="assingned-container">
              <div className="assigned-task-container">
                <h2 className="card-heading">{obj.taskname}</h2>
                <p className="card-paragraph">{obj.description}</p>
                <p>Task assigned date : {moment(obj.createdAt).format("dddd-MMM-DD")}</p>
                

                <h1 className="card-time">Allowcated time: {obj.time}hr</h1>
                <button
                  className="start-button"
                  onClick={() => handleStart(obj._id)}
                >
                  Startd
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AssignedCard;
