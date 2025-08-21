
import React from 'react';

interface ControlsProps {
  onPlay: () => void;
  onReset: () => void;
  isPlayDisabled: boolean;
  isResetDisabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onPlay, onReset, isPlayDisabled, isResetDisabled }) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onPlay}
        disabled={isPlayDisabled}
        className="
          flex items-center justify-center w-28 h-28 md:w-32 md:h-32 bg-green-500 text-white rounded-full 
          shadow-lg text-6xl md:text-7xl transition transform active:scale-90
          disabled:bg-gray-400 disabled:cursor-not-allowed
          hover:enabled:bg-green-600 hover:enabled:scale-105
        "
      >
        ⏯️
      </button>
      <button
        onClick={onReset}
        disabled={isResetDisabled}
        className="
          flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-orange-500 text-white rounded-full 
          shadow-lg text-5xl md:text-6xl transition transform active:scale-90
          disabled:bg-gray-400 disabled:cursor-not-allowed
          hover:enabled:bg-orange-600 hover:enabled:scale-105
        "
      >
        🔄
      </button>
    </div>
  );
};

export default Controls;
