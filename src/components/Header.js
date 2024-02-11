import React from 'react';
import {Link} from 'react-router-dom';
function Header() {
  return (
    <>
    

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to={`/`}>
      Navbar
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={`/`}>
           <b> Home</b>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/city`}>
           <b> Add New City </b>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={`/vehicles`}>
           <b> Add New Vehicle </b>
          </Link>
        </li>
       
      </ul>
      
    </div>
  </div>
</nav>

    
    </>
  )
}

export default Header