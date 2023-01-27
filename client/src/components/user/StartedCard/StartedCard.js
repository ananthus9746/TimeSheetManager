import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

import AxiosInstance from "../../../AxiosInstance/AxiosInstance";
import "./StartedCard.css";

function StartedCard() {
  const [task, setTask] = useState([]);
  const [starTaskId, setStartTask] = useState("");
  const [startDocumentId, setStartDocumentId] = useState("");

  //--------------------GETTING STARTED TASKS----------------------//
  useEffect(() => {
    try {
      let userToken = localStorage.getItem("userToken");
      var userId = localStorage.getItem("user");
      console.log("local storage user id..", userId);
      const getTask = async () => {
        const response = await AxiosInstance({
          method: "get",
          url: `/tasks/${userId}/started`,
          data: {
            userid: userId,
          },
        }).then((task) => {
          console.log("started task data..", task);
          console.log("started task data..", task.data.Task);
          setTask(task.data.Task);
        });
      };
      getTask();
    } catch (err) {
      alert("erorr", err);
    }
  }, []);
  // ---------------------------COMPLETING TASK-------------------//

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
        status: "completed",
      },
    }).then((response) => {
      alert("completed", response);
    });
  };

  return (
    <div>
      <h1 className="assigned-heading">STARTED TASKS</h1>

      <div className="finished-container">
        {task.map((obj, index) => {
          return (
            <div className="started-task-container">
              <h2 className="card-heading">{obj.taskname}</h2>
              <p className="card-paragraph">{obj.description}</p>
              <h1 className="card-time">Allowcated time: {obj.time}hr</h1>
              <p>
                Time left:
                <Countdown
                  date={new Date(obj.started).getTime() + obj.time * 3600000}
                />
              </p>
              <button
                className="start-button"
                onClick={() => handleStart(obj._id)}
              >
                Completed
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StartedCard;
