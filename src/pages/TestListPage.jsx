import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInastance.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import HomeLayout from '../Layouts/HomeLayout.jsx';

const TestsListPage = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axiosInstance.get('/tests/all'); // Adjust the endpoint as necessary
        if(response.status === 200) {
        setTests(response.data);
        toast.success('Tests fetched successfully');

        } else {
            toast.error('Error fetching tests');
        }
        
      } catch (error) {
        toast.error('Error fetching tests');
      }
    };

    fetchTests();
  }, []);

  const handleTakeTest = (testId) => {
    navigate(`/take-test/${testId}`);
  };

  return (
    <HomeLayout>
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Available Tests</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div key={test._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{test.testName}</h2>
              <p className="mb-2">Number of Questions: {test.numberOfQuestions}</p>
              <p className="mb-4">Marks per Question: {test.marksPerQuestion}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={() => handleTakeTest(test._id)}
              >
                Take Test
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </HomeLayout>
  );
};

export default TestsListPage;
