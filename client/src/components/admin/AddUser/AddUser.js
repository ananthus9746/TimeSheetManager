import React, { useState, useEffect } from "react";
import "./AddUser.css";
import AdminAxiosInstance from "../../../AxiosInstance/AdminAxiosInstance";

function AddUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await AdminAxiosInstance({
      //change name to axios instance
      method: "post",
      url: "/admin/createUser",
      data: {
        userName,
        password,
        email,
      },
    }).then((response) => {
      alert("user added", response);
      setUserName("");
      setPassword("");
      setEmail("");
    });
  }

  return (
    <div className="add-user-container">
      <div className="add-user-cover">
        <h1 className="add-user-heading">ADD USER</h1>
        <input
          className="useraInput"
          value={userName}
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="username"
        />
        <input
          className="useraInput"
          value={password}
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <input
          className="useraInput"
          value={email}
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <button className="add-user" onClick={handleSubmit}>
          Add user
        </button>
      </div>
    </div>
  );
}

export default AddUser;
