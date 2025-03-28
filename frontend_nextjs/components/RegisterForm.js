'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * RegisterForm Component
 * Handles user registration flow including:
 * 1. Initial registration with username, email, phone, password
 * 2. OTP verification for both email and phone
 */
export default function RegisterForm() {
  const { register, sendOtp, verifyOtp } = useAuth();
  const router = useRouter();

  // ===== STATE MANAGEMENT =====
  // Registration form data
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Registration flow states
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // OTP verification states
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [currentVerification, setCurrentVerification] = useState(null); // 'email' or 'phone'

  // Redirect to login if both email and phone verified
  useEffect(() => {
    if (emailVerified && phoneVerified) {
      router.push('/login');
    }
  }, [emailVerified, phoneVerified, router]);

  // ===== HELPER FUNCTIONS =====
  // Reset all form fields and states
  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
    setOtp('');
    setCurrentVerification(null);
    setIsLoading(false);
  };

  // ===== EVENT HANDLERS =====
  /**
   * Handle initial registration form submission
   * Validates inputs and calls the register API
   */
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Input validation
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Validate phone number format (international format with + sign)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Please enter a valid phone number with country code (e.g., +1234567890)');
      return;
    }

    // Submit registration request
    setIsLoading(true);
    try {
      const result = await register(username, email, password, phoneNumber);
      if (result.status) {
        alert('Registration successful! Proceed to verify your email and phone number.');
        setIsRegistered(true);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.log(error)
      alert('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send OTP to either email or phone
   * @param {string} method - 'email' or 'phone'
   */
  const handleSendOtp = async (method) => {
    setIsLoading(true);
    try {
      const result = await sendOtp(method);
      if (result) {
        setCurrentVerification(method);
        alert(`OTP sent to your ${method}`);
      } else {
        alert(`Failed to send OTP to your ${method}`);
      }
    } catch (error) {
      console.log(error)
      alert(`Error sending OTP to ${method}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verify OTP for the current verification method
   */
  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const result = await verifyOtp(otp, currentVerification);
      
      if (result === true) {
        // Mark the appropriate verification method as completed
        if (currentVerification === 'email') {
          setEmailVerified(true);
          alert('Email verified successfully!');
        } else if (currentVerification === 'phone') {
          setPhoneVerified(true);
          alert('Phone verified successfully!');
        }
        
        // Reset OTP input
        setOtp('');
        setCurrentVerification(null);

        // Check if both verifications are complete
        if ((currentVerification === 'email' && phoneVerified) || 
            (currentVerification === 'phone' && emailVerified)) {
          alert('Registration complete! Redirecting to login page...');
          router.push('/login');
          resetForm();
        }
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.log(error)
      alert('OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ===== RENDER COMPONENTS =====
  /**
   * Render initial registration form
   */
  const renderRegistrationForm = () => (
    <form onSubmit={handleRegistration} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
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
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
        <input
          type="tel"
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
          placeholder="+1234567890"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          disabled={isLoading}
        />
        <p className="text-xs text-gray-500 mt-1">
          Please enter phone number with country code (e.g., +1234567890)
        </p>
      </div>
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
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 relative ${
          isLoading ? 'cursor-not-allowed' : ''
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="opacity-0">Register</span>
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-2">Registering...</span>
            </span>
          </>
        ) : (
          'Register'
        )}
      </button>
    </form>
  );

  /**
   * Render OTP verification section
   */
  const renderOtpPage = () => (
    <div className="space-y-4">
      {/* Phone verification button */}
      <button
        onClick={() => handleSendOtp('phone')}
        className={`w-full py-2 text-white rounded-md inline-block ${
          phoneVerified ? 'bg-green-400' : 'bg-indigo-600'
        } hover:${phoneVerified ? '' : 'bg-indigo-700'}`}
        disabled={isLoading || phoneVerified || currentVerification === 'email'} // Disable if email is being verified
      >
        {phoneVerified ? 'Phone No Verified' : 'Send OTP to Phone'}
      </button>
      
      {/* Email verification button */}
      <button
        onClick={() => handleSendOtp('email')}
        className={`w-full py-2 text-white rounded-md inline-block ${
          emailVerified ? 'bg-green-400' : 'bg-indigo-600'
        } hover:${emailVerified ? '' : 'bg-indigo-700'}`}
        disabled={isLoading || emailVerified || currentVerification === 'phone'} // Disable if phone is being verified
      >
        {emailVerified ? 'Email Verified' : 'Send OTP to Email'}
      </button>
      
      {/* OTP input and verification button (shown only when OTP has been sent) */}
      {currentVerification && (
        <div>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border rounded-md"
            placeholder={`Enter OTP for ${
              currentVerification === 'email' ? 'Email' : 'Phone'
            }`}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={10}
          />
          <button
            onClick={handleVerifyOtp}
            className="w-full mt-2 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            disabled={isLoading}
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );

  // ===== MAIN RENDER =====
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          {isRegistered ? 'Verify OTPs' : 'Register'}
        </h2>
        
        {/* Conditional rendering based on registration step */}
        {isRegistered ? renderOtpPage() : renderRegistrationForm()}
        
        {/* Login link (only shown in initial registration screen) */}
        {!isRegistered && (
          <p className="text-sm text-center mt-4 dark:text-white">
            Already have an account? <Link className="underline text-blue-800 dark:text-sky-500" href="/login">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
}