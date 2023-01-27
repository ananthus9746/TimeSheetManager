import React,{useState,useEffect} from 'react'
import './AddUser.css'
import AxiosInstance from '../../../AxiosInstance/AxiosInstance'





function AddUser() {

  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')


  async function  handleSubmit(e){
    e.preventDefault()

    const response = await AxiosInstance({//change name to axios instance
      method:"post",
      url:"/admin/createUser",
      data:{
        userName,
        password,
        email
      }
    }).then((response)=>{
      alert("user added",response)
    })
  }



  return (
    <div>
      <h1>ADD USER</h1>
      <input type="text"  onChange={(e)=>{setUserName(e.target.value)}} placeholder='username'/>
      <input type="text"  onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'/>
      <input type="email"  onChange={(e)=>{setEmail(e.target.value)}} placeholder='email'/>
      <button className='add-user'  onClick={handleSubmit}>ADD USER</button>
    </div>

  )
}

export default AddUser