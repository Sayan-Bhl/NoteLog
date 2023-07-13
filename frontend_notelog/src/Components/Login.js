import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
const Login = (props) => {
  const {showAlert}=props;
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const host = process.env.REACT_APP_API_PORT;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/")
      showAlert("Logged in successfully", "success")
    } else {
      showAlert("Invalid creditals", "danger")
    }

  }
  const handleOnchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container' id='login'>
      <div className='row'>
        <div className='col-12 col-sm-8 col-md-7 m-auto'>
          <div className='card'>
            <div className='card-body'>
              <div className='text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='py-1 my-1 mx-auto'>
                  <label htmlFor="email" className="form-label"><b>Email address</b></label>
                  <input type="email" className="form-control rounded-pill" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={handleOnchange} />
                </div>
                <div className='py-1 my-1 mx-auto'>
                  <label htmlFor="password" className="form-label"><b>Password</b></label>
                  <input type="password" className="form-control rounded-pill" value={credentials.password} id="password" name="password" onChange={handleOnchange} />
                </div>
                <div className="d-grid gap-2 col-7 mx-auto my-3">
                  <button className="btn btn-primary rounded-pill" type="submit">Log In</button>
                </div>
              </form>
              <div className='text-center my-4'>
                <p>Don't have an account? <Link className='signup' to='/signup'>Sign up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
