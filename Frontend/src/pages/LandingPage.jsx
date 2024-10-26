import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex  justify-center bg-[url('./assets/bg1.jpg')] bg-fixed bg-cover" 
    style={{ backgroundPosition: 'top center', backgroundSize: '115%' }}>
      
      {/* Full-screen Blur Background */}
      {/* <div className="absolute inset-0 bg-white bg-opacity-0 backdrop-blur-md z-0"></div> */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center p-8 md:p-16">
        {/* Heading */}
        <h1 className="text-3xl md:text-8xl  font-extrabold mb-4 text-gray-300 font-sans">
          Clarify<span className="text-purple-500" >Me</span>
        </h1>
        
        {/* Short explanation */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-300 mb-6 font-light text-">
          <b className="text-gray-300"> Bridging the gap between curiosity and clarity. 
          Your one stop platform for quick, accurate answers and detailed explanations.</b>
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link to='/login'
            className="bg-white bg-opacity-20 border border-white border-opacity-40 text-white py-3 px-8 rounded-full backdrop-blur-sm shadow-lg hover:bg-purple-500  hover:border-opacity-50 hover:backdrop-blur-0 transition duration-300 ease-in-out text-lg sm:text-xl"
            // style={{ backdropFilter: 'blur(10px)' }}
          >
          Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;






