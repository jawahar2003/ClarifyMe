import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import connectivity from '../utils/connectivity';



const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

const user = await connectivity.loginUser({username,password});
if(user.status===200){
    alert('User logged in successfully!');
    console.log(user);
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    //navigate('/dashboard');
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
            Welcome Back!
          </h2>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 bg-gray-800 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-white">Login </h2>
          <p className="text-gray-400">
            Don't have an account? <a href="#" className="text-purple-500"><Link to="/connectivity">connectivity here</Link></a>
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
        
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
