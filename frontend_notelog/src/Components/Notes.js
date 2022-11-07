import React, { useContext, useRef, useState, useEffect } from 'react'
import NoteContext from '../Context/NoteContext'
import Note from './Note';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const { showAlert } = props
    const navigate = useNavigate();
    const contextNote = useContext(NoteContext);
    const { notes, editNote, getNotes} = contextNote;

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "",eufile:""})

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login")
        }
    })

    const refClose = useRef(null)
    const refEdit = useRef(null)
    const refFile = useRef(null)
   
    const update =() => {
        editNote(note.id, note.etitle, note.edescription, note.eufile)
        refClose.current.click();
        showAlert("Note updated successfully", "success")
    }
    const edit = (currentNote) => {
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, eufile:(currentNote.ufile!==undefined)?currentNote.ufile:""})
        refEdit.current.click()
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })  
    }
    const handleFileChange = (e) => {
        setNote({ ...note, eufile: (e.target.files[0].size/1024<=100)?e.target.files[0]:"" })
    }
    const uploadSignal = (e) => {
        e.preventDefault();
        refFile.current.click();
    }
    const cut=(e)=>{
        setNote({...note, eufile:""})
    }
    return (
        <>
            <div>
                <button ref={refEdit} type="button" className="btn d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                    Edit
                </button>

                <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editModalLabel">Edit note...</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="element my-2">
                                    <label htmlFor="title" className="form-label text">Title*</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChange} minLength={1} required />
                                </div>
                                <div className="element my-2">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" rows="5" id="edescription" name="edescription" value={note.edescription} onChange={handleChange}></textarea>
                                </div>
                                <div className="element my-2">
                                    <p className="form-label">Image File <span style={{color:"red", fontSize:"13px"}}>(Only one image file can be uploaded and max size 100 kb*)</span></p>
                                    {(note.eufile !== "") &&
                                        <p >{(note.eufile.name.length > 40) ? note.eufile.name.substring(0, 40) + "..." + note.eufile.name.split('').reverse().join('').substring(0, 4).split('').reverse().join('') : note.eufile.name}
                                            <svg onClick={cut} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle mx-2" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                        </p>
                                    }
                                    

                                </div>
                                <div className="element my-2">
                                    <input ref={refFile} disabled={note.eufile!==""} type="file" accept=".png, .jpg, .jpeg" className="form-control d-none" id="eufile" name="eufile" value="" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                            <svg onClick={uploadSignal} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-earmark-image text-left" id="file" viewBox="0 0 16 16">
                                    <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                    <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z" />
                                </svg>
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length < 1} type="button" className="btn btn-primary" onClick={update}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='text-center'>{notes.length === 0 && "No notes to display"}</div>
                {notes.map((note) => {
                    return <Note key={note._id} note={note} edit={edit} showAlert={showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes
