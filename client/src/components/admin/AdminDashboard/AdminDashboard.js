import React,{useState,useEffect} from "react";
import "./AdminDashboard.css";
import Chart from "../Chart/Chart";
import AxiosInstance from '../../../AxiosInstance/AxiosInstance'

function AdminDashboard() {

  const [conts, setCounts] = useState([]);


  useEffect(() => {
    try {
      const getCounts= async () => {
        const response = await AxiosInstance({
          method: "get",
          url: `admin/dashboard`,
        }).then((res) => {
          console.log(" data..", res);
          console.log("dashboard data..", res.data.statistics);
          setCounts( res.data.statistics);
        });
      };
      getCounts();
    } catch (err) {
      alert("erorr", err);
    }
  }, []);


   const data = {
    labels: ['Users', 'Started', 'Completed', 'Pending',],
    datasets: [
      {
        label: 'Task',
        data: [conts.totalUsers, conts.totalStarted, conts.totalCompleted, conts.totalTask,],
        backgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(75, 192, 192, 0.3)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  console.log("pai..data",data)


  return (
    <div className="dashboard-container">
      <div className="users-and-graph-cover">
        
        <div className="taskCover">
            <div className="taskCountAdmin">
              <p> Total users</p>
              <p>{conts.totalUsers}</p>
            </div>

            <div className="taskCountAdmin">
              <p>Total started</p>
              <p>{conts.totalStarted}</p>
            </div>

            <div className="taskCountAdmin">
              <p> Total complete</p>
              <p>{conts.totalCompleted}</p>
            </div>

            <div className="taskCountAdmin">
              <p>Pending task</p>
              <p>{conts.totalTask}</p>
            </div>

        </div>

        <Chart data={data}/>
      </div>
    </div>
  );
}

export default AdminDashboard;
