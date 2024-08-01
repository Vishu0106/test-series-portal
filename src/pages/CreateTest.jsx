import { useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout.jsx';
import axiosInstance from '../config/axiosInastance.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateTest = () => {
  const navigate = useNavigate();
  const [testDetails, setTestDetails] = useState({
    testName: '',
    numberOfQuestions: 1,
    marksPerQuestion: 1,
    questions: [{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }],
  });

  const [errors, setErrors] = useState({});

  const { testName, numberOfQuestions, marksPerQuestion, questions } = testDetails;

  const handleChange = (e) => {
    setTestDetails({ ...testDetails, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [e.target.name]: e.target.value } : q
    );
    setTestDetails({ ...testDetails, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, e) => {
    const updatedQuestions = questions.map((q, i) =>
      i === qIndex
        ? { ...q, options: q.options.map((opt, j) => (j === oIndex ? e.target.value : opt)) }
        : q
    );
    setTestDetails({ ...testDetails, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setTestDetails({
      ...testDetails,
      numberOfQuestions: numberOfQuestions + 1,
      questions: [...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }],
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!testName) formErrors.testName = 'Test name is required';
    if (!numberOfQuestions) formErrors.numberOfQuestions = 'Number of questions is required';
    if (!marksPerQuestion) formErrors.marksPerQuestion = 'Marks per question is required';

    questions.forEach((q, index) => {
      if (!q.questionText) formErrors[`questionText-${index}`] = `Question ${index + 1} is required`;
      q.options.forEach((opt, oIndex) => {
        if (!opt) formErrors[`option-${index}-${oIndex}`] = `Option ${oIndex + 1} for question ${index + 1} is required`;
      });
      if (!q.correctAnswer) {
        formErrors[`correctAnswer-${index}`] = `Correct answer for question ${index + 1} is required`;
      } else if (!q.options.includes(q.correctAnswer)) {
        formErrors[`correctAnswer-${index}`] = `Correct answer for question ${index + 1} must be one of the options`;
      }
    });

    return formErrors;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formErrors = validateForm();
      if (Object.keys(formErrors).length === 0) {
        // Handle form submission logic
        const response = await axiosInstance.post('/tests/create', testDetails);
        if(response.status === 201) {
          toast.success('Test created successfully');
          navigate('/tests');
        } else {  
          toast.error('Error creating test');
        }
        console.log('Form submitted successfully', testDetails);
      } else {
        setErrors(formErrors);
      }
    } catch (error) {
      toast.error('Error creating test');
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#32717b] pt-2">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Test</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Test Name</label>
              <input
                type="text"
                name="testName"
                value={testName}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.testName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              />
              {errors.testName && <p className="text-red-500 text-sm">{errors.testName}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Number of Questions</label>
              <input
                type="number"
                name="numberOfQuestions"
                value={numberOfQuestions}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.numberOfQuestions ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              />
              {errors.numberOfQuestions && <p className="text-red-500 text-sm">{errors.numberOfQuestions}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Marks per Question</label>
              <input
                type="number"
                name="marksPerQuestion"
                value={marksPerQuestion}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.marksPerQuestion ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              />
              {errors.marksPerQuestion && <p className="text-red-500 text-sm">{errors.marksPerQuestion}</p>}
            </div>
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-4">
                <label className="block text-gray-700 mb-2">Question {qIndex + 1}</label>
                <input
                  type="text"
                  name="questionText"
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  className={`w-full p-2 border ${errors[`questionText-${qIndex}`] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500 mb-2`}
                />
                {errors[`questionText-${qIndex}`] && <p className="text-red-500 text-sm">{errors[`questionText-${qIndex}`]}</p>}
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="mb-2">
                    <label className="block text-gray-700">Option {oIndex + 1}</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      className={`w-full p-2 border ${errors[`option-${qIndex}-${oIndex}`] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                    />
                    {errors[`option-${qIndex}-${oIndex}`] && <p className="text-red-500 text-sm">{errors[`option-${qIndex}-${oIndex}`]}</p>}
                  </div>
                ))}
                <label className="block text-gray-700 mb-2">Correct Answer</label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  className={`w-full p-2 border ${errors[`correctAnswer-${qIndex}`] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
                />
                {errors[`correctAnswer-${qIndex}`] && <p className="text-red-500 text-sm">{errors[`correctAnswer-${qIndex}`]}</p>}
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CreateTest;
