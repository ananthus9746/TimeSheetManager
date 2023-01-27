import {Link,NavLink, Outlet,useNavigate} from 'react-router-dom' 
import React, { useState, useEffect } from 'react'
import './Header.css'



function Header() {

  // const Navigate = useNavigate()

  // useEffect(()=>{
  //     if(localStorage.getItem('userToken')){
  //       Navigate('/')


  //     }else {

  //       Navigate('/login')
  //     }
  // },[])


  return (
    <div>
      <header className='header'>
        <div className="nav-container">
          <nav className="nav-bar">
            

            <NavLink to="/dashboard">
            <p className='navlinks'>Home</p>
             </NavLink>

            <NavLink to={'/started'}>
              <p className='navlinks'>Started</p>
            </NavLink>
            <NavLink to={'/finished'}>
              <p className='navlinks'>Finished</p>
            </NavLink>
           
          
            </nav>
        </div>
        </header>

        <Outlet></Outlet>
   </div>
  )
}

export default Header