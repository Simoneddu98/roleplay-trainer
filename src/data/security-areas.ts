import { CourseArea } from '@/types';

export const securityAreas: CourseArea[] = [
  {
    id: 'iso-9001',
    slug: 'iso-9001',
    title: 'ISO 9001:2015 - Qualità',
    description:
      'Sistema di gestione della qualità: audit interni, gestione delle non conformità, miglioramento continuo e soddisfazione del cliente.',
    icon: 'ClipboardCheck',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'iso-14001',
    slug: 'iso-14001',
    title: 'ISO 14001:2015 - Ambiente',
    description:
      'Sistema di gestione ambientale: aspetti e impatti ambientali, conformità legislativa, piani di emergenza e monitoraggio ambientale.',
    icon: 'Leaf',
    color: 'emerald',
    gradient: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'iso-45001',
    slug: 'iso-45001',
    title: 'ISO 45001:2018 - Salute e Sicurezza',
    description:
      'Sistema di gestione per la salute e sicurezza sul lavoro: valutazione dei rischi, prevenzione infortuni, gestione emergenze e consultazione dei lavoratori.',
    icon: 'Shield',
    color: 'red',
    gradient: 'from-red-500 to-orange-600',
  },
  {
    id: 'uni-13549',
    slug: 'uni-13549',
    title: 'UNI EN 13549:2003 - Pulizie Professionali',
    description:
      'Servizi di pulizia professionali: definizione dei processi, controllo qualità, gestione dei reclami e standard di servizio.',
    icon: 'Sparkles',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'iso-14064',
    slug: 'iso-14064',
    title: 'ISO 14064-1 - Emissioni GHG',
    description:
      'Quantificazione e rendicontazione delle emissioni di gas ad effetto serra: carbon footprint, inventario GHG, Scope 1-2-3 e verifiche di terza parte.',
    icon: 'Wind',
    color: 'green',
    gradient: 'from-green-600 to-emerald-700',
  },
  {
    id: 'uni-16636',
    slug: 'uni-16636',
    title: 'UNI EN 16636 - Pest Management',
    description:
      'Gestione professionale degli infestanti: ispezioni, monitoraggio, trattamenti integrati e documentazione delle attività di disinfestazione.',
    icon: 'Bug',
    color: 'violet',
    gradient: 'from-violet-600 to-purple-700',
  },
];
