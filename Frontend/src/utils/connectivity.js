import axios from 'axios';



const baseURL = 'http://localhost:3000/api'
const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/users/register/`, userData);
        console.log('User registered:', response.status,response.data.message);
        return response;
    } catch (error) {
        console.error('Error registering user:', error.response.data);
        
    }
}

const verifyOTP = async (otp) => {
    try {
        const response = await axios.post(`${baseURL}/users/verifyotp`, otp);
        return response
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
}

const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${baseURL}/users/login`, credentials);
        console.log('User logged in:', response.status, response.data.message);
        return response;
    } catch (error) {
        console.error('Error logging in user:', error.response.data);
        throw error;
    }
}

const fetchQuestions = async()=>{
    try{
        const response = await axios.get(`${baseURL}/questions/all`)
        // console.log(response.data)
        return response.data
    }
    catch(error){
        console.log("Error fetching questions")
        throw error;
    }
}


const postReply = async (questionId, replyData,token) => {
    try {
        // Retrieve the JWT from local storage or wherever it is stored
        
        
        // Set up the headers
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Set content type if necessary
            }
        };

        // Make the POST request with the reply data
        const response = await axios.post(`${baseURL}/replies/${questionId}`, replyData, config);
        console.log(response);
        return response;
    } catch (error) {
        console.log("Error posting replies", error);
    }
}



const postQuestion = async (questionData, token) => {
    try {
        // Set up the headers with the JWT for authentication
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Set content type if necessary
            }
        };

        // Make the POST request to submit a new question
        const response = await axios.post(`${baseURL}/questions/question`, questionData, config);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error posting question", error);
    }
};



export default { registerUser, verifyOTP, loginUser, fetchQuestions, postReply , postQuestion};

