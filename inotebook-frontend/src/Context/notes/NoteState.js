import React, {useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host="http://localhost:5000"
   const notesInitial=[]
    const [notes,setNotes] = useState(notesInitial)
    //fetch all notes
    const fetchNote=async()=>{
      let url=`${host}/api/notes/fetchnotes`
      const response= await fetch(url,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
        }
      });
      const json=await response.json()
      console.log(json)
      setNotes(json)
    }

    //ADD notes
    const addNote=async(title,description,tag)=>{
      let url=`${host}/api/notes/addnotes`
      const response= await fetch(url,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})

      });
        const note=await response.json();
          setNotes(notes.concat(note))
    }
    //Delete notes
    const deleteNote=async(id)=>{
      let url=`${host}/api/notes/deletenotes/${id}`
      const response= await fetch(url,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
        }
      });
      const json=await response.json()
      console.log(json)
      const newNote=notes.filter((note)=>{return note._id!==id})
      setNotes(newNote)

    }
    // Edit notes
    const editNote=async(id,title,description,tag)=>{
      //API Calls
      let url=`${host}/api/notes/updatenotes/${id}`
      const response= await fetch(url,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})

      });
      const json= await response.json();
      console.log(json)
      let newNotes=JSON.parse(JSON.stringify(notes))
      for(let i=0; i<notes.length;i++){
        const element=newNotes[i];
        if(element._id===id){
          newNotes[i].title=title;
          newNotes[i].description=description;
          newNotes[i].tag=tag;
          break;

        }

      }
       setNotes(newNotes)
    }

  
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,fetchNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;