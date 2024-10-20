import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import register from '../utils/connectivity';
import useStore from '../store/store';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const email = useStore((state) => state.email);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    const response = await register.verifyOTP({ email, otp });
    console.log(response);
    if (response.status === 200) {
      alert('OTP verified successfully! Please log in to continue.');
      navigate('/login');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Section */}
      <div
        className="w-1/2 bg-cover bg-center relative hidden md:block"
        style={{ backgroundImage: "url('path-to-your-image.jpg')" }} // Change path-to-your-image.jpg to actual image path
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 p-8 flex flex-col items-start justify-center h-full">
          <h2 className="text-white text-4xl font-bold mb-6">
            Verify Your OTP
          </h2>
        </div>
      </div>

      {/* Right Side - OTP Form */}
      <div className="w-full md:w-1/2 bg-gray-800 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-white">Verify OTP</h2>
          <p className="text-gray-400">
            Please enter the OTP sent to <span className="font-semibold">{email}</span>.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-400">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="mt-1 p-2 block w-full bg-gray-700 text-white rounded-md border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter OTP"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
