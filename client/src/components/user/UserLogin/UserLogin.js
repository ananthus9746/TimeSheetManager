import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserLogin.css";
import AxiosInstance from "../../../AxiosInstance/AxiosInstance";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await AxiosInstance({
        method: "post",
        url: "/login",
        data: {
          email,
          password,
        },
      }).then((response) => {
        console.log("res..", response);
        alert("Access granded");

        var decoded = jwt_decode(response.data.UserToken);
        console.log("decode..", decoded);

        alert(response.data.UserToken)
        console.log(response.data);
        localStorage.setItem("mytime", Date.now());
        localStorage.setItem('userToken', response.data.UserToken);
        localStorage.setItem("user", response.data.userId);

        Navigate("/");
      });
    } 
    
    catch (err) {
      alert(err);
    }
  }

  return (
    <div className="loginPage">
      <div className="login-page-container">
        <div className="login-form">
          <h1 className="user-login-text">User Login</h1>
          <form action="">
            <input
              className="user-login-input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="email"
            />
            <input
              className="user-login-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="password"
            />
            <button className="user-login-button" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
