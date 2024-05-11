import React from 'react'
import { Link } from 'react-router-dom'
import instanceAxios from '../../config/axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getUserLogOut } from '../../store/slice/userSlice'

const Navbar = ({setIsSideBarOpen}) => {

  const dispatch = useDispatch()

  const logoutHandler = async()=>{
    try {
      const {data} = await instanceAxios.post('api/users/logout');
      toast.success('logout successfully')
      dispatch(getUserLogOut())
    } catch (error) {
      toast.error('unable to logout try again');
      console.log(error)
    }
  }
  return (
    <div className="navbar bg-base-300">
  <div className="flex-none">
    <button onClick={()=>setIsSideBarOpen(true)} className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
  </div>
  <div className="flex-1">
    <Link to={'/'} className="btn btn-ghost text-xl">Quiz App</Link>
  </div>
  <div className="flex gap-2">
    <div onClick={logoutHandler} className="btn ">
        Log Out
    </div>
    
  </div>
</div>
  )
}

export default Navbar