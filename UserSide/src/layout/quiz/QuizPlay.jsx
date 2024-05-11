// QuizPlay.js

import React, { useState, useEffect } from 'react';
import Question from './Question';
import axios from 'axios';
import instanceAxios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function QuizPlay() {

    const {id} = useParams()
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const {user} = useSelector(state=>state.userAuth)
  

  

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    // Check if selected option is correct
    console.log('first', selectedOption)                                                                        
    if (selectedOption !== null && selectedOption === questions[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }

    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };


  const [quiz, setQuiz] = useState();
  const navigate = useNavigate()

  
  const getQuizDetails = async()=>{
    try {
        const { data } = await instanceAxios.get("/api/quiz/quizes");
      data?.forEach((quiz) => {
        if (quiz._id === id) {
            setQuiz(quiz);
            setQuestions(quiz?.questions)
            console.log(quiz)
        }
      });
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
      if (id) {
          getQuizDetails()
      }
  }, [id]);

  const quizSubmitHandler = async()=>{
    try {
        const sendData = {
            userId:user?._id,
            quizId:id,
            score:score
          }
        const {data} = await instanceAxios.post('api/attempts/record',sendData)
        console.log(data)
        navigate('/all_quiz')
        
    } catch (error) {
        
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {currentQuestionIndex < questions.length ? (
          <Question
            question={questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
          />
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Quiz Completed!</h2>
            <p className="mb-2">Your Score: {score}/{questions.length}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={quizSubmitHandler}
            >
              Quiz List
            </button>
          </div>
        )}
        {currentQuestionIndex < questions.length && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPlay;
