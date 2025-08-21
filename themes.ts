import { Theme } from './types';

export const THEMES: Theme[] = [
  { // 0-4: Nature
    playerIcon: '🐝',
    goalIcon: '🌻',
    obstacleIcon: '🌳',
    gridBgColor: 'bg-green-300/70',
    cellBgColor: 'bg-green-100/50',
    obstacleCellBgColor: 'bg-red-200/60',
    failMessage: 'Arı çiçeğe ulaşamadı.',
    successMessage: 'Harika! Arı çiçeğine kavuştu!',
  },
  { // 5-9: Space
    playerIcon: '🚀',
    goalIcon: '🪐',
    obstacleIcon: '☄️',
    gridBgColor: 'bg-indigo-900/80',
    cellBgColor: 'bg-indigo-400/50',
    obstacleCellBgColor: 'bg-orange-600/70',
    failMessage: 'Roket gezegene ulaşamadı.',
    successMessage: 'Görev tamamlandı!',
  },
  { // 10-14: Ocean
    playerIcon: '🐠',
    goalIcon: '💎',
    obstacleIcon: '🦀',
    gridBgColor: 'bg-cyan-400/70',
    cellBgColor: 'bg-cyan-100/50',
    obstacleCellBgColor: 'bg-pink-400/60',
    failMessage: 'Balık hazineye ulaşamadı.',
    successMessage: 'Hazineyi buldun!',
  }
];
