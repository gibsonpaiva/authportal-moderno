import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isSignUp && (!firstName || !lastName))) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);

    try {
      const { error: authError } = isSignUp
        ? await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            }
          }
        })
        : await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setError(authError.message);
      }
    } catch (err: any) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 min-h-[650px]">
      {/* Left Panel - Hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-emerald-950 via-teal-950 to-black p-12 flex-col justify-between">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white/90 mb-20 animate-pulse">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            </div>
            <span className="font-bold tracking-tight text-xl">AuthPortal</span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Get Started <br />
            <span className="text-emerald-400">with Us</span>
          </h1>
          <p className="text-white/60 text-lg max-w-sm">
            Complete these easy steps to register your account and access the dashboard.
          </p>
        </div>

        {/* Steps */}
        <div className="relative z-10 space-y-4">
          <div className={`p-4 rounded-2xl flex items-center gap-4 transition-all duration-500 border ${isSignUp ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/10 grayscale opacity-50'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isSignUp ? 'bg-black text-white' : 'bg-white/20 text-white'}`}>1</div>
            <span className="font-semibold">Sign up your account</span>
          </div>
          <div className="p-4 rounded-2xl flex items-center gap-4 bg-white/5 text-white border border-white/10 grayscale opacity-50">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 font-bold text-sm">2</div>
            <span className="font-semibold text-white/80">Set up your workspace</span>
          </div>
          <div className="p-4 rounded-2xl flex items-center gap-4 bg-white/5 text-white border border-white/10 grayscale opacity-50">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 font-bold text-sm">3</div>
            <span className="font-semibold text-white/80">Set up your profile</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center bg-zinc-950">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-10 lg:text-left text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? 'Sign Up Account' : 'Welcome Back'}
            </h2>
            <p className="text-zinc-500">
              {isSignUp ? 'Enter your personal data to create your account.' : 'Please enter your account details to sign in.'}
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition-all text-white text-sm font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition-all text-white text-sm font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Github
            </button>
          </div>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
            <span className="relative bg-zinc-950 px-3 text-zinc-500 text-xs font-medium uppercase tracking-wider">Or</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 text-red-400 p-4 rounded-xl text-sm border border-red-500/20 text-center font-medium animate-shake">
                {error}
              </div>
            )}

            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 ml-1" htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 ml-1" htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400 ml-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-zinc-400 ml-1" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:ring-1 focus:ring-emerald-500 outline-none transition-all pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.882 9.882L5.13 5.13m13.74 13.74L13.88 13.88m2.56-2.56L20.47 16.47" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1 ml-1">Must be at least 8 characters.</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 mt-6 rounded-xl font-bold transition-all transform active:scale-[0.98] ${isLoading
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                }`}
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-500 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-white font-bold hover:underline transition-all"
              >
                {isSignUp ? 'Log in' : 'Create Account'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
