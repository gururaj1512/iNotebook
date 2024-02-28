import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name : "", email: "", password: "", cpassword: ""});
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate("/");
            props.showAlert("Signin successfully", "success")
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container' style={{width: '40%', height: '100%', border: '1px solid #D0D0D0', alignItems: 'center', justifyContent: 'center', marginTop: '10px'}}>
            <h2 style={{textAlign: 'center', fontFamily: 'Poppins', marginTop: '20px'}}>iNotebook</h2>
            <form onSubmit={handleSubmit} style={{margin: '10px 20px'}}>
                <div className="mb-3" style={{paddingTop: '30px'}}>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
                </div>

                <button type="submit" className="btn btn-primary" style={{width: '100%', margin: '25px 0px'}}>Submit</button>
            </form>
            <hr className='mx-3'/>
            <div style={{textAlign: 'center', margin: '40px 0px', fontFamily: 'sans-serif'}}>
                <p>Have a account? <a href="/login" style={{textDecoration: 'none'}}>Login..!</a></p>
            </div>
        </div>
    )
}

export default Signup
