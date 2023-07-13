import React, { useState } from "react"
import axios from "axios"
import NoteContext from "./NoteContext"

const NoteState = (props) => {
  const host = process.env.REACT_APP_API;
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);



  /*-------------------------------------------Get all notes--------------------------------------*/
  const getNotes = async () => {
    let options = {
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    }
    axios.get(`${host}/api/notes/fetchallnotes`, options).then((res) => setNotes(res.data))
      .catch((err) => console.log(err))
      console.log(notes);
  }



  /*---------------------------------------------Add a note---------------------------------------*/
  const addNote = async (note) => {

    let options = {
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    }
    try {
      let response = await axios.post(`${host}/api/notes/addnote`, { "title": note.title, "description":note.description }, options)
      console.log(response)
      setNotes(notes.concat(note))
    } catch (error) {
      console.log(error)
    }
  }



  /*--------------------------------------- Delete a note--------------------------------------*/

  const deleteNote = async (id) => {
    let options = {
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    }
    try {
      let response = await axios.delete(`${host}/api/notes/deletenote/${id}`, options)
      console.log(response)
      const updatedNotes = notes.filter((note) => { return note._id !== id })
      setNotes(updatedNotes)
    } catch (error) {
      console.log(error)
    }
    
  }

  /*--------------------------------------- Edit a note--------------------------------------*/
  const editNote = async (id, title, description) => {
   
    let options = {
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    }
    try {
      let response = await axios.put(`${host}/api/notes/updatenote/${id}`, { "title": title, "description": description }, options)
      console.log(response)
      for(let i=0; i<notes.length; ++i){
          let element=notes[i]
          if(element._id===id){
            element.title=title
            element.description=description
          }
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*---------------------------------------Background options--------------------------------------*/

  const updateBack = async (id, backgroundColor) => {
    try {
      for (let i = 0; i < notes.length; ++i) {
        let element = notes[i]
        if (element._id === id) {
          element.backgroundColor = backgroundColor;
        }
      }
      const response = await fetch(`${host}/api/notes/updateBackground/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ backgroundColor })
      });
      
    } catch (error) {
      console.log(error)
    }

  }


  /*--------------------------------------- Account details--------------------------------------*/
  const [account, setAccount] = useState({ name: '', email: '' });
  const getAccount = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();

      setAccount({ name: json.name, email: json.email });

    } catch (error) {
      console.log(error)
    }

  }



  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote, getAccount, account, updateBack }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState