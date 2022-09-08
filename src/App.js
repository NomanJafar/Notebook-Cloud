import React,{useState} from "react";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NotesState from "./context/notes/NotesState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CredentialsState from "./context/notes/CredentialsState";




function App() {
// show alerts

  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
      setAlert({
        message: message,
        type: type,
      });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
  }














  return (

    <>
      <CredentialsState>
        <NotesState>



          <BrowserRouter>
            <Navbar />
          
            <Routes>
              
              <Route exact path="/about" element={<About />} > </Route>
              <Route exact path="/" element={<Home />} > </Route>
              <Route exact path="/signup" element={<Signup />} > </Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />} > </Route>
              <Route exact path="/home" element={<Home />} > </Route>

            </Routes>

          </BrowserRouter>
        </NotesState>
      </CredentialsState>
    </>
  );
}

export default App;
