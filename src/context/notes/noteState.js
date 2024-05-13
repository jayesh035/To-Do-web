import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  // const s1={
  //     "name":"harry",
  //     "class":"5b"
  // }

  // const [state,setState]=useState(s1);
  const [notes, setNotes] = useState(notesInitial);
  // Get note
  const getNote =async (title, description, tag,id) => {
    
    //API Call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });
    const json=await response.json();
    // console.log(json)
    setNotes(json);

  };
  
  // Add note
  const addNote =async (title, description, tag,id) => {
    
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },

      body: JSON.stringify({title,description,tag})
    });
    const json =await response.json();
    console.log(json);
    const note = json;
    setNotes(notes.concat(note));
  };
  // delete note
  const deleteNote = async(id) => {
       //API Call
       const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
  
  
      });
      const json=await response.json();
      console.log(json)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    // alert("deleting Node whith id "+id);
    setNotes(newNotes);
  };
  //Edit note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

      body: JSON.stringify({title,description,tag})
    });
    const json =await response.json();
    console.log(json);
    // const json = response.json();

    //Logic to add in client
let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        setNotes(newNotes);
        break;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
