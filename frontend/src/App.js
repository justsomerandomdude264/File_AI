import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('excel');
  const [fileURL, setFileURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const sendMessage = async (message) => {
    setLoading(true);
    setError(null);
    setFileURL(null);

    try {
      let response;
      if (mode === 'pdf') {
        response = await axios.get('http://localhost:8000/file_ai/pdf_request/', {
          params: { query: message },
          responseType: 'blob',
        });
      } else if (mode === 'excel') {
        response = await axios.get('http://localhost:8000/file_ai/xl_request/', {
          params: { query: message },
          responseType: 'blob',
        });
      }

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      setFileURL(url);
    } catch (err) {
      setError('An error occurred while processing your request. Please try using a more accurate prompt with all details. ');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setFileURL(null);
    setError(null);
  };

  return (
    <div className="app">
      <div className="content">
        <div className="header">
          <h1 className="title">File AI</h1>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        
        <div className="mode-selection">
          <select value={mode} onChange={handleModeChange}>
            <option value="pdf">PDF Mode</option>
            <option value="excel">Excel Mode</option>
          </select>
        </div>
        
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            rows={5}
          />
          <button type="submit" disabled={loading}>
            {loading ? <div className="loader"></div> : 'Generate'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {fileURL && (
          <a
            href={fileURL}
            download={`output.${mode === 'pdf' ? 'pdf' : 'xlsx'}`}
            className="download-button"
          >
            Download {mode.toUpperCase()} File
          </a>
        )}
      </div>
    </div>
  );
}