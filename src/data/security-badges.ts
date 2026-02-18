import { Badge } from '@/types';

// ─── ISO 9001:2015 ────────────────────────────────────────────────────────────
export const iso9001Badges: Badge[] = [
  {
    id: 'iso9001-base',
    areaId: 'iso-9001',
    name: 'Auditor in Formazione',
    description: 'Hai completato il primo scenario di audit ISO 9001.',
    icon: 'ClipboardCheck',
    requirement: 'Completa uno scenario ISO 9001',
  },
  {
    id: 'iso9001-intermediate',
    areaId: 'iso-9001',
    name: 'Esperto Qualità',
    description: 'Hai superato il quiz ISO 9001 con un punteggio superiore al 70%.',
    icon: 'Award',
    requirement: 'Supera il quiz ISO 9001 con >70%',
  },
  {
    id: 'iso9001-master',
    areaId: 'iso-9001',
    name: 'Master ISO 9001',
    description: 'Hai completato tutti gli scenari e il quiz della certificazione ISO 9001.',
    icon: 'Trophy',
    requirement: 'Completa tutti gli scenari e il quiz ISO 9001',
  },
];

// ─── ISO 14001:2015 ───────────────────────────────────────────────────────────
export const iso14001Badges: Badge[] = [
  {
    id: 'iso14001-base',
    areaId: 'iso-14001',
    name: 'Green Starter',
    description: 'Hai completato il primo scenario di gestione ambientale.',
    icon: 'Shield',
    requirement: 'Completa uno scenario ISO 14001',
  },
  {
    id: 'iso14001-intermediate',
    areaId: 'iso-14001',
    name: 'Environmental Expert',
    description: 'Hai superato il quiz ISO 14001 con un punteggio superiore al 70%.',
    icon: 'Award',
    requirement: 'Supera il quiz ISO 14001 con >70%',
  },
  {
    id: 'iso14001-master',
    areaId: 'iso-14001',
    name: 'Master Ambiente',
    description: 'Hai completato tutti gli scenari e il quiz della certificazione ISO 14001.',
    icon: 'Trophy',
    requirement: 'Completa tutti gli scenari e il quiz ISO 14001',
  },
];

// ─── ISO 45001:2018 ───────────────────────────────────────────────────────────
export const iso45001Badges: Badge[] = [
  {
    id: 'iso45001-base',
    areaId: 'iso-45001',
    name: 'Safety Champion',
    description: 'Hai completato il primo scenario di salute e sicurezza sul lavoro.',
    icon: 'Shield',
    requirement: 'Completa uno scenario ISO 45001',
  },
  {
    id: 'iso45001-intermediate',
    areaId: 'iso-45001',
    name: 'Risk Assessor',
    description: 'Hai superato il quiz ISO 45001 con un punteggio superiore al 70%.',
    icon: 'CheckCircle2',
    requirement: 'Supera il quiz ISO 45001 con >70%',
  },
  {
    id: 'iso45001-master',
    areaId: 'iso-45001',
    name: 'Master SSL',
    description: 'Hai completato tutti gli scenari e il quiz della certificazione ISO 45001.',
    icon: 'Trophy',
    requirement: 'Completa tutti gli scenari e il quiz ISO 45001',
  },
];

// ─── UNI EN 13549:2003 ────────────────────────────────────────────────────────
export const uni13549Badges: Badge[] = [
  {
    id: 'uni13549-base',
    areaId: 'uni-13549',
    name: 'Quality Inspector',
    description: 'Hai completato il primo scenario di gestione qualità pulizie.',
    icon: 'Star',
    requirement: 'Completa uno scenario UNI 13549',
  },
  {
    id: 'uni13549-intermediate',
    areaId: 'uni-13549',
    name: 'Cleaning Specialist',
    description: 'Hai superato il quiz UNI 13549 con un punteggio superiore al 70%.',
    icon: 'Award',
    requirement: 'Supera il quiz UNI 13549 con >70%',
  },
  {
    id: 'uni13549-master',
    areaId: 'uni-13549',
    name: 'Master Pulizie Pro',
    description: 'Hai completato tutti gli scenari e il quiz della UNI EN 13549.',
    icon: 'Trophy',
    requirement: 'Completa tutti gli scenari e il quiz UNI 13549',
  },
];

// ─── ISO 14064-1 ──────────────────────────────────────────────────────────────
export const iso14064Badges: Badge[] = [
  {
    id: 'iso14064-base',
    areaId: 'iso-14064',
    name: 'Carbon Analyst',
    description: 'Hai completato il primo scenario di calcolo delle emissioni GHG.',
    icon: 'ClipboardCheck',
    requirement: 'Completa uno scenario ISO 14064',
  },
  {
    id: 'iso14064-intermediate',
    areaId: 'iso-14064',
    name: 'GHG Verifier',
    description: 'Hai superato il quiz ISO 14064 con un punteggio superiore al 70%.',
    icon: 'Award',
    requirement: 'Supera il quiz ISO 14064 con >70%',
  },
  {
    id: 'iso14064-master',
    areaId: 'iso-14064',
    name: 'Master Carbon',
    description: 'Hai completato tutti gli scenari e il quiz della certificazione ISO 14064.',
    icon: 'Trophy',
    requirement: 'Completa tutti gli scenari e il quiz ISO 14064',
  },
];

// ─── UNI EN 16636 ─────────────────────────────────────────────────────────────
export const uni16636Badges: Badge[] = [
  {
    id: 'uni16636-base',
    areaId: 'uni-16636',
    name: 'Pest Inspector',
    description: 'Hai completato il primo scenario di pest management.',
    icon: 'Shield',
    requirement: 'Completa uno scenario UNI 16636',
  },
  {
    id: 'uni16636-intermediate',
    areaId: 'uni-16636',
    name: 'IPM Specialist',
    description: 'Hai superato il quiz UNI 16636 con un punteggio superiore al 70%.',
    icon: 'Medal',
    requirement: 'Supera il quiz UNI 16636 con >70%',
  },
  {
    id: 'uni16636-master',
    areaId: 'uni-16636',
    name: 'Master Pest Control',
    description: 'Hai completato tutti gli scenari e il quiz della UNI EN 16636.',
    icon: 'Trophy',
    requirement: 'Completa tutti gli scenari e il quiz UNI 16636',
  },
];

// ─── ALL ──────────────────────────────────────────────────────────────────────
export const allSecurityBadges: Badge[] = [
  ...iso9001Badges,
  ...iso14001Badges,
  ...iso45001Badges,
  ...uni13549Badges,
  ...iso14064Badges,
  ...uni16636Badges,
];

export function getSecurityBadgesByArea(areaId: string): Badge[] {
  return allSecurityBadges.filter((b) => b.areaId === areaId);
}
