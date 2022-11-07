import React, { useState } from "react"
import axios from "axios"
import NoteContext from "./NoteContext"

const NoteState = (props) => {
  const host = `http://localhost:${process.env.REACT_APP_API_PORT}`;
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);



  /*-------------------------------------------Get all notes--------------------------------------*/
  const getNotes = async () => {
    let options={
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    }
    axios.get(`${host}/api/notes/fetchallnotes`,options).then((res)=>setNotes(res.data))
    .catch((err)=>console.log(err))
  }



  /*---------------------------------------------Add a note---------------------------------------*/
  const addNote = async (title, description, ufile) => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    (ufile!=="")&&formData.append("ufile", ufile, ufile.name);
    let options={
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    }
    try {
      let response= await axios.post(`${host}/api/notes/addnote`,formData, options )
      console.log(response)
      
    } catch (error) {
      console.log(error)
    }
  }



  /*--------------------------------------- Delete a note--------------------------------------*/

  const deleteNote = async (id) => {
    let options={
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    }
    try {
      let response= await axios.delete(`${host}/api/notes/deletenote/${id}`, options )
      console.log(response)
      
    } catch (error) {
      console.log(error)
    }
    
  }

  /*--------------------------------------- Edit a note--------------------------------------*/
  const editNote = async (id, title, description,ufile) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if(ufile!==""){
      if(ufile.data===undefined){
      formData.append("ufile", ufile, ufile.name)
      formData.append("old",false)
      }
      else{
        formData.append("old",true)
      }
    }else{
      formData.append("old",false)
    }
    let options={
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    }
    try {
      let response= await axios.put(`${host}/api/notes/updatenote/${id}`,formData, options )
      console.log(response)
      
    } catch (error) {
      console.log(error)
    }
  }

  /*--------------------------------------- Background options--------------------------------------*/

  const updateBack = async (id, backgroundColor) => {
    try {
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