import { Badge, GamificationRules } from '@/types';

export const gamificationRules: GamificationRules = {
  xpPerMessage: 10,
  xpPerScenarioComplete: 50,
  xpPerStreak: 25,
  levelThresholds: [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800, 5000],
};

export const badges: Badge[] = [
  {
    id: 'diplomatico',
    name: 'Diplomatico',
    description: 'Hai completato il primo scenario di feedback senza escalation.',
    icon: 'Shield',
    requirement: 'Completa uno scenario di Leadership',
  },
  {
    id: 'closer',
    name: 'Closer',
    description: 'Hai gestito con successo un\'obiezione sul prezzo.',
    icon: 'Target',
    requirement: 'Completa uno scenario di Vendita',
  },
  {
    id: 'mentore',
    name: 'Mentore',
    description: 'Hai guidato un nuovo assunto attraverso l\'onboarding completo.',
    icon: 'GraduationCap',
    requirement: 'Completa uno scenario HR',
  },
  {
    id: 'empatico',
    name: 'Empatico',
    description: 'Hai inviato più di 20 messaggi nelle simulazioni.',
    icon: 'Heart',
    requirement: 'Invia almeno 20 messaggi totali',
  },
  {
    id: 'stratega',
    name: 'Stratega',
    description: 'Hai completato tutti e 3 gli scenari disponibili.',
    icon: 'Lightbulb',
    requirement: 'Completa tutti gli scenari',
  },
  {
    id: 'campione',
    name: 'Campione',
    description: 'Hai raggiunto il livello 5 nella piattaforma.',
    icon: 'Trophy',
    requirement: 'Raggiungi il livello 5',
  },
];

export function calculateLevel(xp: number): number {
  const thresholds = gamificationRules.levelThresholds;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) return i + 1;
  }
  return 1;
}

export function getNextLevelXp(xp: number): number {
  const level = calculateLevel(xp);
  const thresholds = gamificationRules.levelThresholds;
  if (level >= thresholds.length) return thresholds[thresholds.length - 1];
  return thresholds[level];
}

export function getProgressToNextLevel(xp: number): number {
  const level = calculateLevel(xp);
  const thresholds = gamificationRules.levelThresholds;
  if (level >= thresholds.length) return 100;
  const currentThreshold = thresholds[level - 1];
  const nextThreshold = thresholds[level];
  const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}
