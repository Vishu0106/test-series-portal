import { useEffect, useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../config/axiosInastance.js';

const TakeTest = () => {
  const [test, setTest] = useState(null);
  const [responses, setResponses] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { testId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axiosInstance.get(`/tests/?testId=${testId}`);
        if(response.status === 200) {
          setTest(response.data);
          setTimeLeft(response.data.numberOfQuestions * 60); // 1 minute per question
          toast.success('Test fetched successfully');
        } else {
          toast.error('Error fetching test');
        }
      } catch (err) {
        setError('Failed to fetch test data');
      }
    };
    fetchTest();
  }, [testId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleChange = (questionIndex, value) => {
    setResponses({ ...responses, [questionIndex]: value });
  };

  const validateResponses = () => {
    const errors = {};
    test.questions.forEach((question, index) => {
      if (!responses[index]) {
        errors[index] = 'This question is required';
      }
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const errors = validateResponses();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const answers = Object.keys(responses).map((questionIndex) => ({
          questionId: test.questions[questionIndex]._id,
          selectedAnswer: responses[questionIndex]
        }));

        const result = await axiosInstance.post('/results/submit', { testId, answers });

        if (result.status === 201) {
          toast.success('Test submitted successfully');
          console.log("results", result.data.result);
          navigate(`/results/${result.data.result.test}`);
        } else {
          toast.error('Error submitting test');
        }
      } catch (err) {
        setError('Failed to submit test');
        setIsSubmitting(false);
      }
    } else {
      setError('Please answer all questions');
    }
  };

  const closeError = () => {
    setError(null);
  };

  const isAllAnswered = test && Object.keys(responses).length === test.questions.length;

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#32717b] text-gray-800 pt-2">
        {error && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto relative">
              <button onClick={closeError} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl">
                &times;
              </button>
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <p className="text-gray-800">{error}</p>
            </div>
          </div>
        )}

        {!test ? (
          <div className="flex items-center justify-center h-screen text-2xl text-gray-500">Loading...</div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">{test.testName}</h1>
            <div className="text-right mb-4 text-gray-600 text-xl">
              Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </div>
            <form onSubmit={handleSubmit}>
              {test.questions.map((question, index) => (
                <div key={index} className="mb-6">
                  <label className="block text-2xl font-semibold mb-3 text-gray-900">{question.questionText}</label>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="mb-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          onChange={() => handleChange(index, option)}
                          className="form-radio text-blue-600"
                        />
                        <span className="ml-3 text-xl text-gray-700">{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              <button
                type="submit"
                className={`${
                  isAllAnswered ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                } text-white p-3 w-full rounded-lg transition duration-300 text-2xl font-semibold`}
                disabled={!isAllAnswered || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </button>
            </form>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default TakeTest;
