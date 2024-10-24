import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clarifyMeLogo from '../assets/logo1.svg';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/store';
import connectivity from '../utils/connectivity';



const Home = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const questions = useStore((state) => state.questions);
  const setQuestions = useStore((state) => state.setQuestions);


  
  // State for managing replies visibility and new reply text
  const [repliesVisible, setRepliesVisible] = useState({});
  const [newReply, setNewReply] = useState('')
 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await connectivity.fetchQuestions();
        setQuestions(questions); // Update your state with the fetched questions
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [setQuestions]);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
    console.log('from handleLogout', user);
  };

  const toggleReplies = (questionId) => {
    setRepliesVisible((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleReplySubmit = async(questionId) =>{
    const userData = JSON.parse(localStorage.getItem('loggedUser'))
    console.log(questionId)
    console.log(userData.data.user.token)
    const response = await connectivity.postReply(questionId,{body:newReply},userData.data.user.token)
   
  }


 

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="bg-gray-800 p-4 flex items-center justify-between">
        {/* Left: Logo and ClarifyMe Title */}
        <div className="flex items-center">
          <img src={clarifyMeLogo} alt="ClarifyMe Logo" className="h-10 w-10 object-contain" />
          <span className="text-2xl font-bold text-purple-500">ClarifyMe</span>
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

          {questions.map(question => (
            <div key={question._id} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{question.title}</h3>
              <p className="text-gray-200 mt-2">{question.body}</p>
              <div className="mt-4 flex justify-between">
                <button className="text-purple-500 hover:text-purple-400" onClick={() => toggleReplies(question._id)}>
                  {repliesVisible[question._id] ? 'Hide Answers' : 'View Answers'}
                </button>
                <span className="text-gray-500">~{question.author.username}</span>
              </div>

              {/* Replies Section */}
              {repliesVisible[question._id] && (
                <div  className="mt-4 rounded-md">
                  
                  <h4 className="text-lg font-semibold">Replies:</h4>
                  {/* Here you can map through replies if you have a replies array */}
                  {question.replies.map(reply=>
                    <div key={reply._id} className="bg-gray-700 p-2 rounded-md mt-2 flex justify-between">
                    <p className="text-gray-200">{reply.body}</p>
                    <p className="text-gray-500 ">~{reply.author.username}</p>
                  </div>
                  )
                  }

                  {/* New Reply Input */}
                  <textarea
                    value={newReply|| ''}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full p-2 rounded-md bg-gray-600 text-white placeholder-gray-400 mt-2"
                  />
                  <button
                    onClick={() => handleReplySubmit(question._id)}
                    className="mt-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Submit Reply
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add more question cards as needed */}
        </main>
      </div>
    </div>
  );
};

export default Home;
