import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom"
import noteContext from '../context/notes/noteContext';

const Navbar = (props) => {
    let navigate = useNavigate()
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    const { addNote } = useContext(noteContext);

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        props.showAlert("Added note successfully..!", "success")
        setNote({ title: "", description: "", tag: "" })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>

            <div className={`${location.pathname === "/login" || location.pathname === "/signup" ? "d-none" : "d-block"}`}>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">iNotebook</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                                </li>
                                <li className="nav-item">


                                    {/* Add Note Modal */}
                                    <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="addModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form>
                                                        <div className="mb-3">
                                                            <label htmlFor="title" className="form-label">Title</label>
                                                            <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="description" className="form-label">Description</label>
                                                            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="tag" className="form-label">Tag</label>
                                                            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Add Note Modal */}


                                </li>
                            </ul>
                            
                            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                                <Link to="/login" role='button' className="btn btn-outline-primary mx-2">Login</Link>
                                <Link to="/signup" role='button' className="btn btn-outline-primary mx-2">Signup</Link>
                            </form> : <>
                                <button className="btn btn-outline-primary mx-2" onClick={handleLogout} >Logout</button>
                                <button className="btn btn-outline-secondary mx-3" data-bs-toggle="modal" data-bs-target="#addModal">Add Note</button>
                            </>}
                        </div>
                    </div>
                </nav>
            </div>


        </>
    )
}

export default Navbar
