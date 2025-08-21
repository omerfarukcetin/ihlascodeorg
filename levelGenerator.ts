import { Level, Position, CellType } from './types';

export function generateLevel(levelIndex: number): Level {
  const stage = Math.floor(levelIndex / 5);
  const size = 3 + stage; // 3x3, 4x4, 5x5
  const levelWithinStage = levelIndex % 5;

  const grid: CellType[][] = Array(size).fill(0).map(() => Array(size).fill(CellType.Empty));

  const startPos: Position = {
    row: Math.floor(Math.random() * size),
    col: Math.floor(Math.random() * size),
  };

  let currentPos = { ...startPos };
  const path: Position[] = [currentPos];
  const pathLength = size + levelWithinStage + stage;

  const directions = [ { r: -1, c: 0 }, { r: 1, c: 0 }, { r: 0, c: -1 }, { r: 0, c: 1 } ];

  for (let i = 0; i < pathLength; i++) {
    directions.sort(() => Math.random() - 0.5);
    let moved = false;
    for (const dir of directions) {
      const nextPos = { row: currentPos.row + dir.r, col: currentPos.col + dir.c };
      if (
        nextPos.row >= 0 && nextPos.row < size &&
        nextPos.col >= 0 && nextPos.col < size &&
        !path.some(p => p.row === nextPos.row && p.col === nextPos.col)
      ) {
        currentPos = nextPos;
        path.push(currentPos);
        moved = true;
        break;
      }
    }
    if (!moved) break;
  }

  const goalPos = path[path.length - 1];

  if (startPos.row === goalPos.row && startPos.col === goalPos.col) {
    return generateLevel(levelIndex);
  }

  grid[goalPos.row][goalPos.col] = CellType.Flower;

  const obstacleCount = Math.floor(levelWithinStage * 0.8) + stage;
  let placedObstacles = 0;
  let attempts = 0;
  while (placedObstacles < obstacleCount && attempts < size * size) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    const isPath = path.some(p => p.row === r && p.col === c);
    if (!isPath && grid[r][c] === CellType.Empty) {
      grid[r][c] = CellType.Obstacle;
      placedObstacles++;
    }
    attempts++;
  }
  
  return { grid, startPos, goalPos };
}
