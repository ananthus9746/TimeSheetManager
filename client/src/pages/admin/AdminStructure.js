import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/admin/SideBar/SideBar'
import './adminDashboard.css'
function AdminStructure() {
  return (
    <div className='admin-dashboard'>
        <SideBar/>
        <Outlet></Outlet>
    </div>
  )
}

export default AdminStructure