import React, { useState } from "react";
import CredentialsContext from "./CredentialsContext";


const CredentialsState = (props) => {

  let loginStatus =false;
  const host = "http://localhost:3001";
const [loggedIn, setLoggedin] = useState(false)



// LOGIN USER API REQUEST
  const loginUser = async (email, password) => {
    console.log(email, password)
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          // 'Accept': '*/*',
          // 'authToken':UserAuthToken,
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      // updating notes state
      if(response.ok) {
        loginStatus=true;
        const token = await response.json();
        localStorage.setItem("token",token.authToken)
       
        console.log("from login",token);
       
       
         
         
       
      }
    } catch (error) {
      console.log(error);
    }
  };


  // SIGNUP USER API REQUEST
  const signupUser = async (name ,email, password) => {
    console.log(name,email, password)
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          // 'Accept': '*/*',
          // 'authToken':UserAuthToken,
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      // updating notes state
      if(response.ok) {
        const token = await response.json();
        localStorage.setItem("token",token.authToken)
        setLoggedin(true);
        console.log(token);
      }
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <CredentialsContext.Provider value={{loginUser, loggedIn,signupUser, loginStatus}}>
      {props.children}
    </CredentialsContext.Provider>
  );
};
export default CredentialsState;
