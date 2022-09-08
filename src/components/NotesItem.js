import React, { useContext, useState } from 'react'
import NotesContext from "../context/notes/NotesContext";
import EditNote from './EditNote';
const NotesItem = (props) => {
  const { deleteNote } = useContext(NotesContext);
  const [EditNotetrigger, setEditNoteTrigger] = useState(false)

  const toggleTrigger = (bul) => {
    console.log(bul)
    setEditNoteTrigger(bul);
    console.log(EditNotetrigger);

  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(props.id) }}></i>
        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { toggleTrigger(true) }} ></i>
        <p className="card-text">{props.tag}</p>
        <p className="card-text">{props.description}</p>


      </div>
        <EditNote noteid={props.id} trigger={EditNotetrigger} toggleTrigger={toggleTrigger} 
        id={props.id} description={props.description}  title={props.title} tag={props.tag} />
    </div>
  )
}

export default NotesItem