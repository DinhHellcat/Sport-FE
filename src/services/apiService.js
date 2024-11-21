import axios from "axios";
import endpoints from "../config/api";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handler
const handleApiError = (error) => {
  if (error.response) {
    console.error(
      `API Error: ${error.response.status} - ${error.response.data?.message || "Unknown error"}`
    );
    throw new Error(error.response.data?.message || "API Error");
  } else {
    console.error("Error: No response from server.");
    throw new Error("No response from server.");
  }
};

// Register user
export const register = async (userDetails) => {
  try {
    const response = await apiClient.post(endpoints.auth.register, userDetails);
    if (response.status === 200) {
      return response.data; // Return the response if successful
    }
    throw new Error(response.data?.message || "Unexpected error occurred.");
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message); // Backend-provided error
    }
    throw new Error("No response from server."); // Default fallback error
  }
};

// Confirm email
export const confirmEmail = async (confirmationDetails) => {
  try {
    const response = await apiClient.post(endpoints.auth.emailConfirm, confirmationDetails);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Login API
export const login = async (credentials) => {
  try {
    const response = await apiClient.post(endpoints.auth.login, credentials);
    return response.data; // Return tokens
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message); // Handle API error
    }
    throw new Error("Login failed. Please try again.");
  }
};

export default apiClient;
