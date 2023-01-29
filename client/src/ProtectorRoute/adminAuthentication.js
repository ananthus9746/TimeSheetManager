
import React from 'react'
import { json, Navigate, Outlet } from 'react-router-dom'

const AdminAuthentication=()=>
{
const admin=localStorage.getItem('Admintoken');
return admin?<Outlet/>:<Navigate to='/admin-login'/>

}

export default AdminAuthentication


