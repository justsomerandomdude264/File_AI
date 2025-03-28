import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileAILogo from '@/components/FileAIHeader'; 

// Mock Next.js Image component with proper TypeScript types
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
    priority?: boolean;
    [key: string]: unknown;
  }) => {
    // Create a properly typed mock that avoids using the img tag directly (fasten up)
    return (
      <div 
        data-testid="mock-image"
        className={props.className}
        style={{ 
          position: props.fill ? 'absolute' : 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <span 
          data-testid="mock-image-props" 
          data-src={props.src} 
          data-alt={props.alt} 
          data-priority={props.priority ? 'true' : 'false'} 
        />
      </div>
    );
  },
}));

describe('FileAILogo', () => {
  it('renders with correct classes when editor is closed', () => {
    const { container } = render(<FileAILogo editorOpen={false} />);
    
    const logoContainer = container.firstChild as HTMLElement;
    
    // Check if the logo container has the correct positioning classes when editor is closed
    expect(logoContainer).toHaveClass('w-32');
    expect(logoContainer).toHaveClass('h-32');
    expect(logoContainer).toHaveClass('top-4');
    expect(logoContainer).toHaveClass('left-1/2');
    expect(logoContainer).toHaveClass('-translate-x-1/2');
  });

  it('renders with correct classes when editor is open', () => {
    const { container } = render(<FileAILogo editorOpen={true} />);
    
    const logoContainer = container.firstChild as HTMLElement;
    
    // Check if the logo container has the correct positioning classes when editor is open
    expect(logoContainer).toHaveClass('w-20');
    expect(logoContainer).toHaveClass('h-20');
    expect(logoContainer).toHaveClass('bottom-4');
    expect(logoContainer).toHaveClass('left-4');
    expect(logoContainer).toHaveClass('translate-x-0');
  });

  it('renders the Image component with correct props', () => {
    render(<FileAILogo editorOpen={false} />);
    
    const imageProps = screen.getByTestId('mock-image-props');
    
    // Check if the image has the correct attributes via data attributes
    expect(imageProps).toHaveAttribute('data-src', '/logo.svg');
    expect(imageProps).toHaveAttribute('data-alt', 'FileAI Logo');
    expect(imageProps).toHaveAttribute('data-priority', 'true');
    
    // Check if the mock image container has the rounded-full class
    const mockImage = screen.getByTestId('mock-image');
    expect(mockImage).toHaveClass('rounded-full');
  });
});