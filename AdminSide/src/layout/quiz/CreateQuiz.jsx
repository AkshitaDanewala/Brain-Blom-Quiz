import React, { useEffect, useState } from "react";
import instanceAxios from "../../config/axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const QuizForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timer: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (id) {
            const {data} = await instanceAxios.put(`/api/quiz/${id}`, formData)
            toast.success("quiz updated successfully");
        } else{
            const { data } = await instanceAxios.post("/api/quiz", formData);
            toast.success("quiz created successfully");
        }
        navigate('/all_quiz')
      // console.log(data)
    } catch (error) {
      toast.error("unable to perform action");
      // console.log(error)
    }
    console.log(formData);
  };

  const getQuizDetails = async () => {
    try {
      const { data } = await instanceAxios.get("/api/quiz/quizes");
      data?.forEach((quiz) => {
        if (quiz._id === id) {
          setFormData({
            title: quiz?.title,
            description: quiz?.description,
            timer: quiz?.timer,
          });
        }
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      getQuizDetails();
    }

    return () => {};
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">{id ? 'Update' : 'Create'} Quiz</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-400 px-4 py-2 mt-2 w-full rounded"
              placeholder="Enter quiz title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-400 px-4 py-2 mt-2 w-full rounded"
              placeholder="Enter quiz description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="timer" className="block text-gray-700">
              Timer (in seconds)
            </label>
            <input
              type="number"
              id="timer"
              name="timer"
              value={formData.timer}
              onChange={handleChange}
              className="border border-gray-400 px-4 py-2 mt-2 w-full rounded"
              placeholder="Enter timer value"
            />
          </div>
          {/* You can add questions input fields dynamically based on your requirements */}
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

export default QuizForm;
