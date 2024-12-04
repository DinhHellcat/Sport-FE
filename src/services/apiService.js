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
      return response.data;
    }
    throw new Error(response.data?.message || "Unexpected error occurred.");
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("No response from server.");
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
    return response.data; 
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message); 
    }
    throw new Error("Login failed. Please try again.");
  }
};

// Change Password API call
export const changePassword = async (oldPassword, newPassword) => {
  const token = localStorage.getItem('accessToken');  
  if (!token) {
    throw new Error('No access token found.');
  }

  try {
    const response = await axios.post(endpoints.auth.changePassword, {
      oldPassword,
      newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });

    if (response.status === 200) {
      return response.data;  
    }
    throw new Error('Failed to change password.');
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to change password.');
  }
};

// Get Product List
export const getProdList = async () => {
  try {
    const response = await axios.get(endpoints.prod.list);
    
    // Processing the response data to map DynamoDB's format to frontend format
    const products = response.data.map(item => ({
      id: item.id.S,  // DynamoDB 'S' type -> String
      name: item.title.S,  // DynamoDB 'S' type -> String
      category: item.category.S,  // DynamoDB 'S' type -> String
      description: item.description.S,  // DynamoDB 'S' type -> String
      picture: item.images.SS[0],  // DynamoDB 'SS' type -> Array of Strings (get the first image)
      price: parseFloat(item.price.N),  // DynamoDB 'N' type -> Number
      quantity: parseInt(item.quantity.N),  // DynamoDB 'N' type -> Integer
    }));

    return products; 
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw new Error("Failed to fetch product list.");
  }
};

//Get Product Detail
export const getProdDetail = async (id) => {
  try {
    const response = await axios.get(endpoints.prod.getById(id));
    return response.data; 
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw new Error("Failed to fetch product details.");
  }
};

//Admin Login
export const loginAdmin = async (credentials) => {
  try {
    const response = await apiClient.post(endpoints.admin.auth.login, credentials);
    return response.data; 
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message); 
    }
    throw new Error("Login failed. Please try again.");
  }
};

export default apiClient;
