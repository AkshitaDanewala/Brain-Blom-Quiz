import React from 'react'
import { useSelector } from 'react-redux';
import SignIn from './layout/auth/SignIn';
import SignUp from './layout/auth/SignUp';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import Navbar from './components/Navbar/Navbar';
import QuizList from './layout/quiz/QuizList';
import QuizPlay from './layout/quiz/QuizPlay';

const App = () => {
  const {is_auth} = useSelector(state => state.userAuth);
  return (
    <div>
      <div className='w-full sticky top-0 left-0'>
        <Navbar/>
      </div>

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
          <Route path='/all_quiz' element={<QuizList/>}/>
          <Route path='/play_quiz/:id' element={<QuizPlay/>}/>
          
        </Routes>
        }
      </div>
    </div>
  )
}

export default App