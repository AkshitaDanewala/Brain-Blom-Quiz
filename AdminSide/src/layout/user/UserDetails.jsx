// UserDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import instanceAxios from '../../config/axios';

function UserDetails() {
  const [user, setUser] = useState(null);
  const {id} = useParams()

  const getUSerDetails = async()=>{
    try {
        const {data} = await instanceAxios.get(`/api/users/${id}`);
        setUser(data)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getUSerDetails()
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">User Details</h2>
      <div className="bg-white shadow-md rounded-lg px-6 py-8 mb-8">
        <div className="mb-4">
          <p className="text-lg font-semibold"><span className="text-gray-600">Username:</span> {user.username}</p>
          <p className="text-lg font-semibold"><span className="text-gray-600">Email:</span> {user.email}</p>
          <p className="text-lg font-semibold"><span className="text-gray-600">Gender:</span> {user.gender}</p>
          <p className="text-lg font-semibold"><span className="text-gray-600">Admin:</span> {user.isAdmin ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4">Attempted Quiz Questions</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul>
          {user?.attempt?.map(attempt => (
            <li key={attempt._id} className="border-b border-gray-200 last:border-none py-4 px-6">
              <p className="text-lg font-semibold">{attempt?.quiz?.title}</p>
              <p className="text-gray-600">Score: {attempt?.score}</p>
              <p className="text-gray-600">quiz: {attempt?.quiz?.name || 'Quiz details not available'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDetails;
