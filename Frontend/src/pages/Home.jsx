import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import clarifyMeLogo from '../assets/logo1.svg'
import {useNavigate} from 'react-router-dom'
import useStore from '../store/store'




const Home = () => {

const navigate = useNavigate()
const user = useStore(state => state.user)
const setUser = useStore(state => state.setUser)
useEffect(()=>{

  if(!user){
    navigate('/login')
  }
},[user,navigate])

const handleLogout = ()=>{

  localStorage.removeItem('loggedUser')
  setUser(null)
  console.log('from handlelogout',user)
}


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="bg-gray-800 p-4 flex items-center justify-between">
        {/* Left: Logo and ClarifyMe Title */}
        <div className="flex items-center">
        <img src={clarifyMeLogo} alt="ClarifyMe Logo" className="h-10 w-10  object-contain "/>

          <span className="text-2xl font-bold text-purple-500">
            ClarifyMe
          </span>
        </div>
        
        {/* Center: Search Bar */}
        <div className="flex-grow mx-8">
          <input 
            type="text"
            placeholder="Search for questions, topics..."
            className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Right: Profile/Logout*/}
        <div className="flex items-center space-x-4" onClick={handleLogout}>
          
          <Link to="/login" className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Logout
          </Link>
         
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Left Side: Categories */}
        <aside className="w-1/4 bg-gray-800 p-4 space-y-4 mt-3 ml-3 hidden md:block rounded-xl">
          <h2 className="text-xl font-bold text-purple-500">Categories</h2>
          <ul className="space-y-2">
            {/* Placeholder categories - you can update these */}
            <li className="bg-gray-700 p-2 rounded-md hover:bg-purple-500 transition">
              <Link to="#" className="block">Programming</Link>
            </li>
            <li className="bg-gray-700 p-2 rounded-md hover:bg-purple-500 transition">
              <Link to="#" className="block">Mathematics</Link>
            </li>
            <li className="bg-gray-700 p-2 rounded-md hover:bg-purple-500 transition">
              <Link to="#" className="block">Science</Link>
            </li>
            <li className="bg-gray-700 p-2 rounded-md hover:bg-purple-500 transition">
              <Link to="#" className="block">Languages</Link>
            </li>
          </ul>
        </aside>

        {/* Middle/Right Side: Q&A Section */}
        <main className="flex-grow p-4 space-y-4">
          <h2 className="text-2xl font-bold text-purple-500">Question & Answer Section</h2>

          {/* Sample Question Card */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold">How does the JavaScript event loop work?</h3>
            <p className="text-gray-400 mt-2">
              The JavaScript event loop is a mechanism that allows JavaScript to perform non-blocking operations...
            </p>
            <div className="mt-4 flex justify-between">
              <button className="text-purple-500 hover:text-purple-400">View Answers</button>
              <span className="text-gray-500">5 Answers</span>
            </div>
          </div>

          {/* Add more question cards as needed */}
        </main>
      </div>
    </div>
  );
};

export default Home;
