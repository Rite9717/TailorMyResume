import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import JobApplicationForm from './components/ApplicationForm';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  
  const toggleForm = () => {
    setShowRegister(!showRegister);
  };
  
  if (isLoggedIn) {
    return <JobApplicationForm />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {showRegister ? 'Create your account' : 'Sign in to your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {showRegister ? (
            <RegisterForm toggleForm={toggleForm} />
          ) : (
            <LoginForm onLoginSuccess={handleLoginSuccess} toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
}