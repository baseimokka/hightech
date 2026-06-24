import type { Statistics } from './types';

/**
 * Company statistics. The four headline KPIs are editable numbers; `cards` are
 * the four metrics rendered in the hero strip and on the About page (kept as
 * display strings so values like "±0.02" and "2.4k" stay exact).
 */
export const statistics: Statistics = {
  yearsOfExperience: 25,
  completedProjects: 2400,
  happyClients: 320,
  machinesInstalled: 60,

  cards: [
    { value: '25', suffixAr: '+', suffixEn: '+', labelAr: 'سنة خبرة', labelEn: 'Years in operation' },
    { value: '±0.02', suffixAr: 'مم', suffixEn: 'mm', labelAr: 'دقة التصنيع', labelEn: 'Machining tolerance' },
    { value: '98', suffixAr: '٪', suffixEn: '%', labelAr: 'تسليم في الموعد', labelEn: 'On-time delivery' },
    { value: '2.4k', suffixAr: '', suffixEn: '', labelAr: 'مشروع منجز', labelEn: 'Projects delivered' },
  ],
};
