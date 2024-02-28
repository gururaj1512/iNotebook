import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Login successfully", "success")    
            navigate("/");
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container' style={{width: '40%', height: '100%', border: '1px solid #D0D0D0', alignItems: 'center', justifyContent: 'center', marginTop: '30px'}}>
            <h2 style={{textAlign: 'center', fontFamily: 'Poppins', marginTop: '20px'}}>iNotebook</h2>
            <form onSubmit={handleSubmit} style={{margin: '20px'}}>
                <div className="mb-3" style={{paddingTop: '30px'}}>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password'/>
                </div>
                <button type="submit" className="btn btn-primary my-3" style={{width: '100%'}}>Submit</button>
            </form>
            <hr className='mx-3'/>
            <div style={{textAlign: 'center', margin: '40px 0px', fontFamily: 'sans-serif'}}>
                <p>Don't have a account? <a href="/signup" style={{textDecoration: 'none'}}>Sign Up..!</a></p>
            </div>
        </div>
    )
}

export default Login
