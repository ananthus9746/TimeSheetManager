import React,{useState,useEffect} from 'react'
// import AxiosInstance from '../../../AxiosInstance/AxiosInstance'
import AdminAxiosInstance from '../../../AxiosInstance/AdminAxiosInstance'


function WeeklyReport() {
  const [week,setWeek]=useState([])

  useEffect(() => {
    try {
      const getCounts= async () => {
        const response = await AdminAxiosInstance({
          method: "get",
          url: `admin/WeeklyReport`,
        }).then((res) => {
          setWeek(res)
          
          console.log(" WeeklyReport..", res.data.weeklyReport);
           setWeek(res.data.weeklyReport)
        });
      };
      getCounts();
    } catch (err) {
      alert("erorr", err);
    }
  },[]);


  return (
    <div className="user-table-container">
    <table id="customers">
      <tr>
        <th>Date</th>
        <th>Username</th>
        <th>Total task completed in 1 week</th>
        <th>Total Hr in week</th>
      </tr>
            {
              week.map((obj)=>{
                return(
                  <tr>
                  <td>{obj._id.date}</td>
                  <td>{obj._id.username}</td>
                  <td>{obj.totalTaskDoneInWeek}</td>
                  <td>{obj.totaHrsInWeek}</td>
                </tr>
                )
              })
            }
    </table>
  </div>
  )
}

export default WeeklyReport