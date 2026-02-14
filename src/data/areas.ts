import { CourseArea } from '@/types';

export const courseAreas: CourseArea[] = [
  {
    id: 'vendita',
    slug: 'vendita',
    title: 'Corso di Vendita',
    description:
      'Padroneggia le tecniche di vendita, gestisci le obiezioni, impara a chiudere trattative e a guidare il tuo team commerciale con sicurezza.',
    icon: 'TrendingUp',
    color: 'indigo',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing & AI',
    description:
      'Scopri le basi del marketing digitale, impara a utilizzare l\'intelligenza artificiale per le campagne e sviluppa strategie di contenuto efficaci.',
    icon: 'Sparkles',
    color: 'violet',
    gradient: 'from-violet-500 to-fuchsia-600',
  },
];
