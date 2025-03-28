'use client'
import React, { useEffect } from 'react';
import { ArrowRight, FileText, FileSpreadsheet, Zap } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Homepage = () => {
  const router = useRouter();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      router.push('/dashboard'); 
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-8">
        
        {/* Navigation Bar */}
        <nav className="py-6 flex items-center justify-between">
          {/* Left side - Theme Toggle */}
          <div className="w-32">
            <ThemeToggle isHomepage={true} />
          </div>
          
          {/* Right side - Get Started Button */}
          <div className="w-32 flex justify-end">
            <Link 
              href="/login" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Logo Section */}
        <Link href="/login" className="flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="FileAI Logo"
            width={64}
            height={64}
            className="w-64 h-64 transform transition ease-in-out hover:scale-125 duration-220"
          />
        </Link>
        
        {/* Hero Section */}
        <div className="py-2 text-center">
          <h1 className="text-4xl font-serif text-gray-900 text-opacity-50 tracking-tight dark:text-white dark:text-opacity-50 mb-6 group">
            Transform Your Text into
            <span className="text-blue-600 text-5xl font-sans whitespace-pre tracking-normal font-extrabold group-hover:scale-105 group-hover:translate-x-1 transition-transform duration-300 inline-block">  Professional Documents </span>
          </h1>
          <p className="text-xl text-gray-900 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Generate polished PDFs and Excel spreadsheets instantly using AI. 
            Turn your ideas into beautifully formatted documents with just a prompt.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex px-8 py-3 rounded-lg font-semibold text-lg animate-wiggle text-white items-center bg-gradient-to-r from-green-700 via-emerald-500 to-emerald-700 hover:from-green-600 hover:via-emerald-500 hover:to-emerald-600"
          >
            Try FileAI Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
          {/* PDF Feature */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              PDF Generation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create perfectly formatted PDF documents from simple text prompts. 
              Edit and customize content before generating the final file.
            </p>
          </div>
          
          {/* Excel Feature */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Excel Automation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Generate organized spreadsheets instantly. Perfect for data 
              organization, analysis, and reporting needs.
            </p>
          </div>
          
          {/* AI Feature */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              AI-Powered
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Leverage advanced AI to understand your requirements and generate
              professional-quality documents in seconds.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-16 text-center">
          <div className="bg-blue-600 rounded-2xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Document Creation?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of professionals who use FileAI to streamline their document workflow.
            </p>
            <Link 
              href="/login"
              className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Get Started For Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="text-center text-gray-600 dark:text-gray-400 py-6">
          <p>Made by Krishna Paliwal</p>
          <p>Email: <a href="mailto:krishna.plwl264@gmail.com" className="underline">krishna.plwl264@gmail.com</a></p>
          <p>GitHub: <a href="https://github.com/justsomerandomdude264" className="underline">justsomerandomdude264</a></p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
