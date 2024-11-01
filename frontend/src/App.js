import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login, Register } from './components/Auth';
import FileGenerator from './components/FileGenerator';
import axios from 'axios';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);

    // Check token for authentication
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/user_auth/logout/', { token });

      if (response.status === 200) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login after logout
      } else {
        console.error('Logout failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error during logout:', error.response?.data || error.message);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">File AI</h1>
        <div className="header-controls">
          {isAuthenticated && (
            <button onClick={handleLogout} className="logout-button" aria-label="Logout">
              Logout
            </button>
          )}
          <button onClick={toggleTheme} className="theme-toggle" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      <Routes>
        <Route path="/" element={isAuthenticated ? <FileGenerator theme={theme} /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={isAuthenticated ? <FileGenerator theme={theme} /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={() => { setIsAuthenticated(true); navigate('/dashboard'); }} /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
