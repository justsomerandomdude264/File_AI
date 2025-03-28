'use client';
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import AuthContext to access authentication token

// Create API context
const ApiContext = createContext();

// Custom hook to use the API context
export const useApi = () => {
  return useContext(ApiContext);
};

// API Provider component
export const ApiProvider = ({ children }) => {
  const { token } = useAuth(); // Retrieve authentication token from AuthContext
  const [loading, setLoading] = useState(false); // State to manage loading status

  /**
   * Function to generate PDF content from a given prompt.
   * @param {string} prompt - The input query for generating PDF content.
   * @returns {Promise<string>} - The generated content as a string.
   */
  const generatePdfContent = async (prompt) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/file_ai/pdf_content_request/', {
        query: prompt,
        token: token,
      });
      return response.data.content;
    } catch (error) {
      console.log('Error generating PDF content:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Function to generate an Excel file from a given prompt.
   * @param {string} prompt - The input query for generating an Excel file.
   * @returns {Promise<Blob>} - The generated Excel file as a Blob.
   */
  const generateExcelFile = async (prompt) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/file_ai/xl_request/', {
        query: prompt,
        token: token,
      }, {
        responseType: 'blob', // Ensures binary response for file download
      });
      return response.data;
    } catch (error) {
      console.log('Error generating Excel file:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Function to generate a PDF file from editor content.
   * @param {string} content - The content to convert into a PDF.
   * @returns {Promise<Blob>} - The generated PDF file as a Blob.
   */
  const generatePdfFromEditorContent = async (content) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/file_ai/pdf_request/', {
        content: content,
        token: token,
      }, {
        responseType: 'blob', // Ensures binary response for file download
      });
      return response.data;
    } catch (error) {
      console.log('Error generating PDF file:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{ generatePdfContent, generateExcelFile, generatePdfFromEditorContent, loading }}>
      {children}
    </ApiContext.Provider>
  );
};
