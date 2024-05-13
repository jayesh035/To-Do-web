import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";


const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote,editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const history=useHistory();
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"})
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      

      getNote();
    }
    else{
      history.push("/login");
      
    }
// eslint-disable-next-line
  }, []);
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
   
  };

  const handleClick=(e)=>
  {
    // console.log("hii")
    editNote(note.id,note.etitle,note.edescription,note.etag)
    props.showAlert("Updated Successfully","success");
    refClose.current.click();
     
  }
  const onChange=(e)=>
  {
    setNote({...note,[e.target.name]:e.target.value})

  }
  const flg="true"
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        type="button"
        hidden={flg}
        ref={ref}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Enter Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>

           
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                ref={refClose}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-outline-success" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note}  showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
