import { useEffect, useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout.jsx';
import axiosInstance from '../config/axiosInastance.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResultList = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get('/results/res');
        if (response.status === 200) {
            toast.success('Results fetched successfully');
          setResults(response.data.results);
        } else {
          toast.error('Error fetching results');
        }
      } catch (err) {
        setError('Failed to fetch results');
      }
    };
    fetchResults();
  }, []);

  const viewResultDetails = (testId) => {
    console.log("tet",testId);
    navigate(`/results/${testId._id}`);
  };

  return (
    <HomeLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#32717b] pt-2">
        {error && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto relative">
              <button onClick={() => setError(null)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl">
                &times;
              </button>
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <p className="text-gray-800">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Test Results</h1>
          {results.length === 0 ? (
            <div className="text-center text-gray-500 text-xl">No results available</div>
          ) : (
            results.map((result) => (
              <div key={result._id} className="mb-6 border-b border-gray-300 pb-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{result.testName}</h2>
                <div className="text-gray-700 mb-2">
                  <p><strong>Score:</strong> {result.score} / {result.totalScore}</p>
                  <p><strong>Accuracy:</strong> {result.accuracy.toFixed(2)}%</p>
                </div>
                <button
                  onClick={() => viewResultDetails(result.test)}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default ResultList;
