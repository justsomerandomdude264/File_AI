"use client"
import LoginForm from '@/components/LoginForm';
import ThemeToggle from '@/components/ThemeToggle';
import FileAILogo from '@/components/FileAIHeader';

export default function LoginPage() {
  return (
    <div>
      <FileAILogo editorOpen={false}/>
      <LoginForm />
      <ThemeToggle isHomepage={false}/>
    </div>
  );
}
