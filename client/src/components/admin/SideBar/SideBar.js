import React from 'react'
import {NavLink,NavNavLink} from 'react-router-dom'
import './SideBar.css'

export default function SideBar() {
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

    <NavLink to={'admin/logOut'} >
    <p className='selectedSection'>Logout</p>

    </NavLink>

    </nav>
    </div>
  )
}
