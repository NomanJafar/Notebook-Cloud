import React,{useContext} from 'react'
import NotesContext from '../context/notes/NotesContext'


const About = () => {
  const person = useContext(NotesContext);
  
  
  return (
    <NotesContext.Consumer>
          {()=><div>This is about {person.name}</div>}
          </NotesContext.Consumer>

  )
}

export default About