import React from 'react'
import {NavLink,NavNavLink,useNavigate} from 'react-router-dom'
import './SideBar.css'
import Swal from "sweetalert2";


export default function SideBar() {


  const Navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to logout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7b25b8",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, continue!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("Admintoken");
          Navigate("/admin-login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
    <nav className='SideBar'>
        
    <NavLink to={'/admin/dashboard'} >
       <p className='selectedSection'>Admin Dashboard</p>
    </NavLink>

    <NavLink to={'/admin/users'} >
    <p className='selectedSection'> View users</p>

    </NavLink>
    <NavLink to={'/admin/createUser'} >
    <p className='selectedSection'> Create users</p>

    </NavLink>
    <NavLink to={'/admin/assignTask'} >
    <p className='selectedSection'>Assign Task </p>

    </NavLink>
    <NavLink to={'/admin/WeeklyReport'} >
    <p className='selectedSection'>Weakly report</p>

    </NavLink>

    <NavLink to={'/admin/MonthlyReport'} >
    <p className='selectedSection'>Monthly report</p>

    </NavLink>

    <p onClick={handleLogout}  className='selectedSection'>Logout</p>


    </nav>
    </div>
  )
}
