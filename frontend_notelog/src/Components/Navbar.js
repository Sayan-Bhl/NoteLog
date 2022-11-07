import React, { useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const reflogout = useRef(null)
  const refNo = useRef(null);
  const refLogoutIcon = useRef(null)

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    refNo.current.click()
    navigate("/login")
  }

  const handleLogout = (e) => {
    e.preventDefault();
    reflogout.current.click()
  }
  const logoutIcon = () => {
    refLogoutIcon.current.click();
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NoteLog ____
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-vector-pen" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z" />
              <path fillRule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z" />
            </svg>
          </Link>



          <div className='navItems'>

            {!localStorage.getItem('token') ?
              <Link className="nav-link" aria-current="page" to="/login">Log in</Link> :
              <>
                <Link className="nav-link mx-4" aria-current="page" to='/account'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                  </svg>
                </Link>
                <a ref={refLogoutIcon} className="nav-link d-none" aria-current="page" href="#" onClick={handleLogout} role="button">Logout</a>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={logoutIcon} width="26" height="26" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                </svg>
                
              </>}

          </div>
        </div>
      </nav>



      <button ref={reflogout} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#logout">
        Launch static backdrop modal
      </button>

      <div className="modal fade mx-auto" id="logout" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ width: '300px' }}>
          <div className="modal-content">
            <div className="modal-body mx-auto">
              Are you want to log out?
            </div>
            <div className="modal-footer mx-auto">
              <button type="button" className="btn btn-primary rounded-pill px-4" onClick={logout}>Yes</button>
              <button ref={refNo} type="button" className="btn btn-primary rounded-pill px-4" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Navbar
