import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instanceAxios from '../../config/axios';
import { toast } from 'react-toastify'

const QuestionForm = () => {
    const {id, quiz_id} = useParams()
  const [formData, setFormData] = useState({
    statement: '',
    options: ['', '', ''],
    correctOption: 0,
    
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        if (id) {
            const {data} = await instanceAxios.put(`/api/questions/${id}`, formData)
            toast.success("question updated successfully");
            console.log(data)
        } else{
            
            const { data } = await instanceAxios.post("/api/questions", formData);
            console.log(data)
            toast.success("question created successfully");
        }
        navigate('/all_quiz')
    } catch (error) {
      toast.error("unable to perform action");
      console.log(error)
    }
    console.log(formData);
  };

  const getQuizDetails = async()=>{
    try {
        const {data} = await instanceAxios.get(`/api/questions/${id}`)
        setFormData({
            statement: data.statement,
            options: data.options,
            correctOption: data.correctOption
        })
        
        console.log(data)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    if(id){
        getQuizDetails()
    } else if (quiz_id) {
        setFormData({...formData, quiz:quiz_id})
    }
  
    return () => {
      
    }
  }, [id,quiz_id])
  

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">{id ? 'Update' :'Create'} Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="statement" className="block text-gray-700">Statement</label>
            <textarea
              id="statement"
              name="statement"
              value={formData.statement}
              onChange={handleChange}
              className="border border-gray-400 px-4 py-2 mt-2 w-full rounded"
              placeholder="Enter question statement"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="options" className="block text-gray-700">Options</label>
            {formData.options.map((option, index) => (
              <input
                key={index}
                type="text"
                name={`option_${index}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...formData.options];
                  newOptions[index] = e.target.value;
                  setFormData({ ...formData, options: newOptions });
                }}
                className="border border-gray-400 px-4 py-2 mt-2 w-full rounded"
                placeholder={`Option ${index + 1}`}
              />
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="correctOption" className="block text-gray-700">Correct Option</label>
            <select
              id="correctOption"
              name="correctOption"
              value={formData.correctOption}
              onChange={handleChange}
              className="border border-gray-400 px-4 py-2 mt-2 w-full rounded"
            >
              {formData.options.map((option, index) => (
                <option key={index} value={index}>{`Option ${index + 1}`}</option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 mt-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
