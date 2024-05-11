// UserList.js
import React, { useEffect, useState } from 'react';
import instanceAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';




function UserList() {

    const [allUserList, setAllUserList] = useState();
    const navigate = useNavigate()

const fetchUserDetails = async()=>{
    try {
        const {data} = await instanceAxios.get('/api/users')
        setAllUserList(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
}

useEffect(() => {
  fetchUserDetails()

  return () => {
    
  }
}, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">sl</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allUserList?.map((user, index) => (
              <tr onClick={()=>navigate(`/view_user/${user._id}`)} key={user._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.isAdmin ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.attempt?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
