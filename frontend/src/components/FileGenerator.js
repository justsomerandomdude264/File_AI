import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileGenerator.css';

const FileGenerator = ({ theme }) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('excel');
  const [fileURL, setFileURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfContent, setPdfContent] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  useEffect(() => {
    // Reset layout when switching to excel mode
    if (mode === 'excel') {
      setIsContentVisible(false);
      setIsEditorVisible(false);
      setShowEditor(false);
      setPdfContent('');
    }
  }, [mode]);

  const generatePDFContent = async (prompt) => {
    setLoading(true);
    setError(null);

    try { 
      const response = await axios.post('http://localhost:8000/file_ai/pdf_content_request/', 
        { query: prompt }, 
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.status === "success") {
        setPdfContent(response.data.content);
        setShowEditor(true);
        setIsEditorVisible(true);
        setIsContentVisible(true);
      } else {
        setError(response.data.message || 'Failed to generate content');
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const generateExcelFile = async (prompt) => {
    setLoading(true);
    setError(null);
    setFileURL(null);

    try {
      const response = await axios.post('http://localhost:8000/file_ai/xl_request/', 
        { query: prompt },
        {
          responseType: 'blob',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] 
      });
      const url = window.URL.createObjectURL(blob);
      setFileURL(url);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const generatePDFFile = async () => {
    setLoading(true);
    setError(null);
    setFileURL(null);

    try {
      const response = await axios.post('http://localhost:8000/file_ai/pdf_request/', 
        { content: pdfContent },
        {
          responseType: 'blob',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] 
      });
      const url = window.URL.createObjectURL(blob);
      setFileURL(url);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err) => {
    if (err.response?.status === 401) {
      setError('Please login to continue');
    } else {
      setError('An error occurred while processing your request. Please try using a more accurate prompt with all details.');
    }
    console.error('error:', err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (mode === 'pdf') {
      generatePDFContent(input);
    } else {
      generateExcelFile(input);
    }
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setFileURL(null);
    setError(null);
  };

  return (
    <div className={`file-generator ${isContentVisible && mode === 'pdf' ? 'split-layout' : ''}`}>
      <div className={`query-container ${isContentVisible && mode === 'pdf' ? 'slide-right' : ''}`}>
        <div className="query-section">
          <div className="mode-selection">
            <select value={mode} onChange={handleModeChange} className="mode-select">
              <option value="pdf">PDF Mode</option>
              <option value="excel">Excel Mode</option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Type your ${mode === 'pdf' ? 'content prompt' : 'question'}...`}
              rows={5}
              className="query-textarea"
            />
            <button type="submit" disabled={loading} className="generate-button">
              {loading ? <div className="loader"></div> : 'Generate'}
            </button>
            
            {fileURL && (
              <div className="download-button-container">
                <a
                  href={fileURL}
                  download={`output.${mode === 'pdf' ? 'pdf' : 'xlsx'}`}
                  className="button"
                >
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    height="40"
                    width="40"
                    className="button__icon"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                    <path d="M7 11l5 5l5 -5"></path>
                    <path d="M12 4l0 12"></path>
                  </svg>
                  <span className="button__text">
                    Download {mode.toUpperCase()} File
                  </span>
                </a>
              </div>
            )}
          </form>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className={`content-section ${isContentVisible && mode === 'pdf' ? 'visible' : ''}`}>
        {isEditorVisible && showEditor && mode === 'pdf' && pdfContent && (
          <div className={`editor-container ${showEditor ? 'show' : ''}`}>
            <div className="pdf-editor">
              <textarea
                value={pdfContent}
                onChange={(e) => setPdfContent(e.target.value)}
                rows={20}
                className="pdf-content-editor"
              />
              <button 
                onClick={generatePDFFile}
                disabled={loading}
                className="generate-pdf-button"
              >
                {loading ? <div className="loader"></div> : 'Generate PDF'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileGenerator;