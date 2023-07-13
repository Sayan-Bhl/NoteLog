import React,{ useState } from 'react'
import './Signup.css'
import { Link,useNavigate } from "react-router-dom";


const Signup = (props) => {
    const {showAlert}=props;
  
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  
    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const host = process.env.REACT_APP_API;
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (credentials.cpassword === credentials.password) {
        const response = await fetch(`${host}/api/auth/createUser`, {
          method: 'POST',
  
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
          localStorage.setItem('token', json.authToken);
          navigate("/")
          showAlert("Account created successfully", "success")
        } else {
  
          showAlert("Invalid credentials", "danger")
        }
      }
      else {
        showAlert("Enter right password", "danger")
      }
    }
    return (
        <div className='container' id='signup'>
            <div className='row'>
                <div className='col-12 col-sm-8 col-md-7 m-auto'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='py-2 my-1 mx-auto'>
                                <h4>Create account</h4>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='py-1 my-1 mx-auto'>
                                    <label htmlFor="name" className="form-label"><b>Your Name</b></label>
                                    <input type="text" className="form-control rounded-pill" id="name" value={credentials.name} name="name" onChange={handleChange} minLength={3} placeholder='First and last name' />
                                </div>
                                <div className='py-1 my-1 mx-auto'>
                                    <label htmlFor="email" className="form-label"><b>Email Address</b></label>
                                    <input type="email" className="form-control rounded-pill" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={handleChange} />
                                </div>
                                <div className='py-1 my-1 mx-auto'>
                                    <label htmlFor="password" className="form-label"><b>Password</b></label>
                                    <input type="password" className="form-control rounded-pill" id="password" value={credentials.password} name="password" onChange={handleChange} minLength={8} placeholder='At least 8 characters' />
                                </div>
                                <div className='py-1 my-1 mx-auto'>
                                    <label htmlFor="cpassword" className="form-label"><b>Confirm Password</b></label>
                                    <input type="password" className="form-control rounded-pill" id="cpassword" value={credentials.cpassword} name="cpassword" onChange={handleChange} minLength={8} />
                                </div>

                                <div className="d-grid gap-2 col-7 mx-auto my-3">
                                    <button className="btn btn-primary rounded-pill" type="submit">Sign Up</button>
                                </div>
                            </form>
                            {/*<div className='py-2 my-3 w-75 mx-auto'>
                            <p className="conditions">By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, including <a href="#">Cookie Use.</a></p>
                            </div>*/}

                            <div className='text-center my-4'>
                                <p>Already have an account? <Link className='login' to='/login'>Log in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
