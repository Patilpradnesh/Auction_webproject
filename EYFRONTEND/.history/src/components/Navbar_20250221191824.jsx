import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light"   style={{ backgroundColor: '#00bcd4' }}>
        <div className="container-fluid">
           <a className="navbar-brand" href="#"><img src="src/assets/react.svg" alt="" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
               <NavLink className="nav-link" to={"/"}>Home</NavLink>
              </li>
              <li className="nav-item">
               <NavLink className="nav-link" to={"/Dashboard"}>Dashboard</NavLink>
              </li>
              <li className="nav-item">
               <NavLink className="nav-link" to={"/AuctionDetails"}>Auction-Details</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <NavLink className="nav-link" to={"/Sign-In"}>Sign-In</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to={"/"}>Sing-UP</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar