// This component renders the FileAI logo with dynamic positioning based on the `editorOpen` state.

import Image from 'next/image';

// FileAILogo Component
// Props:
// - editorOpen: Boolean indicating whether the editor is open
export default function FileAILogo({ editorOpen }) {
  return (
    <div
      className={`fixed transform transition-all duration-500 z-50 ${
        editorOpen
          ? // When editor is open: Smaller size, positioned at bottom-left
            'w-20 h-20 bottom-4 left-4 translate-x-0'
          : // When editor is closed: Larger size, centered at the top
            'w-32 h-32 top-4 left-1/2 -translate-x-1/2'
      }`}
    >
      {/* Container for the logo with rounded styling */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        {/* Logo Image */}
        <Image 
          src="/logo.svg"  // Path to the logo image
          alt="FileAI Logo" // Accessible alternative text
          fill            // Ensures the image fills the container
          className="rounded-full" // Maintains a circular shape
          priority        // Loads the image with high priority for performance
        />
      </div>
    </div>
  );
}