import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/')
  }
  return (
   <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">SE NPRU Blog</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 gap-2 items-center">
      {user?.role === 'admin' && (
        <li>
          <Link to="/admin/create-post" className="btn btn-primary btn-sm text-white">Create Post</Link>
        </li>
      )}
      {!user ? (
        <>
          <li>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
          </li>
          <li>
            <Link to="/register" className="btn btn-ghost btn-sm">Register</Link>
          </li>
        </>
      ) : (
        <>
          <li><span className="text-sm text-gray-600">สวัสดี, {user.username} ({user.role})</span></li>
          <li><button className="btn btn-ghost btn-sm" onClick={handleLogout}>Logout</button></li>
        </>
      )}
    </ul>
  </div>
</div>
  )
}

export default Navbar
