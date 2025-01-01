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

  const [repliesVisible, setRepliesVisible] = useState({});
  const [newReply, setNewReply] = useState('');
  const [isComposeVisible, setIsComposeVisible] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', body: '' });
  const [search, setSearch] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([
    'Programming',
    'Mathematics',
    'Science',
    'Languages',
  ]);
  
  // State to store filtered questions
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await connectivity.fetchQuestions();
        setQuestions(questions);
        setFilteredQuestions(questions); // Initialize filtered questions
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [setQuestions]);

  useEffect(() => {
    // Filter questions whenever the search term changes
    if (search.trim() === '') {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(questions.filter(question =>
        question.body.toLowerCase().includes(search.toLowerCase()) || 
        question.title.toLowerCase().includes(search.toLowerCase())
      ));
    }
  }, [search, questions]);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const toggleReplies = (questionId) => {
    setRepliesVisible((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleReplySubmit = async (questionId) => {
    const userData = JSON.parse(localStorage.getItem('loggedUser'));
    const response = await connectivity.postReply(
      questionId,
      { body: newReply },
      userData.data.user.token
    );
    console.log(response.data);
    setNewReply('');
    const questionToUpdate = questions.find(q => q._id === questionId);
    
    questionToUpdate.replies = questionToUpdate.replies.concat({ _id: response.data._id, body: response.data.body, author: { username: userData.data.user.username } });
    const updatedQuestions = questions.map(q => q._id !== questionId ? q : questionToUpdate);
    setQuestions(updatedQuestions);
  };

  const handleComposeSubmit = async () => {
    const userData = JSON.parse(localStorage.getItem('loggedUser'));
    try {
      const response = await connectivity.postQuestion(newQuestion, userData.data.user.token);
      console.log(response.data);
      response.data.author = {
        id: response.data.author, // Assuming the previous value was the author ID
        username: userData.data.user.username,
      };

      const newQuestions = [...questions, response.data];
      setQuestions(newQuestions);
      setIsComposeVisible(false);
      setNewQuestion({ title: '', body: '' });
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="bg-gray-800 p-4 flex items-center justify-between sticky top-0 z-20 border-b-2 border-gray-700">
        <div className="flex items-center">
          <img src={clarifyMeLogo} alt="ClarifyMe Logo" className="mt-2 h-10 w-10 object-contain" />
          <span className="text-gray-300 text-2xl font-bold ">Clarify<span className='text-gray-500'>Me</span></span>
        </div>

        <div className="flex-grow mx-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for questions, topics..."
            className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="flex items-center space-x-4" onClick={handleLogout}>
          <Link to="/login" className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Logout
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex ">
      <aside className="w-1/4 bg-gray-800 p-4 space-y-4 hidden md:block sticky top-[72px] h-full">
          <h2 className="text-gray-400 text-xl font-bold ">Topics</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index} onClick={()=> setSearch(category)}className="bg-gray-700 p-2 rounded-md hover:bg-purple-500 transition">
                {category}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add new category"
              className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 mt-2"
            />
            <button
              onClick={handleAddCategory}
              className="mt-2 bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition w-full"
            >
              Add Category
            </button>
          </div>
        </aside>

        {/* Middle/Right Side: Q&A Section */}
        <main className="flex-grow space-y-1 border-l-2 border-gray-700">
          <div className="sticky top-[72px] z-10 bg-gray-800 p-4 flex justify-between items-center border-b-2 border-gray-700">
            <h2 className="text-gray-400 text-2xl font-bold ">Discussions</h2>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              onClick={() => setIsComposeVisible(true)}
            >
              <span className='text-xl'>+</span> New Question
            </button>
          </div>

          {filteredQuestions.map((question) => (
            <div key={question._id} className="bg-gray-800 p-4 m-y-1">
              <h3 className="text-xl font-bold">{question.title}</h3>
              <p className="text-gray-200 mt-2">{question.body}</p>
              <div className="mt-4 flex justify-between">
                <button
                  className="text-purple-500 hover:text-purple-400"
                  onClick={() => toggleReplies(question._id)}
                >
                  {repliesVisible[question._id] ? (
                    <>Hide replies <span className="text-gray-500 text-xs">▲</span></> // Up arrow for hiding answers
                  ) : (
                    <>View replies <span className="text-gray-500 text-xs">▼</span></> // Down arrow for viewing answers
                  )}
                </button>
                  <div>
                    <span className="text-gray-500">~{question.author.username+" | "}</span>
                    <span className="text-gray-500">
                      {new Date(question.date).toLocaleString('en-GB', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                      })}
                    </span>
                  </div>
              </div>

              {repliesVisible[question._id] && (
                <div className="mt-4 rounded-md">
                  {question.replies.map((reply) => (
                    <div key={reply._id} className="bg-gray-700 p-2 rounded-md mt-2 flex justify-between">
                      <p className="text-gray-200">{reply.body}</p>

                      <div>
                        <p className="text-gray-500">~{reply.author.username}</p>
                        <span className="text-gray-500">
                            {new Date(reply.date).toLocaleString('en-GB', {
                              dateStyle: 'short',
                              timeStyle: 'short'
                            })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <textarea
                    value={newReply || ''}
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

          {/* Compose Question Overlay */}
          {isComposeVisible && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg w-3/4 md:w-1/2">
                <h3 className="text-xl font-bold text-gray-400 mb-4">Compose a New Question</h3>
                <input
                  type="text"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                  placeholder="Title"
                  className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400"
                />
                <textarea
                  value={newQuestion.body}
                  onChange={(e) => setNewQuestion({ ...newQuestion, body: e.target.value })}
                  placeholder="Body"
                  className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 mb-4"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsComposeVisible(false)}
                    className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleComposeSubmit}
                    className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Post Question
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
