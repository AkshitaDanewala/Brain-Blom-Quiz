// QuizDetails.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instanceAxios from '../../config/axios';
import { toast } from 'react-toastify'

function QuizDetails() {
  const [quiz, setQuiz] = useState();
  const navigate = useNavigate()

  const {id} = useParams()
  const getQuizDetails = async()=>{
    try {
        const { data } = await instanceAxios.get("/api/quiz/quizes");
      data?.forEach((quiz) => {
        if (quiz._id === id) {
            setQuiz(quiz);
            console.log(quiz)
        }
      });
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
      console.log(id)
      if (id) {
        
          getQuizDetails()
      }
  }, [id]);

  const deleteHandler = async(id)=>{
    try {
        const {data} = await instanceAxios.delete(`/api/questions/${id}`);
        getQuizDetails()
        toast.success('questions deleted successfully')
    } catch (error) {
        console.log(error);
        toast.error('unable to perform action')
    }
}

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-lg mb-4">{quiz.description}</p>
      <p className="text-lg mb-4">{quiz.timer} seconds</p>
      <button onClick={()=>navigate(`/create_question/${id}`)} className='btn btn-secondary'>Add Question</button>
      <h2 className="text-xl font-bold mb-2">Questions:</h2>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='bg-green-200'>
        <th>SL</th>
        <th>statement</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {quiz && quiz.questions?.map((question, index)=>{
        return (
            <tr key={index} className="border border-green-400">
        <th>{index + 1}</th>
        <td>{question.statement}</td>
        <td>
            <button onClick={()=>navigate(`/edit_question/${question._id}`)} className='btn text-black'>
            <svg className=' w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z" /></svg>

            </button>
            <button onClick={()=>deleteHandler(question._id)} className='btn ml-2'>
            <svg className=' w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" /></svg>

            </button>
        </td>
      </tr>
        )
      })}
      
      
    </tbody>
  </table>
</div>
    </div>
  );
}

export default QuizDetails;
