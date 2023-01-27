import React,{useState,useEffect} from 'react'
import AxiosInstance from '../../../AxiosInstance/AxiosInstance'
import jwt_decode from "jwt-decode";



function AdminLogin() {

  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')

  async function  handleSubmit(e){
    e.preventDefault()

    const response = await AxiosInstance({
      method:"post",
      url:"/admin/login",
      data:{
        userName,
        password
      }
    }).then((response)=>{
      console.log("res from admin login..",response)
      alert(response.data.Admintoken)

      var decoded = jwt_decode(response.data.Admintoken);
      console.log("decode..",decoded);


      localStorage.setItem('Admintoken' , response.data.Admintoken)

    })

  }




  return (
    <div>
      <h1>Admin login page</h1>
      <form action="">
        <input type="text"  onChange={(e)=>{setUserName(e.target.value)}} name="" id=""  placeholder='username'/>
        <input type="password"  onChange={(e)=>{setPassword(e.target.value)}} name="" id="" />
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  )
}

export default AdminLogin