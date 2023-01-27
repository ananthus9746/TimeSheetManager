import React from 'react'
import {NavLink,NavNavLink} from 'react-router-dom'
import './SideBar.css'

export default function SideBar() {
  return (
    <div>
    <nav className='SideBar'>
        
    <NavLink to={'/admin/dashboard'} >
       <p className='selectedSection'> Home 1</p>
    </NavLink>

    <NavLink to={'/admin/users'} >
        users
    </NavLink>
    <NavLink to={'/admin/createUser'} >
        create users
    </NavLink>
    <NavLink to={'/admin/assignTask'} >
        Assign Task to users
    </NavLink>
    <NavLink to={'/admin/WeeklyReport'} >
       Weeky report
    </NavLink>

    <NavLink to={'/admin/MonthlyReport'} >
        Monthly report
    </NavLink>

    <NavLink to={'admin/logOut'} >
        LogOut
    </NavLink>

    </nav>
    </div>
  )
}
