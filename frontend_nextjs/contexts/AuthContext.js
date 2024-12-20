'use client';
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // New state for error messages

  // Memoize logout so it can be safely used in dependencies
  const logout = useCallback(async () => {
    try {
      const response = await axios.post('http://localhost:8000/user_auth/logout/', { token: token });
      
      if (response.status === 200) {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
      } else {
        const message = response.data?.error || 'Error logging out.';
        setError(message); // Set error message
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.log("Logout failed", error); // Use console.log instead of .error
      setError('Logout failed, please try again later.'); // Specific error message
    }
  }, [token]);

  // Memoize checkAuth so it can be safely used as a dependency
  const checkAuth = useCallback(async (authToken) => {
    try {
      const response = await axios.post('http://localhost:8000/user_auth/authenticate_token/', { token: authToken });
      const userData = response.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.log("Token verification failed", error);
      setError('Token verification failed, please log in again.'); // Specific error message
      logout();
      return error;
    }
  }, [logout]);

  // Initialize token and check if user is authenticated on load
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      checkAuth(savedToken);
    }
  }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const credentials = { email, password };
      const response = await axios.post('http://localhost:8000/user_auth/login/', credentials);
  
      if (response.status === 202 && response.data.token) {
        const receivedToken = response.data.token;
        setToken(receivedToken);
        localStorage.setItem("authToken", receivedToken);
  
        await checkAuth(receivedToken);
        return {
          status: true,
          error: "Succesfully Logged In !!!"
        };
      } else {
        // If the response status is not 200, handle the error
        const message = response.data?.error || 'Invalid credentials, please try again.';
        setError(message); // Set the error message
        return {
          status: false,
          error: message // Return the error message from the server or a default one
        };
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.log("Login failed", error);
      setError('Login failed, please check your credentials and try again.'); // Specific error message
      return {
        status: false,
        error: error.response?.data?.error || 'An unexpected error occurred.' // Display error message from the server if available
      };
    }
  };

  const register = async (username, email, password, phoneno) => {
    try {
      const credentials = { username, email, password, phoneno };
      const response = await axios.post('http://localhost:8000/user_auth/register/', credentials);
  
      if (response.status === 201 && response.data.token) {
        const receivedToken = response.data.token;
        setToken(receivedToken);
        localStorage.setItem("authToken", receivedToken);
  
        await checkAuth(receivedToken);
        return {
          status: true
        };
      } else {
        // If response status is not 201, handle the error
        const message = response.data?.error || 'Registration failed, please try again.';
        setError(message); // Update the error state with the message
        return {
          status: false,
          error: message // Return the error message from the server or a default one
        };
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.log("Registration failed", error);
      setError('Registration failed, please check your details and try again.'); // Specific error message
      return {
        status: false,
        error: error.response.data.error || 'An unexpected error occurred.' // Display error message from the server if available
      };
    }
  };

  // delete account
  const deleteAccount = async ( authToken = token ) => {
    try {
      const response = await axios.delete('http://localhost:8000/user_auth/delete_account', {
        data: { authToken },
      });
      if (response.status === 200) {
        console.log("Account deleted successfully:", response.data.message);
        alert("Your account has been deleted successfully.");
      }
      
    } catch (error) {
      if (error.response) {
        alert(`Failed to delete account: ${error.response.data.error}`);
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred while deleting your account.");
      }
    }
  }
  
  // check if token is valid
  const checkTokenValidity = async ( authToken = token ) => {
    try {
      const response = await axios.post('http://localhost:8000/user_auth/authenticate_token/', { token: authToken });
      const userData = response.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.log("Token verification failed", error);
      return error;
    }
  }

  // OTP Methods
  const sendOtp = async (type, providedToken = token) => {
    try {
      const url = type === 'email' ? 'send_otp_email/' : 'send_otp_phoneno/';
      const response = await axios.post(`http://localhost:8000/user_auth/${url}`, { token: providedToken });
      if (response.status == 200) {
        return response.data.message;
      } else {
        console.log("Error sending OTP", error);
        return error.response?.data?.detail.error || "Failed to send OTP.";
      }
    } catch (error) {
      console.log("Error sending OTP", error);
      return error.response?.data?.detail.error || "Failed to send OTP.";
    }
  };

  const verifyOtp = async (otp, otp_type) => {
    try {
      const response = await axios.post('http://localhost:8000/user_auth/check_otp/', { token, otp, otp_type });
      if (response.status == 200) {
        return true
      } else {
        console.log("Error verifying OTP");
        return error.response.data.error || "Failed to verify OTP or OTP is wrong.";
      }
    } catch (error) {
      console.log("Error verifying OTP", error);
      return error.response.data.error || "Failed to verify OTP or OTP is wrong.";
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, error, login, register, deleteAccount, logout, checkTokenValidity, verifyOtp, sendOtp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
