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



export default { registerUser, verifyOTP, loginUser };

