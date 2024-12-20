import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ApiProvider } from '../contexts/ApiContext';

export const metadata = {
  title: 'File AI',
  description: 'AI to convert your text prompts to files.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ApiProvider> 
            {children}
          </ApiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
