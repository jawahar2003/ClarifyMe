import React, { useState } from 'react';
import  register  from '../utils/connectivity';
import useStore from '../store/store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const RegistrationForm = () => {
  const username = useStore((state) => state.userName);
  const setUserName = useStore((state) => state.setUserName);
  const email = useStore((state) => state.email);
  const setEmail = useStore((state) => state.setEmail);
  const password = useStore((state) => state.password);
  const setPassword = useStore((state) => state.setPassword);
  const confirmPassword = useStore((state) => state.confirmPassword);
  const setConfirmPassword = useStore((state) => state.setConfirmPassword);
    

    const navigate = useNavigate();
  
    const handleSubmit = async(e) => {
      e.preventDefault();
     
      // Add logic to handle form submission and password validation
      if (password == confirmPassword) {
      const response =  await register.registerUser({username, email, password})
      if(response.status===200){
        alert('User registered successfully! Please check your email for the OTP');
        // Redirect to OTP verification page
        navigate('/otp');
       

      }else{
        alert('Error registering user:', response);
      }

      

      } else {
        // Handle successful form submission
        alert('Form submitted successfully!');
      }
    };
  
    return (
      <div className="min-h-screen flex">
        
        {/* Left Side - Image Section */}
        <div
          className="w-1/2 bg-cover bg-center relative hidden md:block"
          style={{ backgroundImage: "url('path-to-your-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-8 flex flex-col items-start justify-center h-full">
            <a href="#" className="text-white text-lg mb-6">Back to website</a>
            <h2 className="text-white text-4xl font-bold mb-6">
              Capturing Moments, Creating Memories
            </h2>
          </div>
        </div>
  
        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 bg-gray-800 flex items-center justify-center">
          <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white">Create an account</h2>
            <p className="text-gray-400">
              Already have an account? <a href="#" className="text-purple-500"><Link to='/login'>Log in</Link></a>
            </p>
  
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="mt-1 p-2 block w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
  
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 p-2 block w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
  
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 p-2 block w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
  
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-400">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="mt-1 p-2 block w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
  
              <div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default RegistrationForm