import { Direction } from './types';

export const COMMAND_ICONS: Record<Direction, string> = {
  [Direction.Up]: '⬆️',
  [Direction.Down]: '⬇️',
  [Direction.Left]: '⬅️',
  [Direction.Right]: '➡️',
};

export const commandColors: Record<Direction, string> = {
  [Direction.Up]: 'bg-blue-400 hover:bg-blue-500',
  [Direction.Down]: 'bg-red-400 hover:bg-red-500',
  [Direction.Left]: 'bg-yellow-400 hover:bg-yellow-500',
  [Direction.Right]: 'bg-green-400 hover:bg-green-500',
};

export const TOTAL_LEVELS = 15;
