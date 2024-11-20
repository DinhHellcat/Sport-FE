// src/services/apiService.js
import axios from "axios";
import endpoints from "../config/api";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (credentials) => {
  try {
    const response = await apiClient.post(endpoints.auth.login, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (userDetails) => {
  try {
    const response = await apiClient.post(endpoints.auth.register, userDetails);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};
