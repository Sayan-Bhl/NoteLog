import React, { useContext, useRef, useState, useEffect } from 'react'
import NoteContext from '../Context/NoteContext'
import Note from './Note';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const { showAlert } = props
    const navigate = useNavigate();
    const contextNote = useContext(NoteContext);
    const { notes, editNote, getNotes } = contextNote;

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "" })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login")
        }
    },[])

    const refClose = useRef(null)
    const refEdit = useRef(null)


    const update = (e) => {
        e.preventDefault()
        editNote(note.id, note.etitle, note.edescription)
        refClose.current.click();
        showAlert("Note updated successfully", "success")
    }
    const edit = (currentNote) => {
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description })
        refEdit.current.click()
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
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


                            </div>
                            <div className="modal-footer">

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
