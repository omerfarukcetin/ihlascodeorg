export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export enum CellType {
  Empty = 'EMPTY',
  Bee = 'BEE',
  Flower = 'FLOWER',
  Obstacle = 'OBSTACLE',
}

export enum GameState {
  Idle = 'IDLE',
  Running = 'RUNNING',
  Success = 'SUCCESS',
  Fail = 'FAIL',
}

export interface Position {
  row: number;
  col: number;
}

export interface Level {
  grid: CellType[][];
  startPos: Position;
  goalPos: Position;
}

export interface Theme {
  playerIcon: string;
  goalIcon: string;
  obstacleIcon: string;
  gridBgColor: string;
  cellBgColor: string;
  obstacleCellBgColor: string;
  failMessage: string;
  successMessage: string;
}
