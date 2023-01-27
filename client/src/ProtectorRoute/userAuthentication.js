
import React from 'react'
import { json, Navigate, Outlet } from 'react-router-dom'

const UserAuthentication=()=>
{
const user=localStorage.getItem('userToken');
return user?<Outlet/>:<Navigate to='/login'/>

}

export default UserAuthentication


