import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '@/components/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

// Mock the useAuth hook
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));


describe('RegisterForm', () => {
  it('should allow typing in the input boxes', () => {
    // Set up the mock return value BEFORE rendering RegisterForm
    (useAuth as jest.Mock).mockReturnValue({
      register: jest.fn(),
      sendOtp: jest.fn(),
      verifyOtp: jest.fn(),
    });

    (useRouter as jest.Mock).mockReturnValue({
        push: jest.fn()
    });

    render(<RegisterForm />);

    // Check if all the text is there
    const registerButton = screen.getByRole('button', { name: 'Register' });
    expect(registerButton).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();

    // Check if all the input boxes are there
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+1234567890')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument();
  });

  it('should allow typing in the input boxes', () => {
      render(<RegisterForm />);

      //Lets get the input boxes
      const usernameInput = screen.getByPlaceholderText('Enter your username') as HTMLInputElement;
      const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
      const phoneNumberInput = screen.getByPlaceholderText('+1234567890') as HTMLInputElement;
      const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;
      const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password') as HTMLInputElement;

      //Lets simulate typing something into those boxes
      fireEvent.change(usernameInput, {target: {value: 'MyUsername'}});
      fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
      fireEvent.change(phoneNumberInput, {target: {value: '+1234567890'}});
      fireEvent.change(passwordInput, {target: {value: 'MyPassword'}});
      fireEvent.change(confirmPasswordInput, {target: {value: 'MyPassword'}});

      //Lets check if the values we typed are now showing up in the boxes
      expect(usernameInput.value).toBe('MyUsername');
      expect(emailInput.value).toBe('test@example.com');
      expect(phoneNumberInput.value).toBe('+1234567890');
      expect(passwordInput.value).toBe('MyPassword');
      expect(confirmPasswordInput.value).toBe('MyPassword');
  })
});