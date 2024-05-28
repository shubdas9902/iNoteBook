import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './addNote'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
  const context = useContext(noteContext)
  let navigate=useNavigate();
  const { notes, fetchNote ,editNote} = context
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNote()
    }
    else{
          navigate('/login')
    }
    
  }, [])

  const ref = useRef(null)
  const refClose=useRef(null)

  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} minLength={3} required aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={3} required onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<3 || note.edescription.length<3} type="button" onClick={handleClick} className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <h2>Your Notes</h2>
        <div className='container mx-2 fw-bolder'>
        {notes.length===0 && 'No notes to display'}
        </div>
        {
          notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} />
          })
        }
      </div>
    </>
  )
}

export default Notes