"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ThemeToggle from '@/components/ThemeToggle';
import FileAILogo from '@/components/FileAIHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/contexts/ApiContext'; 

function Dashboard() {
  const { logout } = useAuth();
  const router = useRouter();
  const { generatePdfContent, generateExcelFile, generatePdfFromEditorContent, loading } = useApi();  // Use the API functions from the context
  const [mode, setMode] = useState<'pdf' | 'excel'>('pdf');
  const [prompt, setPrompt] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bold: false,
        italic: false,
        strike: false,
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none p-4 text-black dark:text-gray-100 bg-white dark:bg-gray-800',
      },
    },
    immediatelyRender: false,
  });

  // Check authentication and redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login'); 
    }
  }, [router]);

  const handleLogout = async () => {
    await logout(); 
    router.push('/login'); 
  };

  const handleModeChange = (newMode: 'pdf' | 'excel') => {
    setMode(newMode);
    setFileUrl(null);
    if (newMode === 'excel') {
      setEditorOpen(false);
    }
  };

  const handleGenerateClick = async () => {
    if (loading) return;  // Prevent multiple submissions
    if (mode === 'pdf') {
      try {
        const content = await generatePdfContent(prompt);
        if (editor) {
          const contentWithLineBreaks = content.replace(/\n/g, '<br>');
          editor.commands.setContent(contentWithLineBreaks);
        }
        setEditorOpen(true);
      } catch (error) {
        console.log('Error generating PDF:', error);
      }
    } else {
      try {
        const blob = await generateExcelFile(prompt);
        const url = window.URL.createObjectURL(blob);
        setFileUrl(url);
      } catch (error) {
        console.log('Error generating Excel:', error);
      }
    }
  };

  const handleGeneratePdf = async () => {
    if (!editor || loading) return;
    
    try {
      const content = editor.getHTML();
      const blob = await generatePdfFromEditorContent(content);
      const url = window.URL.createObjectURL(blob);
      setFileUrl(url);
    } catch (error) {
      console.log('Error generating PDF file:', error);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <button
        onClick={handleLogout}
        className={`fixed top-4 left-4 bg-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300`}>
        {loading ? "Logging Out" : "Logout"}
      </button>  
      <FileAILogo editorOpen={editorOpen}/>
      <ThemeToggle isHomepage={false}/> 
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex w-full max-w-7xl gap-6 transition-all duration-300 ease-in-out">
          {/* Query Section */}
          <div className={`transition-all duration-300 ease-in-out flex-shrink-0 ${editorOpen ? 'w-1/3' : 'w-full max-w-3xl mx-auto'}`}>
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100 text-center mb-6">
                Select Mode and Enter Prompt...
              </h2>
              <div className="flex justify-center mb-6">
                <button 
                  className={`px-6 py-2 rounded-l-lg font-medium transition-colors duration-300 ${mode === 'pdf' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  onClick={() => handleModeChange('pdf')}
                >
                  PDF Mode
                </button>
                <button 
                  className={`px-6 py-2 rounded-r-lg font-medium transition-colors duration-300 ${mode === 'excel' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  onClick={() => handleModeChange('excel')}
                >
                  Excel Mode
                </button>
              </div>
              <textarea
                className="w-full p-4 border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 resize-none font-sans text-base text-black dark:text-gray-100 bg-gray-100 dark:bg-gray-900"
                rows={4}
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex justify-center">
                <button 
                  className={`bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-8 rounded-lg shadow-md transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleGenerateClick}
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>

          {/* Editor Section */}
          {mode === 'pdf' && editorOpen && (
            <div className="w-2/3 opacity-100 transition-all duration-300 ease-in-out">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Editor</h3>
                  <button
                    onClick={() => setEditorOpen(false)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="border dark:border-gray-700 rounded-lg overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                  <EditorContent editor={editor} className="min-h-[300px] text-black dark:text-gray-100 bg-white dark:bg-gray-800" />
                </div>
                <button 
                  className={`mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg shadow-md transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleGeneratePdf}
                  disabled={loading}
                >
                  {loading ? 'Generating PDF...' : 'Generate PDF'}
                </button>
              </div>
            </div>
          )}

          {/* Download Button */}
          {fileUrl && (
            <div className="fixed bottom-4 right-4">
              <a
                href={fileUrl}
                download={mode === 'pdf' ? 'generated_pdf.pdf' : 'generated_excel.xlsx'}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
              >
                Download {mode.toUpperCase()} File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
