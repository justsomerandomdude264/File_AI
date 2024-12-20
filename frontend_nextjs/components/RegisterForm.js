'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterForm() {
  const { register, sendOtp, verifyOtp } = useAuth();
  const router = useRouter();

  // Registration state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // OTP states
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [currentVerification, setCurrentVerification] = useState(null); // 'email' or 'phone'

  useEffect(() => {
    if (emailVerified && phoneVerified) {
      router.push('/login')
    };
  }, [emailVerified, phoneVerified, router])

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

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Please enter a valid phone number with country code (e.g., +1234567890)');
      return;
    }

    setIsLoading(true);
    try {
      const result = await register(username, email, password, phoneNumber);
      if (result.status) {
        alert('Registration successful! Proceed to verify your email and phone number.');
        setIsRegistered(true);
        setIsLoading(false);
      } else {
        alert(result.error);
        setIsLoading(false);
      }
    } catch {
      alert('Registration failed');
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (method) => {
    setIsLoading(true);
    try {
      const result = await sendOtp(method);
      if (result) {
        setCurrentVerification(method);
        alert(`OTP sent to your ${method}`);
        setIsLoading(false);
      } else {
        alert(`Failed to send OTP to your ${method}`);
        setIsLoading(false);
      }
    } catch {
      alert(`Error sending OTP to ${method}`);
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const result = await verifyOtp(otp, currentVerification);
      if (result == true) {
        if (currentVerification === 'email') {
          setEmailVerified(true);
          alert('Email verified successfully!');
        } else if (currentVerification === 'phone') {
          setPhoneVerified(true);
          alert('Phone verified successfully!');
        }
        setOtp('');
        setCurrentVerification(null);
        setIsLoading(false);

        // If both are verified, redirect to login
        if (emailVerified && phoneVerified) {
          alert('Registration complete! Redirecting to login page...');
          router.push('/login');
          resetForm();
        }
      } else {
        alert('Invalid OTP');
        setIsLoading(false);
      }
    } catch {
      alert('OTP verification failed');
      setIsLoading(false);
    }
  };

  // Render registration form
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
        className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );

  // Render OTP verification page
  const renderOtpPage = () => (
    <div className="space-y-4">
      <button
        onClick={() => handleSendOtp('phone')}
        className={`w-full py-2 text-white rounded-md inline-block ${
          phoneVerified ? 'bg-green-400' : 'bg-indigo-600'
        } hover:${phoneVerified ? '' : 'bg-indigo-700'}`}
        disabled={isLoading || phoneVerified || currentVerification === 'email'} // Disable if email is being verified
      >
        {phoneVerified ? 'Phone No Verified' : 'Send OTP to Phone'}
      </button>
      <button
        onClick={() => handleSendOtp('email')}
        className={`w-full py-2 text-white rounded-md inline-block ${
          emailVerified ? 'bg-green-400' : 'bg-indigo-600'
        } hover:${emailVerified ? '' : 'bg-indigo-700'}`}
        disabled={isLoading || emailVerified || currentVerification === 'phone'} // Disable if phone is being verified
      >
        {emailVerified ? 'Email Verified' : 'Send OTP to Email'}
      </button>
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          {isRegistered ? 'Verify OTPs' : 'Register'}
        </h2>
        {isRegistered ? renderOtpPage() : renderRegistrationForm()}
        {!isRegistered && (
          <p className="text-sm text-center mt-4 dark:text-white">
            Already have an account? <Link className="underline text-blue-800 dark:text-sky-500" href="/login">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
}
