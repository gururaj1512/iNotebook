import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
    const { note, updateNote } = props;
    const { deleteNote } = useContext(noteContext);
    
    return (
        <div className='col-md-4'>
            <div className="card my-3" style={{ width: '100%' }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text my-2">{note.description}</p>
                </div>
                <div className="btns d-flex align-items-center flex-row-reverse">
                    <div className='icons my-1' onClick={()=>{deleteNote(note._id);
                    props.showAlert("Deleted note successfully", "success")}}>
                        <i className="fa-regular fa-trash-can mx-2"></i>
                    </div>
                    <div className='icons my-1' onClick={()=>{updateNote(note)}}>
                        <i className="fa-solid fa-pen-to-square mx-2"></i>
                    </div>
                    <div className='tag mx-3 me-auto'>
                        <p className="inner-tag card-text my-2" style={{paddingLeft: '10px',paddingRight: '10px'}}>{note.tag}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Noteitem
