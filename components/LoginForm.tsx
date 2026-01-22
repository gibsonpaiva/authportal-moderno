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
    <div className="bg-rose-950/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-rose-800/30 transform transition-all duration-300">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-900/40 text-pink-400 rounded-full mb-4 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">
          {isSignUp ? 'Criar nova conta' : 'Bem-vindo de volta'}
        </h2>
        <p className="text-rose-300/60 mt-2 text-sm">
          {isSignUp ? 'Preencha os dados abaixo' : 'Entre com sua conta para continuar'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-900/30 text-red-400 p-3 rounded-lg text-sm border border-red-900/50 animate-pulse font-medium text-center">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider font-semibold text-rose-400/70 ml-1" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-rose-950/60 border border-rose-800/50 text-white placeholder-rose-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
            placeholder="seu@email.com"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider font-semibold text-rose-400/70 ml-1" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-rose-950/60 border border-rose-800/50 text-white placeholder-rose-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
            placeholder="••••••••"
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-[0.98] ${isLoading
            ? 'bg-rose-900/40 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 shadow-lg shadow-pink-900/40'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </div>
          ) : (
            isSignUp ? 'Cadastrar Agora' : 'Acessar Portal'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-rose-800/30 text-center text-sm">
        <p className="text-rose-400/60 italic">
          {isSignUp ? 'Já possui uma conta?' : 'Ainda não tem acesso?'}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-2 text-pink-400 font-bold hover:text-pink-300 transition-colors focus:outline-none not-italic"
          >
            {isSignUp ? 'Fazer Login' : 'Criar Conta Grátis'}
          </button>
        </p>
      </div>
    </div>
  );
};
