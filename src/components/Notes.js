import React, { useContext, useEffect } from "react";
import NotesContext from "../context/notes/NotesContext";
import NotesItem from "./NotesItem";

const Notes = () => {
    const { notes, getNotes } = useContext(NotesContext);

    useEffect(() => {
        getNotes();
        //react-hooks/exhaustive-deps
    }, [])

    



    return (
        <div className="container my-4">
            <div className="row">

                {notes.map((element) => {
                    return (
                        <div className="col-md-3" key={element._id}>
                            <NotesItem title={element.title} description={element.description} id={element._id} tag={element.tag} />
                        </div>


                    );
                })}

            </div>
        </div>
    );
};
export default Notes;
