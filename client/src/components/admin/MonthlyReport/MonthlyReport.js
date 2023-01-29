import React,{useState,useEffect} from 'react'
import AxiosInstance from '../../../AxiosInstance/AxiosInstance'

function MonthlyReport() {

 
const [month,setMonth]=useState([])

  useEffect(() => {
    try {
      const getCounts= async () => {
        const response = await AxiosInstance({
          method: "get",
          url: `admin/MonthlyReport`,
        }).then((res) => {
          setMonth(res)
          
          console.log(" MonthlyReport..", res.data.monthly);
          setMonth(res.data.monthly)
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
        <th>Total task completed</th>
        <th>Total Hr in month</th>
      </tr>
            {
              month.map((obj)=>{
                return(
                  <tr>
                  <td>{obj._id.date}</td>
                  <td>{obj._id.username}</td>
                  <td>{obj.totalTaskDoneInMonth}</td>
                  <td>{obj.totaHrsInMonth}</td>
                </tr>
                )
              })
            }
    </table>
  </div>
  )
}

export default MonthlyReport