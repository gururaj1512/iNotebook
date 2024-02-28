import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
// import AddNote from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate = useNavigate()
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {        
            getNotes()
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const refUpdate = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote) => {
        refUpdate.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated note successfully..!", "success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    // const addNoteBtn = () => {

    // }

    return (
        <>
            {/* <AddNote showAlert={props.showAlert}/> */}
            <button ref={refUpdate} className="btn btn-primary d-none" type="button" data-bs-toggle="modal" data-bs-target="#updateModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2 className='mx-3 my-3'>You Notes</h2>
                <div className="container" style={{textAlign: 'center'}}>
                    {notes.length === 0 && 'No notes to display..!'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
                
                <button style={{width: '31.5%', height: '165px', margin: '18px 10px', borderRadius: 10, border: '1px solid #d0d0d0', backgroundColor: 'white'}} type="button" data-bs-toggle="modal" data-bs-target="#addModal">
                    <div style={{position: 'relative', height: '100%', width: '100%'}}>
                        <div style={{position: 'absolute', top: '35%', left: '45%', backgroundColor: '#d0d0d0', height: '50px', width: '50px', fontSize: '35px', borderRadius: '50%', color: 'white'}}>+</div>
                    </div>
                </button>
            </div>
        </>
    )
}

export default Notes