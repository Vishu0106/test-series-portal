import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import HomeLayout from '../Layouts/HomeLayout.jsx';
import { useParams } from 'react-router-dom';
import axiosInstance from '../config/axiosInastance.js';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const ResultsPage = () => {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get(`/results/?id=${id}`);
        if (response.status === 200) {
          setResults(response.data.results);
          toast.success('Results fetched successfully');
        } else {
          setError('Error fetching results');
          toast.error('Error fetching results');
        }
      } catch (err) {
        setError('Error fetching results');
        toast.error('Error fetching results');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!results) return <div>No results found</div>;

  // Prepare chart data
  const scoreData = {
    labels: ['Score', 'Total Score'],
    datasets: [
      {
        label: 'Score',
        data: [results.score, results.totalScore],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const accuracyData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [results.accuracy, 100 - results.accuracy],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  const answersData = {
    labels: results.answers.map((_, index) => `Q${index + 1}`),
    datasets: [
      {
        label: 'Correct Answers',
        data: results.answers.map(a => a.isCorrect ? 1 : 0),
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Incorrect Answers',
        data: results.answers.map(a => !a.isCorrect ? 1 : 0),
        backgroundColor: '#F44336',
      },
    ],
  };

  return (
    <HomeLayout>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
        <h1 className="text-4xl font-bold mb-6">Test Results</h1>
        
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Score</h2>
          <div className="w-full h-80">
            <Bar data={scoreData} />
          </div>
        </div>

        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Accuracy</h2>
          <div className="w-full h-80">
            <Doughnut data={accuracyData} />
          </div>
        </div>

        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Question-wise Results</h2>
          <div className="w-full h-80">
            <Line data={answersData} />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ResultsPage;
