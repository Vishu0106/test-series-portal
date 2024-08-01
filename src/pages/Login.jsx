/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import image from '../assets/Logging_in.gif'
import HomeLayout from '../Layouts/HomeLayout';
import { Link } from 'react-router-dom';
import axiosInstance from '../config/axiosInastance';
import toast from 'react-hot-toast';
import axios from 'axios';
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const { email, password } = formData;
    
      const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = async (e) => {
        try {
          e.preventDefault();
          console.log(formData);
          const loginRespone = await axiosInstance.post('/users/login', {
            ...formData
          });
          if(loginRespone.status === 200){
            toast.success('Login Successfull');
            localStorage.setItem('token', loginRespone.data.token);
            localStorage.setItem('user', loginRespone.data.user);
            localStorage.setItem('isAdmin', loginRespone.data.isAdmin);
            localStorage.setItem('isLoggedIn', true);
            window.location.href = '/';
          }
        } catch (error) {
          console.error('Error logging in:', error);
          toast.error('Invalid email or password');
          
        }
      };
    return(
        <HomeLayout>
            <div className='flex items-center justify-center'>
               <div className=' top-[-90px] relative w-1/2'>
                 <img src={image} alt="LoginImage" className=''/>
               </div>
               <div className="min-h-screen flex items-center justify-center w-1/2">
                    <div className="bg-white p-8 rounded-lg  w-full max-w-md">
                      <form onSubmit={onSubmit}>
                        <div className="mb-4 flex items-center justify-center gap-3">
                          <label className="block text-gray-700 font-semibold mb-2">Email</label>
                          <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="mb-4 flex items-center justify-center gap-3">
                          <label className="block text-gray-700 font-semibold mb-2">Password</label>
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                          Submit
                        </button>
                      </form>
                      <div className="mt-4 text-center">
                        <p> Don't have an account?<Link to="/signup" className="text-blue-500 hover:underline">
                          Sign up
                        </Link>
                        </p>
                      </div>
                    </div>
                 </div>
            </div>
        </HomeLayout>
    )
}

export default Login;