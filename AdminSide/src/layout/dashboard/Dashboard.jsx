import React, { useState, useEffect } from 'react';
import instanceAxios from '../../config/axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);

  const getAllQuiz = async()=>{
    try {
      const {data} = await instanceAxios.get('/api/quiz/quizes')
      setQuizCount(data?.length || 0)
    } catch (error) {
      console.log(error)
    }
    try {
      const {data} = await instanceAxios.get('/api/users')
      setUserCount(data?.length || 0)
    } catch (error) {
      console.log(error)
    }
  }

  

  // Mock data fetching for user count and quiz count
  useEffect(() => {
    getAllQuiz()
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Quiz App Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to={'/all_user'} className="bg-blue-200 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-2xl font-bold">{userCount}</p>
        </Link>
        <Link to={'/all_quiz'} className="bg-green-200 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Quizzes</h2>
          <p className="text-2xl font-bold">{quizCount}</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
