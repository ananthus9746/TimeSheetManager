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

        <Chart />
      </div>
    </div>
  );
}

export default AdminDashboard;
