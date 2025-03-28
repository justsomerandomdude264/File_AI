'use client';
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// Creating authentication context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // State variables for authentication
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // State for storing error messages

  /**
   * Logout function to clear token and user data
   * Calls backend API to invalidate token
   */
  const logout = useCallback(async () => {
    try {
      const response = await axios.post('http://localhost:8000/user_auth/logout/', { token: token });
      
      if (response.status === 200) {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
      } else {
        setError(response.data?.error || 'Error logging out.');
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.log("Logout failed", error);
      setError('Logout failed, please try again later.');
    }
  }, [token]);

  /**
   * Function to check authentication token validity
   */
  const checkAuth = useCallback(async (authToken) => {
    try {
      const response = await axios.post('http://localhost:8000/user_auth/authenticate_token/', { token: authToken });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log("Token verification failed", error);
      setError('Token verification failed, please log in again.');
      logout();
      return error;
    }
  }, [logout]);

  // Effect hook to initialize token from local storage
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      checkAuth(savedToken);
    }
  }, [checkAuth]);

  /**
   * Login function - authenticates user and retrieves token
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/user_auth/login/', { email, password });
  
      if (response.status === 202 && response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        await checkAuth(response.data.token);
        return { status: true, error: "Successfully Logged In !!!" };
      } else {
        const message = response.data?.error || 'Invalid credentials, please try again.';
        setError(message);
        return { status: false, error: message };
      }
    } catch (error) {
      console.log("Login failed", error);
      setError('Login failed, please check your credentials and try again.');
      return { status: false, error: error.response?.data?.error || 'An unexpected error occurred.' };
    }
  };

  /**
   * Register function - registers a new user and retrieves token
   */
  const register = async (username, email, password, phoneno) => {
    try {
      const response = await axios.post('http://localhost:8000/user_auth/register/', { username, email, password, phoneno });
  
      if (response.status === 201 && response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("authToken", response.data.token);
        await checkAuth(response.data.token);
        return { status: true };
      } else {
        const message = response.data?.error || 'Registration failed, please try again.';
        setError(message);
        return { status: false, error: message };
      }
    } catch (error) {
      console.log("Registration failed", error);
      setError('Registration failed, please check your details and try again.');
      return { status: false, error: error.response?.data?.error || 'An unexpected error occurred.' };
    }
  };

  /**
   * Function to delete user account
   */
  const deleteAccount = async (authToken = token) => {
    try {
      const response = await axios.delete('http://localhost:8000/user_auth/delete_account', { data: { authToken } });
      if (response.status === 200) {
        console.log("Account deleted successfully:", response.data.message);
        alert("Your account has been deleted successfully.");
      }
    } catch (error) {
      alert(error.response ? `Failed to delete account: ${error.response.data.error}` : "An unexpected error occurred while deleting your account.");
    }
  };

  /**
   * Function to check token validity
   */
  const checkTokenValidity = async (authToken = token) => {
    try {
      const response = await axios.post('http://localhost:8000/user_auth/authenticate_token/', { token: authToken });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log("Token verification failed", error);
      return error;
    }
  };

  /**
   * Function to send OTP (either via email or phone number)
   */
  const sendOtp = async (type, providedToken = token) => {
    try {
      const url = type === 'email' ? 'send_otp_email/' : 'send_otp_phoneno/';
      const response = await axios.post(`http://localhost:8000/user_auth/${url}`, { token: providedToken });
      return response.status === 200 ? response.data.message : "Failed to send OTP.";
    } catch (error) {
      console.log("Error sending OTP", error);
      return error.response?.data?.detail?.error || "Failed to send OTP.";
    }
  };

  /**
   * Function to verify OTP
   */
  const verifyOtp = async (otp, otp_type) => {
    try {
      const response = await axios.post('http://localhost:8000/user_auth/check_otp/', { token, otp, otp_type });
      return response.status === 200 ? true : "Failed to verify OTP or OTP is wrong.";
    } catch (error) {
      console.log("Error verifying OTP", error);
      return error.response?.data?.error || "Failed to verify OTP or OTP is wrong.";
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, error, login, register, deleteAccount, logout, checkTokenValidity, verifyOtp, sendOtp }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);