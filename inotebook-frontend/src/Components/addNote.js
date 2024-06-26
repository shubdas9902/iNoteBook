import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext'

const AddNote = () => {
    const context= useContext(noteContext)
    const {addNote}=context
    
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
         e.preventDefault();
           addNote(note.title,note.description,note.tag)
           setNote({title:"",description:"",tag:""})
    }
    const onChange=(e)=>{
       setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div className='container my-3'>
      <h2>Add Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" minLength={3} required onChange={onChange}/>

        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">description</label>
          <input type="text" className="form-control" id="description"  name="description" value={note.description} minLength={3} required onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">tag</label>
          <input type="text" className="form-control" id="tag"  name="tag" value={note.tag} onChange={onChange}/>
        </div>
    
        <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
      </div>
  )
}

export default AddNote