import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/navbar/Sidebar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import SignIn from './layout/auth/SignIn'
import SignUp from './layout/auth/SignUp'
import { useSelector } from 'react-redux'
import Dashboard from './layout/dashboard/Dashboard'
import QuizForm from './layout/quiz/CreateQuiz'
import QuizList from './layout/quiz/QuizList'
import QuestionForm from './layout/quiz/QuistionForm'
import QuizDetails from './layout/quiz/QuizDetails'
import UserList from './layout/user/UserList'
import UserDetails from './layout/user/UserDetails'

const App = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const {is_auth} = useSelector(state => state.userAuth);

  const navigate = useNavigate();

  
  

  return (
    <div className='overflow-x-hidden'>
      {is_auth &&<>
      <div className='sticky top-0 left-0 w-full flex z-40'>
      <Navbar setIsSideBarOpen={setIsSideBarOpen}/>
      </div>
      {isSideBarOpen &&<div className='absolute flex top-0 left-0 z-50 w-full'>
        <Sidebar setIsSideBarOpen={setIsSideBarOpen}/>
        <div onClick={()=>setIsSideBarOpen(false)} className='w-full bg-[#00000052]'>

        </div>
      </div>}</>}
      <div>
        {!is_auth ?<Routes>
          <Route path='/sign_in' element={<SignIn/>}/>
          <Route path='/sign_up' element={<SignUp/>}/>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/:a' element={<SignIn/>}/>
        </Routes>
        :
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/create_quiz' element={<QuizForm/>}/>
          <Route path='/all_quiz' element={<QuizList/>}/>
          <Route path='/all_user' element={<UserList/>}/>
          <Route path='/view_user/:id' element={<UserDetails/>}/>
          <Route path='/show_quiz/:id' element={<QuizDetails/>}/>
          <Route path='/edit_quiz/:id' element={<QuizForm/>}/>
          <Route path='/edit_question/:id' element={<QuestionForm/>}/>
          <Route path='/create_question/:quiz_id' element={<QuestionForm/>}/>
        </Routes>
        }
      </div>
    </div>
  )
}

export default App