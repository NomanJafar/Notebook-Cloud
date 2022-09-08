import React,{useState} from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {

  const handlerLogout=()=>{
    localStorage.removeItem("token");

  }
  return (
 <>
    <nav className="navbar navbar-expand-lg bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand text-light" to="/home">NotebookCloud</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active text-light" aria-current="page" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/about">About</Link>
          </li>

        </ul>


          {localStorage.getItem("token") ? <div>  <a className="btn  text-light mx-1" href="/login" onClick={handlerLogout}> Logout</a> </div>: <div> <Link className="btn  text-light mx-1" to="/login">Login</Link>
          <Link className="btn  text-light mx-1" to="/signup" >Signup</Link> </div>}
          
      </div>
    </div>
  </nav>
  </>
  )
}

export default Navbar