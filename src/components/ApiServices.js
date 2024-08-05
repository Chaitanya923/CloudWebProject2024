// src/utils/apiService.js
import axios from 'axios';

// Create an instance of axios with default settings
const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com', // Set your base URL here
  timeout: 10000, // Set a timeout for requests
});

// Handle GET request
export const get = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('API GET error:', error);
    throw error; // Rethrow error for further handling
  }
};

// Handle POST request
export const post = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API POST error:', error);
    throw error;
  }
};

// Handle PUT request
export const put = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API PUT error:', error);
    throw error;
  }
};

// Handle DELETE request
export const remove = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('API DELETE error:', error);
    throw error;
  }
};
