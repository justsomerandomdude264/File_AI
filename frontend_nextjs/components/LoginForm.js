"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * LoginForm Component
 * Handles user login flow.
 */
export default function LoginForm() {
  // Authentication context and router instance
  const { login, token } = useAuth();
  const router = useRouter();

  // State for managing email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Add loading state
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set loading state to true
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      // Clear input fields after submission
      setEmail("");
      setPassword("");
      
      // Redirect on successful login, else show error message
      if (success.status) {
        router.push("/dashboard");
      } else {
        alert(success.error);
      }
    } catch (error) {
      console.log(error)
      alert("Login failed. Please try again.");
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        {/* Login heading */}
        <h2 className="text-2xl font-bold text-center dark:text-gray-200">Login</h2>
        
        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          {/* Password input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          {/* Login button with animation */}
          <button
            type="submit"
            className={`w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 relative overflow-hidden ${
              isLoading ? 'cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                {/* Invisible text to maintain button size */}
                <span className="opacity-0">Login</span>
                
                {/* Animated loader */}
                <span className="absolute inset-0 flex items-center justify-center">
                  {/* Pulse effect behind the spinner */}
                  <span className="absolute w-8 h-8 bg-white rounded-full opacity-30 animate-ping"></span>
                  
                  {/* SVG spinner */}
                  <svg className="animate-spin h-5 w-5 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  
                  {/* Login text slides in from right */}
                  <span className="ml-2 relative z-10 animate-pulse">Logging in...</span>
                </span>
              </>
            ) : (
              <>
                {/* Default state - subtle shine animation */}
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute left-0 top-0 h-full w-10 bg-white opacity-10 transform -skew-x-20 transition-all duration-1000 ease-out group-hover:translate-x-full"></span>
                </span>
              </>
            )}
          </button>
        </form>
        
        {/* Registration link */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-indigo-500">Register</Link>
        </p>
      </div>
    </div>
  );
}