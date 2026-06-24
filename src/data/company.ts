import type { Company } from './types';

/**
 * Company information — name, description, mission, vision, the industries
 * served and social links. Edit here to update the About page, footer and
 * structured data.
 */
export const company: Company = {
  nameAr: 'هاي تك',
  nameEn: 'High Tech',

  descriptionAr:
    'بدأنا كورشة صغيرة وكبرنا لنصبح أحد أكبر مصانع تشغيل المعادن في المنطقة، مدعومين بأحدث مكائن CNC والليزر وفريق هندسي لا يقبل بأقل من الكمال.',
  descriptionEn:
    'We started as a small workshop and grew into one of the region’s largest metalworking facilities — backed by the latest CNC and laser machines and an engineering team that won’t settle for less than perfect.',

  taglineAr: 'دقّة هندسية على مستوى صناعي.',
  taglineEn: 'Precision engineering at industrial scale.',

  mission: {
    titleAr: 'رسالتنا',
    titleEn: 'Our mission',
    descriptionAr: 'تمكين الصناعة بقطع معدنية دقيقة تُصنع في الوقت المحدد وبأعلى جودة.',
    descriptionEn: 'Empower industry with precision metal parts, made on time to the highest quality.',
  },
  vision: {
    titleAr: 'رؤيتنا',
    titleEn: 'Our vision',
    descriptionAr: 'أن نكون الخيار الأول لتشغيل المعادن في الشرق الأوسط ومنافساً للعلامات العالمية.',
    descriptionEn: 'To be the first choice for metalworking in the Middle East and a rival to global brands.',
  },

  social: {
    linkedin: '#',
    instagram: '#',
    youtube: '#',
  },

  industries: [
    { icon: 'fuel', titleAr: 'النفط والغاز', titleEn: 'Oil & Gas' },
    { icon: 'car', titleAr: 'السيارات', titleEn: 'Automotive' },
    { icon: 'building-2', titleAr: 'الإنشاءات', titleEn: 'Construction' },
    { icon: 'zap', titleAr: 'الطاقة', titleEn: 'Energy' },
    { icon: 'pill', titleAr: 'الأغذية والأدوية', titleEn: 'Food & Pharma' },
    { icon: 'plane', titleAr: 'الطيران', titleEn: 'Aerospace' },
  ],
};
