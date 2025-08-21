import React from 'react';
import { Direction } from '../types';
import { COMMAND_ICONS, commandColors } from '../constants';

interface CommandPaletteProps {
  onCommandClick: (command: Direction) => void;
  disabled: boolean;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onCommandClick, disabled }) => {
  const commands = Object.values(Direction);

  return (
    <div className="grid grid-cols-4 gap-4">
      {commands.map(command => (
        <button
          key={command}
          onClick={() => onCommandClick(command)}
          disabled={disabled}
          className={`
            p-4 md:p-5 text-5xl md:text-6xl rounded-xl shadow-md text-white font-bold 
            transition-transform transform active:scale-90
            ${commandColors[command]}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
          `}
        >
          {COMMAND_ICONS[command]}
        </button>
      ))}
    </div>
  );
};

export default CommandPalette;