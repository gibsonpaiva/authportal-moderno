import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { SuccessScreen } from './components/SuccessScreen';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || '');
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || '');
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0b01]">
        <div className="h-5 w-5 border-2 border-white/20 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0b01] p-2 transition-colors duration-500">
      <div className="w-full max-w-md">
        {!isAuthenticated ? (
          <LoginForm />
        ) : (
          <SuccessScreen email={userEmail} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
};

export default App;

