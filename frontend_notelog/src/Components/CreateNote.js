import React, { useRef, useContext, useState } from 'react'
import NoteContext from '../Context/NoteContext'
import "./CreateNote.css"
const CreateNote = (props) => {
    const contextNote = useContext(NoteContext);
    const { addNote } = contextNote;
    const { showAlert } = props;

    const [note, setNote] = useState({ title: "", description: "", ufile: "" })

    const refClose = useRef(null)
    const refFile = useRef(null)

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) =>{
        setNote({ ...note, ufile: (e.target.files[0].size/1024<=100)?e.target.files[0]:""})
    }

    const uploadSignal = (e) => {
        e.preventDefault();
        refFile.current.click();
    }
    const cut = (e) => {
        e.preventDefault();
        setNote({ ...note, ufile: "" })

    }
    const save = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.ufile);
        refClose.current.click();
        setNote({ title: "", description: "", ufile: "" });
        showAlert("Note added succesfully", "success")
    }

    return (
        <div>
            <button type="button" className="btn w-100" data-bs-toggle="modal" data-bs-target="#createModal" id="makeNote">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pen-fill" mviewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                </svg>
                <span className='mx-3'>Make a note...</span>
            </button>

            <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form encType="multipart/form-data">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Make a note...</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="element my-2">
                                    <label htmlFor="title" className="form-label text">Title*</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange} minLength={1} required />
                                </div>
                                <div className="element my-4">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" rows="5" name="description" value={note.description} onChange={handleChange}></textarea>
                                </div>
                                <div className="element my-2">
                                    <p className="form-label">Image File <span style={{color:"red", fontSize:"13px"}}>(Only one image file can be uploaded and max size 100 kb*)</span></p>
                                    {(note.ufile !== "") &&
                                        <p >{(note.ufile.name.length>40)?note.ufile.name.substring(0,40)+"..."+note.ufile.name.split('').reverse().join('').substring(0,4).split('').reverse().join(''):note.ufile.name}
                                            <svg onClick={cut} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle mx-2" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                        </p>}
                                </div>
                                <div className="element my-2">
                                    <input ref={refFile} type="file" accept=".png, .jpg, .jpeg" className="form-control d-none" id="ufile" name="ufile" value="" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <svg onClick={uploadSignal} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-earmark-image text-left" id="file" viewBox="0 0 16 16">
                                    <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                    <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z" />
                                </svg>
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.title.length < 1} type="button" className="btn btn-primary" onClick={save}>Add Note</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNote
