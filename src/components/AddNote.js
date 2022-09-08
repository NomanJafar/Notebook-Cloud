import React, { useContext,  useState } from "react";
import NotesContext from "../context/notes/NotesContext";

export const AddNote = () => {
    const { addNote } = useContext(NotesContext);
    
    const [title, settitle] = useState("")
    const [description, setDescription] = useState("")
    const [tag, setTag] = useState("")

    const handleClick = () => {
   
        addNote(title,description,tag);

    }


    const onChange = (e) => {
      if(e.target.name==="title") settitle(e.target.value);
      if(e.target.name==="description") setDescription(e.target.value);
      if(e.target.name==="tag") setTag(e.target.value);


    }
    return (
        <div className="container">
            <div className="container my-2 d-flex flex-column">

                <input className=" my-2" type="text" placeholder="Title" onChange={onChange} id="title" name="title" aria-label=".form-control-lg example" />
                <input className=" my-2" type="text" placeholder="Tag" onChange={onChange} id="tag" name="tag" aria-label=".form-control-lg example" />
                <textarea className="Note my-2" placeholder="Description" onChange={onChange} id="description" name="description" cols="100" rows="3"></textarea>



            </div>
            <button type="button" className="btn btn-dark" onClick={handleClick}>Add <i className="fa-solid fa-address-book"></i></button>
        </div>

    )
}
