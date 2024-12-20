import RegisterForm from '@/components/RegisterForm';
import ThemeToggle from '@/components/ThemeToggle';
import Image from 'next/image';

export default function RegisterPage() {
  return (
  <>
  <div
        className={`fixed transform transition-all duration-500 z-50 w-32 h-32 top-4 left-4`}
      >
        <Image src="/logo.ico" alt="FileAI Logo" layout="fill" className="rounded-full" />
  </div>
  <ThemeToggle isHomepage={false}/>
  <RegisterForm />
  </>
  );
}
