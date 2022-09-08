import React from 'react'
import { AddNote} from './AddNote'
import Notes from './Notes'

const Home = () => {


  


  return (
    (localStorage.getItem("token")? <div className='container'>
    <h4  className='my-3'>Add A Note</h4>
      <AddNote/>
      <Notes/>

  </div> : <div className='container my-3'>
    <h3>Please Login to create and manage your notes</h3>
  </div>)
   
  )
}

export default Home
