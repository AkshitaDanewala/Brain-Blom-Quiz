import React, { useEffect, useState } from 'react'
import instanceAxios from '../../config/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const QuizList = () => {
    const [allQuiz, setAllQuiz] = useState()
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
    
      return () => {
        
      }
    }, [])

    const deleteHandler = async(id)=>{
        try {
            const {data} = await instanceAxios.delete(`/api/quiz/${id}`);
            getAllQuiz()
            toast.success('quiz deleted successfully')
        } catch (error) {
            console.log(error);
            toast.error('unable to perform action')
        }
    }
    
  return (
    <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    {/* head */}
    <thead>
      <tr className='bg-green-200'>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Title</th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>total Question</th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {allQuiz && allQuiz.map((quiz, index)=>{
        return (
            <tr key={index} className="border border-green-400">
        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
        <td onClick={()=>navigate(`/show_quiz/${quiz._id}`)} className="px-6 py-4 whitespace-nowrap">{quiz.title}</td>
        <td onClick={()=>navigate(`/show_quiz/${quiz._id}`)} className="px-6 py-4 whitespace-nowrap">{quiz.description}</td>
        <td onClick={()=>navigate(`/show_quiz/${quiz._id}`)} className="px-6 py-4 whitespace-nowrap">{quiz.questions?.length || 0}</td>
        <td className="px-6 py-4 whitespace-nowrap">
            <button onClick={()=>navigate(`/edit_quiz/${quiz._id}`)} className='btn text-black'>
            <svg className=' w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z" /></svg>

            </button>
            <button onClick={()=>deleteHandler(quiz._id)} className='btn ml-2'>
            <svg className=' w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" /></svg>

            </button>
        </td>
      </tr>
        )
      })}
      
      
    </tbody>
  </table>
</div>
  )
}

export default QuizList