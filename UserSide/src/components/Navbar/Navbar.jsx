import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar bg-base-300">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link to={'/'}>Dashboard</Link></li>
        <li><Link to={'/all_quiz'}>QuizList</Link></li>
        <li><a>About</a></li>
        <li><Link to={'/signin'}>Logout</Link></li>
      </ul>
    </div>
  </div>
  <div className="navbar-end">
    <a className="btn btn-ghost text-xl">Quiz App</a>
  </div>
  
</div>
  )
}

export default Navbar