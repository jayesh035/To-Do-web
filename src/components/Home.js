import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes'

function Home(props) {
 
  return (
    <div>
    
<Notes showAlert={props.showAlert}/>

    </div>
  )
}

export default Home
