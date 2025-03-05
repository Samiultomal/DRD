import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}register/`, userData);
    return response.data; 
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data; 
    }
    throw new Error('Registration failed. Please try again.');
  }
};


export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}login/`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    }
    throw new Error('Login failed. Please try again.');
  }
};

