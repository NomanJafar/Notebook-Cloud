import React, { useState, useContext } from 'react'
import {useNavigate } from 'react-router-dom'
import CredentialsContext from '../context/notes/CredentialsContext'
import "./Login.css"
const Login = (props) => {
  const { loginUser} = useContext(CredentialsContext)

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")


  const handleLogin = () => {
   loginUser(email, password);

   setTimeout(() => {
    if (localStorage.getItem("token")) {
       navigate("/home");
      // props.showAlert("Logged In successfully","success");
    }
    else{
      console.log("cant logged in");
    }

    
   }, 5000); 
   

  }

  const onChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);


  }




  return (


    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className='form'>
        <h3>Login</h3>

        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Email" id="email" name='email' onChange={onChange} required />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter your Password" id="password" name='password' onChange={onChange} required />

        <button onClick={handleLogin} >Login</button>

      </div>
    </div>

































  )
}

export default Login
