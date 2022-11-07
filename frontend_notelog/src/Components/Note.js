
import React,{useContext,useState} from 'react'
import NoteContext from '../Context/NoteContext'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './Note.css';
import Linkify from 'react-linkify'

const Note = (props) => {
    const contextNote=useContext(NoteContext);
    const {deleteNote,updateBack}=contextNote;
    const {note,edit, showAlert}=props
    const [display,setDisplay]=useState("none")
    
   
    const red="rgb(231, 136, 136)";
    const green="rgb(136, 231, 157)";
    const yellow="rgb(231, 215, 136)";
    const lightblue="rgb(136, 223, 231)";
    const blue="rgb(148, 151, 231)";
    const pink="rgb(230, 163, 239)";
    const none=null;


    const del=(e)=>{
        deleteNote(note._id);
        showAlert("Note deleted successfully","success")
    }
    const handleedit=(e)=>{
        edit(note);
    }
    const show=()=>{
        if(display==="none"){
            setDisplay("block")
        }
        else{
            setDisplay("none")
        }
        
    }
    const showoff=(backcolor)=>{
        setDisplay("none");
        updateBack(note._id,backcolor);
    }
    


    return (
        <>
            <div className="card mx-auto my-3" style={{backgroundColor:note.backgroundColor}}>
                <div className="card-body">
                    
                    <h5 className="card-title">{note.title}</h5>
                    <Linkify>
                    <p className="card-text">{note.description}</p>
                    </Linkify>
                    { (note.ufile !==undefined)&&<img className="mb-4" src={`data:${note.ufile.contentType};base64,${btoa(
                        String.fromCharCode(...new Uint8Array((note.ufile.data.data)))
                      )}`} style={{maxWidth:"100%"}}/>}
                      <br/>
                    
                    <Tippy content="Edit note">
                    <svg onClick={handleedit} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" id="edit" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                    </Tippy>
                    <Tippy content="Delete note">
                    <svg onClick={del} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" id="delete" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                    </Tippy>
                    <Tippy content="Background options">
                   <svg onClick={show} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" id="backcol" className="bi bi-paint-bucket" viewBox="0 0 16 16">
                        <path d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a2.972 2.972 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1.01 1.01 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4.322 4.322 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067-.707-.707-1.441-1.279-2.068-1.627-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219l-.217.216zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.283 3.283 0 0 1-.131-.673c.091.061.204.15.337.274zm.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088c.054.12.115.243.183.365.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626.122.068.244.13.365.183l-4.861 4.862a.571.571 0 0 1-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46-.66-.66-1.168-1.32-1.46-1.846-.147-.265-.225-.47-.251-.607a.573.573 0 0 1-.01-.068l3.048-3.047zm2.87-1.935a2.44 2.44 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.497 3.497 0 0 0-1.066.091 11.27 11.27 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z" />
                    </svg>
                    </Tippy>
                    <div className={`d-${display} mt-2`}>
                        <button className="backops" name='none' onClick={()=>showoff(none)} style={{backgroundColor:none}}></button>
                        <button className="backops" name='red' onClick={()=>showoff(red)} style={{backgroundColor:red}}></button>
                        <button className="backops" name='green' onClick={()=>showoff(green)} style={{backgroundColor:green}}></button>
                        <button className="backops" name='yellow' onClick={()=>showoff(yellow)} style={{backgroundColor:yellow}}></button>
                        <button className="backops" name='lightblue' onClick={()=>showoff(lightblue)} style={{backgroundColor:lightblue}}></button>
                        <button className="backops" name='blue' onClick={()=>showoff(blue)} style={{backgroundColor:blue}}></button>
                        <button className="backops" name='pink' onClick={()=>showoff(pink)} style={{backgroundColor:pink}}></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Note
