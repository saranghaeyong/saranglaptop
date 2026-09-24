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
  return isDark
    ? {
        chassis: '#20242b',
        chassisRoughness: 0.24,
        chassisMetalness: 0.92,
        keyboardDeck: '#171a1f',
        keycap: '#0e1014',
        keycapEmissive: '#8fb7ff',
        screenBezel: '#050608',
        pcb: '#0b2116',
        copper: '#c9783b',
        battery: '#15171b',
        silicon: '#262b32',
        gold: '#c7a75a',
        fanBlade: '#22262c',
        hinge: '#505762',
        glass: '#07090c',
        accent: '#8fb7ff'
      }
    : {
        chassis: '#b9bec6',
        chassisRoughness: 0.22,
        chassisMetalness: 0.94,
        keyboardDeck: '#d4d8de',
        keycap: '#17191d',
        keycapEmissive: '#d9e6ff',
        screenBezel: '#090b0e',
        pcb: '#12301e',
        copper: '#c86f37',
        battery: '#24272c',
        silicon: '#3a414b',
        gold: '#b99445',
        fanBlade: '#aab1ba',
        hinge: '#6f7782',
        glass: '#eef3f8',
        accent: '#4778c9'
      };
}
