import React, { useState, useEffect } from 'react';
import axios from 'axios';
import instanceAxios from '../config/axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [quizCount, setQuizCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      let score = 0;
      const { data } = await instanceAxios.get('/api/users/profile');
      console.log(data, 'userData');
      if (data?.attempt) {
        data?.attempt?.forEach((item) => {
          score += +item.score;
        });
        setTotalScore(score);
      }

      setUserData(data);
    } catch (error) {
      console.log(error);
    }
    try {
      const { data } = await instanceAxios.get('/api/quiz/quizes');
      console.log(data);
      setQuizCount(data?.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      {userData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Gender:</strong> {userData.gender}
            </p>
          </div>
          <div className="col-span-1 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Account Details</h2>
            <p>
              <strong>Role:</strong> {userData.isAdmin ? 'Admin' : 'User'}
            </p>
            {/* Add more account details as needed */}
          </div>
          <div className="col-span-1 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Total Data</h2>
            <p>
              <strong>Available Quiz:</strong> {quizCount}
            </p>
            <p>
              <strong>Attempt:</strong> {userData?.attempt?.length || 0}
            </p>
            <p>
              <strong>Total Score:</strong> {totalScore}
            </p>
          </div>
        </div>
      )}

      <div className="col-span-1 bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Attempts</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {userData?.attempt ? (
                userData?.attempt?.map((attempt) => (
                  <tr key={attempt._id}>
                    <td className="border px-4 py-2">{attempt?.quiz?.title}</td>
                    <td className="border px-4 py-2">{attempt?.score}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center px-4 py-2">
                    No Quiz Played
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
