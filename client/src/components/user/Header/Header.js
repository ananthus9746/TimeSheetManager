import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import logo from '../../../images/moonhive vector (2).png'; // with import



import "./Header.css";

function Header() {
  const Navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to logout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#912099",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, continue!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("user");
          Navigate("/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header className="header">
      <img className="logo-image" src={logo} />

        <nav className="nav-bar">
          <NavLink to="/dashboard">
            <p className="navlinks">Home</p>
          </NavLink>

          <NavLink to={"/started"}>
            <p className="navlinks">Started</p>
          </NavLink>

          <NavLink to={"/finished"}>
            <p className="navlinks">Finished</p>
          </NavLink>

          <p onClick={handleLogout} className="navlinks">
            Logout
          </p>
        </nav>
      </header>

      <Outlet></Outlet>
    </div>
  );
}

export default Header;
