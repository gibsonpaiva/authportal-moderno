import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    try {
      const { error: authError } = isSignUp
        ? await supabase.auth.signUp({ email, password })
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
    <div className="bg-zinc-950/20 backdrop-blur-3xl p-8 rounded-3xl border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          {isSignUp ? 'Criar conta' : 'Acesse sua conta'}
        </h2>
        <p className="text-zinc-500 mt-1.5 text-sm">
          {isSignUp ? 'Preencha os campos para começar.' : 'Bem-vindo de volta ao portal.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-xs border border-red-500/20 font-medium text-center">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white placeholder-zinc-600 focus:border-yellow-500/50 transition-all outline-none text-sm"
            placeholder="E-mail"
            autoComplete="email"
          />
        </div>

        <div className="space-y-1.5">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white placeholder-zinc-600 focus:border-yellow-500/50 transition-all outline-none text-sm"
            placeholder="Senha"
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3.5 mt-4 rounded-full font-medium transition-all duration-300 ${isLoading
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            : 'bg-yellow-500 text-black hover:bg-yellow-400 hover:shadow-[0_0_20px_-5px_rgba(234,179,8,0.3)] active:scale-[0.98]'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Carregando...
            </div>
          ) : (
            isSignUp ? 'Cadastrar' : 'Entrar'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-zinc-500 text-xs hover:text-yellow-500/80 transition-colors focus:outline-none underline underline-offset-4"
        >
          {isSignUp ? 'Já tenho uma conta. Fazer login' : 'Ainda não tem conta? Crie agora'}
        </button>
      </div>
    </div>
  );
};
