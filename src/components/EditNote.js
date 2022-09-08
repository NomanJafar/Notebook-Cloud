import React, {useContext, useState} from 'react'
import NotesContext from "../context/notes/NotesContext";
import "./EditNote.css"



function EditNote(props) {

    const {editNote} = useContext(NotesContext);
    const [title, settitle] = useState(props.title)
    const [description, setDescription] = useState(props.Description)
    const [tag, setTag] = useState(props.tag)

  
    const Change = (e) => {
        if(e.target.name==="title") settitle(e.target.value);
        if(e.target.name==="description") setDescription(e.target.value);
        if(e.target.name==="tag") setTag(e.target.value);
  
  
      }

    const handleClick=()=>{
        editNote(props.id,title, description,tag);
        props.toggleTrigger(false)
    }

    return (

        props.trigger ? <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={() => {props.toggleTrigger(false)}}>x</span>
                <div className="container">
                    <div className="container my-2 d-flex flex-column">

                        <input className=" my-2" type="text" value={title} onChange={Change} id="title" name="title" aria-label=".form-control-lg example" />
                        <input className=" my-2" type="text" value={tag} onChange={Change} id="tag" name="tag" aria-label=".form-control-lg example" />
                        <textarea className="Note my-2" value={description} onChange={Change} id="description" name="description" cols="100" rows="3"></textarea>

                    </div>
                    <button type="button" className="btn btn-dark" onClick={handleClick}>Update <i className="fa-solid fa-address-book"></i></button>
                </div>
            </div>
        </div> : ""
    )
}

export default EditNote
