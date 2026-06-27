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
    'تقدم هاي تك أحدث الماكينات الصناعية وقطع الغيار الأصلية، إلى جانب خدمات التركيب والصيانة والدعم الفني وخدمات ما بعد البيع. نعمل على توفير حلول صناعية متكاملة تساعد المصانع على رفع الإنتاجية وتحسين كفاءة التشغيل وتحقيق أعلى مستويات الاعتمادية.',
  descriptionEn:
    'Hi-Tech delivers advanced industrial machinery, genuine spare parts, and comprehensive engineering services. From equipment supply to installation, maintenance, technical support, and after-sales service, we help manufacturers improve productivity, reliability, and operational efficiency.',

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
    facebook: 'https://www.facebook.com/share/1Cz1Bi5E3y/',
    instagram: 'https://www.instagram.com/hightech_cnc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
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
