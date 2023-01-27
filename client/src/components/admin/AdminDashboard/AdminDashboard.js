import React from "react";
import "./AdminDashboard.css";
import Chart from '../Chart/Chart'

function AdminDashboard() {
  return (
    <div>
      <div className="taskCover">
        <div className="taskCountContainer">

          <div className="taskCountAdmin">
            <p> Total users</p>
            <p>29</p>
          </div>

          <div className="taskCountAdmin">
            <p> Total started</p>
            <p>9</p>
          </div>

          <div className="taskCountAdmin">
            <p> Total complete</p>
            <p>54</p>
          </div>

        </div>
      </div>


      <h1>Graph</h1>

      <Chart/>
      
    </div>
  );
}

export default AdminDashboard;
