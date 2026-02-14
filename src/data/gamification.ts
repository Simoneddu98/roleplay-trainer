import { Badge, GamificationRules } from '@/types';

export const gamificationRules: GamificationRules = {
  xpPerMessage: 10,
  xpPerScenarioComplete: 50,
  xpPerStreak: 25,
  levelThresholds: [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800, 5000],
};

// ─── BADGES VENDITA ──────────────────────────────────────────────────────────

export const venditaBadges: Badge[] = [
  {
    id: 'diplomatico',
    areaId: 'vendita',
    name: 'Diplomatico',
    description: 'Hai completato il primo scenario di feedback senza escalation.',
    icon: 'Shield',
    requirement: 'Completa uno scenario di Leadership',
  },
  {
    id: 'closer',
    areaId: 'vendita',
    name: 'Closer',
    description: 'Hai gestito con successo un\'obiezione sul prezzo.',
    icon: 'Target',
    requirement: 'Completa uno scenario di Vendita',
  },
  {
    id: 'mentore',
    areaId: 'vendita',
    name: 'Mentore',
    description: 'Hai guidato un nuovo assunto attraverso l\'onboarding completo.',
    icon: 'GraduationCap',
    requirement: 'Completa uno scenario HR',
  },
  {
    id: 'leader-vendita',
    areaId: 'vendita',
    name: 'Leader Vendita',
    description: 'Hai completato tutti gli scenari dell\'area Vendita.',
    icon: 'Trophy',
    requirement: 'Completa tutti gli scenari Vendita',
  },
];

// ─── BADGES DIGITAL MARKETING & AI ──────────────────────────────────────────

export const digitalMarketingBadges: Badge[] = [
  {
    id: 'social-guru',
    areaId: 'digital-marketing',
    name: 'Social Guru',
    description: 'Hai impostato una strategia social completa per un cliente.',
    icon: 'Share2',
    requirement: 'Completa lo scenario Social Media',
  },
  {
    id: 'ai-pioneer',
    areaId: 'digital-marketing',
    name: 'AI Pioneer',
    description: 'Hai spiegato con successo l\'uso dell\'AI nelle campagne ads.',
    icon: 'Bot',
    requirement: 'Completa lo scenario AI',
  },
  {
    id: 'content-creator',
    areaId: 'digital-marketing',
    name: 'Content Creator',
    description: 'Hai definito una content strategy per una startup.',
    icon: 'PenTool',
    requirement: 'Completa lo scenario Content Strategy',
  },
  {
    id: 'digital-master',
    areaId: 'digital-marketing',
    name: 'Digital Master',
    description: 'Hai completato tutti gli scenari di Digital Marketing & AI.',
    icon: 'Sparkles',
    requirement: 'Completa tutti gli scenari Digital Marketing',
  },
];

// ─── BADGES GLOBALI ──────────────────────────────────────────────────────────

export const globalBadges: Badge[] = [
  {
    id: 'empatico',
    name: 'Empatico',
    description: 'Hai inviato più di 20 messaggi nelle simulazioni.',
    icon: 'Heart',
    requirement: 'Invia almeno 20 messaggi totali',
  },
  {
    id: 'campione',
    name: 'Campione',
    description: 'Hai raggiunto il livello 5 nella piattaforma.',
    icon: 'Trophy',
    requirement: 'Raggiungi il livello 5',
  },
];

export const allBadges: Badge[] = [
  ...venditaBadges,
  ...digitalMarketingBadges,
  ...globalBadges,
];

export function getBadgesByArea(areaId: string): Badge[] {
  return allBadges.filter((b) => b.areaId === areaId || !b.areaId);
}

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

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
