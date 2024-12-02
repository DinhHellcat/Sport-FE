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

// Change Password API call
export const changePassword = async (oldPassword, newPassword) => {
  const token = localStorage.getItem('authToken');  // Fetch token from localStorage
  if (!token) {
    throw new Error('No access token found.');
  }

  try {
    const response = await axios.post(endpoints.auth.changePassword, {
      oldPassword,
      newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include token in request header
      },
    });

    if (response.status === 200) {
      return response.data;  // Return response on success
    }
    throw new Error('Failed to change password.');
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to change password.');
  }
};

export const getProdList = async () => {
  try {
    const response = await axios.get(endpoints.prod.list);
    return response.data; // Return product list on success
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw new Error("Failed to fetch product list.");
  }
};

export const getProdDetail = async (id) => {
  try {
    const response = await axios.get(endpoints.prod.getById(id));
    return response.data; // Return product detail on success
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw new Error("Failed to fetch product details.");
  }
};

export default apiClient;
