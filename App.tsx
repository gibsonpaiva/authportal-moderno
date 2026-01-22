
import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { SuccessScreen } from './components/SuccessScreen';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 transition-colors duration-500">
      <div className="w-full max-w-md">
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <SuccessScreen email={userEmail} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
};

export default App;
