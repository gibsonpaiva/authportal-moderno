
import React from 'react';

interface SuccessScreenProps {
  email: string;
  onLogout: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ email, onLogout }) => {
  return (
    <div className="bg-amber-950/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-yellow-800/20 text-center animate-in fade-in zoom-in duration-500">
      <div className="mb-4 relative inline-block">
        <div className="absolute inset-0 bg-yellow-500/20 rounded-full scale-150 animate-ping"></div>
        <div className="relative flex items-center justify-center w-16 h-16 bg-yellow-900/40 text-yellow-500 rounded-full mx-auto border-2 border-yellow-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="text-xl font-extrabold text-white mb-1 tracking-tight">Autenticado com Sucesso!</h2>
      <p className="text-amber-300/70 text-base mb-6">
        Olá, <span className="text-yellow-500 font-bold">{email}</span>. Você entrou com segurança no seu portal.
      </p>

      <div className="bg-amber-950/30 border border-yellow-900/40 rounded-2xl p-4 mb-6 text-left backdrop-blur-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold text-yellow-500">Sessão Ativa</h3>
            <p className="mt-1 text-sm text-amber-500/80 leading-relaxed">
              Sua sessão expirará automaticamente em 24 horas por motivos de segurança e privacidade dos seus dados.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="w-full sm:w-auto px-10 py-3 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-xl active:scale-95"
      >
        Encerrar Sessão
      </button>
    </div>

  );
};
