import React, { useEffect,useState } from "react";
import "./ViewUsers.css";
import { ViewAllUsers } from "../../Api/AdminAPI/AdminAPI";
import moment from 'moment';



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
        alert(error)
    }
  },[]);

  return (
    <div className="user-table-container">
      <table id="customers">
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>email</th>
          <th>Created</th>
        </tr>
        {users?.map((obj) => {
          return (
            <tr>
              <td>{obj.username}</td>
              <td>{obj.password}</td>
              <td>{obj.email}</td>
              <td>{moment(obj.createdAt).format("dddd, MMM DD at HH:mm a")}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ViewUsers;
