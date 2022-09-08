import React, { useState } from "react";
import NotesContext from "./NotesContext"

const NotesState = (props) => {

  //

  const host = "http://localhost:3001";
  const UserAuthToken=localStorage.getItem("token");


  
  const [notes, setNotes] = useState([]);

  // GET All notes
  const getNotes = async () => {
    console.log("enter the get notes function")
    //API call
    if(UserAuthToken!==undefined){
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.


        headers: {
          'Content-Type': 'application/json',
          // 'Accept': '*/*',
          'authToken':UserAuthToken,
          // 'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmN2E1N2Y4MjAwODU5ZWNjOTkwMTRkIn0sImlhdCI6MTY2MDM5NjkyN30.vVU0EEpqFICwm3MYqiTU7f9vSyYYPXNdoX4tdsJxG-s'

        },


      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      // updating notes state
      const results = await response.json();
      console.log(results);
      setNotes(results);


    }
  

    catch (error) {
      console.log(error);
    }
  }
  else console.log("Use a Valid Auth Token");

  }

  // ADD A New note to server
  const addNote = async (title, description, tag) => {
    const note = {
      title: title,
      description: description,
      tag: tag
    }


    //API call
    try {
      const response = await fetch(`${host}/api/notes/createnote`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.


        headers: {
          'Content-Type': 'application/json',
          // 'Accept': '*/*',
          'authToken':UserAuthToken,
          // 'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmN2E1N2Y4MjAwODU5ZWNjOTkwMTRkIn0sImlhdCI6MTY2MDM5NjkyN30.vVU0EEpqFICwm3MYqiTU7f9vSyYYPXNdoX4tdsJxG-s'

        },
        body: JSON.stringify({ title, description, tag }),


      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      // updating notes state
      else {
        const results = await response.json();
        console.log(results);
        setNotes(notes.concat(results));
      }


    }

    catch (error) {
      console.log(error);
    }



  }


  const deleteNote = async (id) => {
    console.log("delete", id);
    setNotes(notes.filter(Element => Element._id !== id));
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // 'Accept': '*/*',
          'authToken':UserAuthToken,
          // 'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmN2E1N2Y4MjAwODU5ZWNjOTkwMTRkIn0sImlhdCI6MTY2MDM5NjkyN30.vVU0EEpqFICwm3MYqiTU7f9vSyYYPXNdoX4tdsJxG-s'

        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      // updating notes state
      else{
        setNotes(notes.filter(Element => Element._id !== id));
        const results = await response.json();
        console.log(results); 
      }
    }
    catch (error) {
      console.log(error);
    }
  }




// UPDATE NOTE
const editNote= async (id,title, description,tag)=>{
        console.log("to be edited",id, title, description, tag);
        // 
        try {
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              // 'Accept': '*/*',
              'authToken':UserAuthToken,
              // 'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmN2E1N2Y4MjAwODU5ZWNjOTkwMTRkIn0sImlhdCI6MTY2MDM5NjkyN30.vVU0EEpqFICwm3MYqiTU7f9vSyYYPXNdoX4tdsJxG-s'
    
            },
            body: JSON.stringify({ title, description, tag }),

          });
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
          // updating notes state
          else{
            
            const results = await response.json();
            getNotes();
           
          }
        }
        catch (error) {
          console.log(error);
        }
        

}




  return (
    <NotesContext.Provider value={{ notes, getNotes, addNote, deleteNote,editNote }}>
      {props.children}
    </NotesContext.Provider>

  )
}
export default NotesState;