import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Homepage from '@/components/Homepage';
import { useRouter } from 'next/navigation';
import { ImageProps } from 'next/image';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the next/image component properly with types
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src as string} alt={props.alt as string} data-testid="next-image" />;
  },
}));

// Mock the ThemeToggle component
jest.mock('@/components/ThemeToggle', () => ({
  __esModule: true,
  default: ({ isHomepage }: { isHomepage: boolean }) => (
    <div data-testid="theme-toggle" data-ishomepage={isHomepage ? 'true' : 'false'}>
      Theme Toggle
    </div>
  ),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => {
      return store[key] || null;
    },
    setItem: (key: string, value: string): void => {
      store[key] = value;
    },
    clear: (): void => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Homepage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  const mockRouter = {
    push: jest.fn(),
  };

  test('renders the homepage with the correct elements', () => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    render(<Homepage />);
    
    // Check if main elements are rendered
    expect(screen.getByTestId('next-image')).toBeInTheDocument();
    expect(screen.getByText('Transform Your Text into')).toBeInTheDocument();
    expect(screen.getByText('Professional Documents')).toBeInTheDocument();
    expect(screen.getByText('Try FileAI Now')).toBeInTheDocument();
    
    // Check for feature sections
    expect(screen.getByText('PDF Generation')).toBeInTheDocument();
    expect(screen.getByText('Excel Automation')).toBeInTheDocument();
    expect(screen.getByText('AI-Powered')).toBeInTheDocument();
    
    // Check for footer
    expect(screen.getByText('Made by Krishna Paliwal')).toBeInTheDocument();
  });

  test('ThemeToggle component receives isHomepage prop as true', () => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    render(<Homepage />);
    
    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle.getAttribute('data-ishomepage')).toBe('true');
  });

  test('redirects to dashboard if user is already logged in', async () => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    // Set auth token in localStorage
    localStorageMock.setItem('authToken', 'test-token');
    
    render(<Homepage />);
    
    // Check if router.push was called with '/dashboard'
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('does not redirect if user is not logged in', async () => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    render(<Homepage />);
    
    // Wait a bit to ensure useEffect had time to run
    await waitFor(() => {
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });
});