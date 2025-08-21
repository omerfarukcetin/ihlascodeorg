import React from 'react';
import { Direction } from '../types';
import { COMMAND_ICONS, commandColors } from '../constants';

interface CommandQueueProps {
  commands: Direction[];
  onCommandClick: (index: number) => void;
}

const CommandQueue: React.FC<CommandQueueProps> = ({ commands, onCommandClick }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-2 min-h-[90px] bg-slate-200/50 rounded-lg">
      {commands.length === 0 && (
        <span className="text-slate-500">Okları buraya ekle!</span>
      )}
      {commands.map((command, index) => {
        const colorClass = commandColors[command].split(' ')[0];
        return (
          <button
            key={index}
            onClick={() => onCommandClick(index)}
            title="Bu komutu sil"
            className={`
              flex items-center justify-center w-16 h-16 text-4xl rounded-lg shadow-sm text-white 
              cursor-pointer transition-transform transform hover:scale-105 active:scale-95
              ${colorClass}`
            }
          >
            {COMMAND_ICONS[command]}
          </button>
        );
      })}
    </div>
  );
};

export default CommandQueue;