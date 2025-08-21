import React from 'react';
import { GameState, Theme } from '../types';

interface FeedbackModalProps {
  state: GameState;
  onNextLevel: () => void;
  onRetry: () => void;
  isLastLevel: boolean;
  theme: Theme;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ state, onNextLevel, onRetry, isLastLevel, theme }) => {
  if (state !== GameState.Success && state !== GameState.Fail) {
    return null;
  }

  const isSuccess = state === GameState.Success;
  
  const successContent = (
    <>
      <div className="text-8xl animate-bounce">{theme.goalIcon}</div>
      <h2 className="text-4xl md:text-6xl font-bold text-yellow-500">Tebrikler!</h2>
      <p className="text-xl md:text-2xl text-slate-600">{theme.successMessage}</p>
      {isLastLevel ? (
         <button
            onClick={onRetry} // onRetry is mapped to restart in App.tsx for this case
            className="mt-6 px-8 py-4 bg-purple-500 text-white text-2xl font-bold rounded-xl shadow-lg hover:bg-purple-600 transition transform hover:scale-105 active:scale-95"
          >
            Yeniden Oyna 🔄
          </button>
      ) : (
          <button
            onClick={onNextLevel}
            className="mt-6 px-8 py-4 bg-blue-500 text-white text-2xl font-bold rounded-xl shadow-lg hover:bg-blue-600 transition transform hover:scale-105 active:scale-95"
          >
            Sonraki Seviye ➡️
          </button>
      )}
    </>
  );

  const failContent = (
    <>
      <div className="text-8xl">❌</div>
      <h2 className="text-4xl md:text-6xl font-bold text-red-500">Olmadı!</h2>
      <p className="text-xl md:text-2xl text-slate-600">{theme.failMessage}</p>
      <button
        onClick={onRetry}
        className="mt-6 px-8 py-4 bg-orange-500 text-white text-2xl font-bold rounded-xl shadow-lg hover:bg-orange-600 transition transform hover:scale-105 active:scale-95"
      >
        Tekrar Dene 🔄
      </button>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 p-8 md:p-12 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-4 w-11/12 max-w-lg">
        {isSuccess ? successContent : failContent}
      </div>
    </div>
  );
};

export default FeedbackModal;
