
import React from 'react';

interface SuccessScreenProps {
  email: string;
  onLogout: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ email, onLogout }) => {
  return (
    <div className="bg-zinc-950/20 backdrop-blur-3xl p-8 rounded-3xl border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] text-center animate-in fade-in zoom-in duration-500">
      <div className="mb-6">
        <div className="relative flex items-center justify-center w-12 h-12 bg-white/5 text-yellow-500 rounded-full mx-auto border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">Sucesso</h2>
      <p className="text-zinc-500 text-sm mb-8">
        Olá, <span className="text-white">{email}</span>. Você está autenticado.
      </p>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 text-left">
        <p className="text-xs text-zinc-500 leading-relaxed">
          Sua sessão está ativa e segura. O portal está pronto para uso.
        </p>
      </div>

      <button
        onClick={onLogout}
        className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition-all border border-white/10 active:scale-[0.98]"
      >
        Sair do Portal
      </button>
    </div>

  );
};
