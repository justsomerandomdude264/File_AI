// FileAI.js
import Image from 'next/image';

export default function FileAILogo({ editorOpen }) {
  return (
    <div
      className={`fixed transform transition-all duration-500 z-50 ${
        editorOpen
          ? 'w-20 h-20 bottom-4 left-4 translate-x-0'
          : 'w-32 h-32 top-4 left-1/2 -translate-x-1/2'
      }`}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <Image 
          src="/logo.svg" 
          alt="FileAI Logo" 
          fill 
          className="rounded-full" 
          priority 
        />
      </div>
    </div>
  );
}
