import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout';
import axiosInstance from '../config/axiosInastance';
import toast from 'react-hot-toast';

const SignupPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const { email, password } = formData;

  const validateForm = () => {
    const formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) formErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) formErrors.email = 'Invalid email address';

    if (!password) formErrors.password = 'Password is required';

    return formErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axiosInstance.post('/users/register', formData);
        if (response.status === 201) {
          toast.success('Signup successful');
            navigate('/login');
          // Redirect or handle post-signup actions
        } else {
          toast.error('Error signing up');
        }
      } catch (error) {
        toast.error('Error signing up');
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link></p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default SignupPage;
