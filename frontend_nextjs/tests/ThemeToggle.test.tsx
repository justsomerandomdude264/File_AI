import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import ThemeToggle from '@/components/ThemeToggle'; // Adjust the import path as needed

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });

  it('positions the button correctly based on isHomepage prop', () => {
    render(<ThemeToggle isHomepage={true} />);
    expect(screen.getAllByRole('button')[0]).toHaveClass('left-4');

    render(<ThemeToggle isHomepage={false} />);
    expect(screen.getAllByRole('button')[1]).toHaveClass('right-4');
  });

  it('defaults to light theme when no preference is saved', () => {
    render(<ThemeToggle isHomepage={false} />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });

  it('applies dark theme when saved preference is dark', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle isHomepage={false} />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByText('💡')).toBeInTheDocument();
  });

  it('toggles theme when button is clicked', () => {
    render(<ThemeToggle isHomepage={false} />);
    const button = screen.getByRole('button');

    // Initially light theme
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByText('🌙')).toBeInTheDocument();

    fireEvent.click(button);

    // Now dark theme
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByText('💡')).toBeInTheDocument();
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(button);

    // Back to light theme
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByText('🌙')).toBeInTheDocument();
    expect(localStorage.getItem('theme')).toBe('light');
  });
});