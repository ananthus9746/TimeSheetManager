import React, { useState, useEffect } from "react";
import AdminAxiosInstance from "../../../AxiosInstance/AdminAxiosInstance";

import jwt_decode from "jwt-decode";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const Navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await AdminAxiosInstance({
      method: "post",
      url: "/admin/login",
      data: {
        userName,
        password,
      },
    }).then((response) => {
      console.log("res from admin login..", response);
      alert(response.data.Admintoken);
      var decoded = jwt_decode(response.data.Admintoken);
      console.log("decode..", decoded);
      localStorage.setItem("Admintoken", response.data.Admintoken);

      Navigate("/admin/dashboard");
    });
  }

  return (
    <div className="admin-login-contianer">
      <div className="admin-login-cover">
        <h1 className="admin-login0heading">Admin login</h1>
        <form className="admin-login-form" action="">
          <input
            className="admin-login-input"
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="username"
          />
          <input
            className="admin-login-input"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="admin-login-button" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
