'use client'
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';  // Assuming you already have AuthContext for token

const ApiContext = createContext();

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
  const { token } = useAuth();  // Get token from AuthContext
  const [loading, setLoading] = useState(false);

  const generatePdfContent = async (prompt) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/file_ai/pdf_content_request/',
        { query: prompt, token: token }
      );
      setLoading(false);
      return response.data.content;
    } catch (error) {
      setLoading(false);
      console.log('Error generating PDF content:', error);
      throw error;
    }
  };

  const generateExcelFile = async (prompt) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/file_ai/xl_request/',
        { query: prompt, token: token },
        {
          responseType: 'blob'
        }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.log('Error generating Excel file:', error);
      throw error;
    }
  };

  const generatePdfFromEditorContent = async (content) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/file_ai/pdf_request/',
        { content: content, token: token },
        {
          responseType: 'blob'
        }
      );
      setLoading(false);
      return response.data; 
    } catch (error) {
      setLoading(false);
      console.log('Error generating PDF file:', error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ generatePdfContent, generateExcelFile, generatePdfFromEditorContent, loading }}>
      {children}
    </ApiContext.Provider>
  );
};
