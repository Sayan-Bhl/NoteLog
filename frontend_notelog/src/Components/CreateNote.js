import React, { useRef, useContext, useState } from 'react'
import NoteContext from '../Context/NoteContext'
import "./CreateNote.css"
const CreateNote = (props) => {
    const contextNote = useContext(NoteContext);
    const { addNote } = contextNote;
    const { showAlert } = props;

    const [note, setNote] = useState({ title: "", description: "" })

    const refClose = useRef(null)


    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const save = (e) => {
        e.preventDefault();
        addNote(note);
        refClose.current.click();
        setNote({ title: "", description: "" });
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
                            </div>
                            <div className="modal-footer">
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
