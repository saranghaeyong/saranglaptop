import * as THREE from 'three';

export interface ThemeColors {
  chassis: string;
  chassisRoughness: number;
  chassisMetalness: number;
  keyboardDeck: string;
  keycap: string;
  keycapEmissive: string;
  screenBezel: string;
  pcb: string;
  copper: string;
  battery: string;
  silicon: string;
  gold: string;
  fanBlade: string;
  hinge: string;
  glass: string;
  accent: string;
}

export function getThemeMaterials(isDark: boolean): ThemeColors {
  if (isDark) {
    return {
      chassis: '#1e2128', // Space Gray / dark anodized aluminum
      chassisRoughness: 0.35,
      chassisMetalness: 0.85,
      keyboardDeck: '#14161a',
      keycap: '#121316',
      keycapEmissive: '#3b82f6',
      screenBezel: '#0a0a0c',
      pcb: '#0d2818', // Deep engineering green/black
      copper: '#d97736', // Polished heatpipe copper
      battery: '#18191c',
      silicon: '#22252a',
      gold: '#d4af37',
      fanBlade: '#1a1c20',
      hinge: '#333742',
      glass: '#08080a',
      accent: '#60a5fa'
    };
  } else {
    return {
      chassis: '#d8dce2', // Crisp silver aluminum
      chassisRoughness: 0.28,
      chassisMetalness: 0.88,
      keyboardDeck: '#e8eaed',
      keycap: '#f8fafc',
      keycapEmissive: '#93c5fd',
      screenBezel: '#18181b',
      pcb: '#0f381e',
      copper: '#ea7a38',
      battery: '#27272a',
      silicon: '#334155',
      gold: '#eab308',
      fanBlade: '#cbd5e1',
      hinge: '#94a3b8',
      glass: '#f1f5f9',
      accent: '#2563eb'
    };
  }
}
