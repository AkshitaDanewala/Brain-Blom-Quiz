import React, { useEffect, useState } from 'react'
import instanceAxios from '../../config/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const QuizList = () => {
    const [allQuiz, setAllQuiz] = useState();
    const [userPlayedQuiz, setUserPlayedQuiz] = useState()
    const navigate = useNavigate()

    const getAllQuiz = async()=>{
        try {
            const {data} = await instanceAxios.get('/api/quiz/quizes')
            console.log(data)
            setAllQuiz(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
      getAllQuiz()
      fetchUserData()
      return () => {
        
      }
    }, [])

    //fetch user
    const fetchUserData = async()=>{
      try {
          
          const {data} = await instanceAxios.get('/api/users/profile');
          setUserPlayedQuiz(data.attempt)
          console.log(data,'userData')
      } catch (error) {
          console.log(error)
      }
     
    };

    const checkUserPlayed = (quiz_id)=>{
      let isFound = false
      userPlayedQuiz.forEach(element => {
        if (element?.quiz?._id === quiz_id && !isFound) {
          isFound = true
        }
      });
      if (isFound) {
        toast.info('this quiz already played')
      } else {
        
        navigate(`/play_quiz/${quiz_id}`)
      }
    }
    // yeh function check kr rha hai ki user ne quiz pehle se he khel liya hai
    
  return (
    <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    {/* head */}
    <thead>
      <tr className='bg-green-200'>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>SL</th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Title</th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>total Question</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {allQuiz && allQuiz.map((quiz, index)=>{
        return (
            <tr onClick={()=>checkUserPlayed(quiz._id)} key={index} className="border border-green-400">
        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
        <td className="px-6 py-4 whitespace-nowrap">{quiz.title}</td>
        <td className="px-6 py-4 whitespace-nowrap">{quiz.description}</td>
        <td className="px-6 py-4 whitespace-nowrap">{quiz.questions?.length || 0}</td>
       
      </tr>
        )
      })}
      
      
    </tbody>
  </table>
</div>
  )
}

export default QuizList