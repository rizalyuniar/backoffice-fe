import React from 'react'
import { Link } from 'react-router-dom'

const Side = () => {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-text mx-3">BackOffice</div>
      </Link>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <span>Dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/threat">
          <span>Order</span>
        </Link>
      </li>
      <hr className="sidebar-divider" />
    </ul>
  )
}

export default Side