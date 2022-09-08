import React, { useState, useContext } from 'react'
import {useNavigate } from 'react-router-dom'
import CredentialsContext from '../context/notes/CredentialsContext'
import "./Signup.css"

const Signup = () => {

    const history = useNavigate();
    const { signupUser} = useContext(CredentialsContext)
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")



    const handleSignup=()=>{       
         signupUser(username,email,password);
         if(localStorage.getItem("token")){
            history("/home");
         }
       
    }

    
    const onChange = (e) => {
        if (e.target.name === "username") setUsername(e.target.value);
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
                <h3>Signup</h3>

                <label htmlFor="username">Username</label>
                <input type="text" placeholder="UserName" id="username" name='username' onChange={onChange} required />

                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email" name='email' onChange={onChange} required />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Create a strong Password" id="password" name='password' onChange={onChange} required />
                
                <button onClick={handleSignup} >Signup</button>
             
            </div>
        </div>
    )
}

export default Signup
