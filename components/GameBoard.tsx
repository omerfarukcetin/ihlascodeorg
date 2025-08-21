import React from 'react';
import { Level, Position, CellType, Theme } from '../types';

interface GameBoardProps {
  level: Level;
  beePosition: Position;
  theme: Theme;
}

const GameBoard: React.FC<GameBoardProps> = ({ level, beePosition, theme }) => {
  const { grid } = level;
  const rows = grid.length;
  const cols = grid[0].length;
  const cellSize = rows > 4 ? 'min(15vw, 70px)' : 'min(18vw, 90px)';

  return (
    <div
      className={`relative ${theme.gridBgColor} border-8 border-yellow-800/50 rounded-lg p-2 shadow-2xl`}
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${rows}, ${cellSize})`,
        gridTemplateColumns: `repeat(${cols}, ${cellSize})`,
        gap: '4px',
      }}
    >
      {grid.flat().map((cell, index) => {
        const isObstacle = cell === CellType.Obstacle;
        const isGoal = cell === CellType.Flower;
        
        let content = null;
        if (isObstacle) content = theme.obstacleIcon;
        if (isGoal) content = theme.goalIcon;

        const cellBg = isObstacle ? theme.obstacleCellBgColor : theme.cellBgColor;

        return (
          <div
            key={index}
            className={`${cellBg} rounded-md flex items-center justify-center`}
          >
            {content && <div className={`text-5xl md:text-7xl ${isGoal ? 'animate-pulse' : ''}`}>{content}</div>}
          </div>
        );
      })}
      <div
        className="absolute transition-all duration-500 ease-in-out text-5xl md:text-7xl"
        style={{
          top: `calc(${beePosition.row} * (${cellSize} + 4px) + 2px)`,
          left: `calc(${beePosition.col} * (${cellSize} + 4px) + 2px)`,
          width: cellSize,
          height: cellSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span className="animate-bounce">{theme.playerIcon}</span>
      </div>
    </div>
  );
};

export default GameBoard;
