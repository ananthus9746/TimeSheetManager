import React, { useEffect,useState } from "react";
import "./ViewUsers.css";
import { ViewAllUsers } from "../../Api/AdminAPI/AdminAPI";

function ViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      let users = ViewAllUsers().then((data) => {
        console.log(data.data.user);
        let usersdata = data.data.user;
        setUsers(usersdata);
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
  },[]);

  return (
    <div className="user-table-container">
      <table id="customers">
        <tr>
          <th>Username</th>
          <th>Password</th>
          {/* <th>Created Date</th> */}
        </tr>
        {users?.map((obj) => {
          return (
            <tr>
              <td>{obj.username}</td>
              <td>{obj.password}</td>
              {/* <td>{obj.createdAt}</td> */}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ViewUsers;
