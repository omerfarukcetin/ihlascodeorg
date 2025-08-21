import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Direction, Level, Position, Theme } from './types';
import { TOTAL_LEVELS } from './constants';
import { THEMES } from './themes';
import { generateLevel } from './levelGenerator';
import GameBoard from './components/GameBoard';
import CommandPalette from './components/CommandPalette';
import CommandQueue from './components/CommandQueue';
import Controls from './components/Controls';
import FeedbackModal from './components/FeedbackModal';

const App: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [level, setLevel] = useState<Level | null>(null);
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [commandQueue, setCommandQueue] = useState<Direction[]>([]);
  const [beePosition, setBeePosition] = useState<Position>({ row: 0, col: 0 });
  const [gameState, setGameState] = useState<GameState>(GameState.Idle);

  const resetLevel = useCallback((levelDefinition: Level) => {
    setLevel(levelDefinition);
    setCommandQueue([]);
    setBeePosition(levelDefinition.startPos);
    setGameState(GameState.Idle);
  }, []);
  
  useEffect(() => {
    const newTheme = THEMES[Math.floor(currentLevelIndex / 5) % THEMES.length];
    const newLevel = generateLevel(currentLevelIndex);
    setTheme(newTheme);
    setLevel(newLevel);
    resetLevel(newLevel);
  }, [currentLevelIndex, resetLevel]);

  const addCommand = (command: Direction) => {
    if (gameState === GameState.Idle) {
      setCommandQueue(prev => [...prev, command]);
    }
  };

  const removeCommand = (indexToRemove: number) => {
    if (gameState === GameState.Idle) {
      setCommandQueue(prev => prev.filter((_, index) => index !== indexToRemove));
    }
  };

  const executeCommands = async () => {
    if (!level) return;
    setGameState(GameState.Running);
    let currentPos = { ...level.startPos };

    for (const command of commandQueue) {
      await new Promise(resolve => setTimeout(resolve, 500));

      let nextPos = { ...currentPos };
      switch (command) {
        case Direction.Up: nextPos.row--; break;
        case Direction.Down: nextPos.row++; break;
        case Direction.Left: nextPos.col--; break;
        case Direction.Right: nextPos.col++; break;
      }

      const rows = level.grid.length;
      const cols = level.grid[0].length;
      if (
        nextPos.row < 0 || nextPos.row >= rows ||
        nextPos.col < 0 || nextPos.col >= cols ||
        level.grid[nextPos.row][nextPos.col] === 'OBSTACLE'
      ) {
        setGameState(GameState.Fail);
        return;
      }
      
      currentPos = nextPos;
      setBeePosition(currentPos);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));

    if (currentPos.row === level.goalPos.row && currentPos.col === level.goalPos.col) {
      setGameState(GameState.Success);
    } else {
      setGameState(GameState.Fail);
    }
  };
  
  const handleNextLevel = () => {
    setCurrentLevelIndex(prev => (prev + 1) % TOTAL_LEVELS);
  };
  
  const handleRetry = () => {
    if (level) {
      resetLevel(level);
    }
  };
  
  const handleRestart = () => {
    setCurrentLevelIndex(0);
  }

  if (!level) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-green-200 flex flex-col items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-center justify-center">
        
        <div className="flex flex-col items-center gap-4">
           <h1 className="text-3xl md:text-5xl font-bold text-yellow-600 drop-shadow-lg mb-4">
             Seviye {currentLevelIndex + 1}
           </h1>
          <GameBoard level={level} beePosition={beePosition} theme={theme} />
        </div>
        
        <div className="flex flex-col gap-6 w-full lg:w-auto items-center">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center text-slate-700 mb-3">Komutlar</h2>
            <CommandPalette onCommandClick={addCommand} disabled={gameState !== GameState.Idle} />
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-lg w-full max-w-lg min-h-[140px]">
             <h2 className="text-2xl font-bold text-center text-slate-700 mb-3">Kodlama Alanı</h2>
            <CommandQueue commands={commandQueue} onCommandClick={removeCommand} />
          </div>

          <Controls
            onPlay={executeCommands}
            onReset={handleRetry}
            isPlayDisabled={commandQueue.length === 0 || gameState !== GameState.Idle}
            isResetDisabled={gameState === GameState.Running}
          />
        </div>

      </div>
      
      {(gameState === GameState.Success || gameState === GameState.Fail) && (
        <FeedbackModal 
          state={gameState}
          onNextLevel={handleNextLevel}
          onRetry={gameState === GameState.Fail ? handleRetry : handleRestart}
          isLastLevel={currentLevelIndex === TOTAL_LEVELS - 1}
          theme={theme}
        />
      )}

    </div>
  );
};

export default App;