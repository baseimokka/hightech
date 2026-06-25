import type { Service } from './types';

/**
 * Services catalogue. Drives the home services grid (all entries) and the
 * Services page detail rows (entries that have specifications). The quote-form
 * service dropdown is also derived from this list.
 */
export const services: Service[] = [

  
  {
    id: 'spare-parts',
    slug: 'spare-parts',
    icon: 'wrench',
    image: '/images/services/spare-parts.jpg',
    titleAr: 'قطع الغيار',
    titleEn: 'Spare Parts',
    descriptionAr: 'قطع غيار بالهندسة العكسية أو حسب المواصفات.',
    descriptionEn: 'Reverse-engineered and made-to-spec replacement components.',
    tagAr: 'قطع غيار',
    tagEn: 'Spare parts',
    specificationsAr: ['هندسة عكسية', 'كل السبائك', 'إنجاز 48 ساعة'],
    specificationsEn: ['Reverse-eng', 'Any alloy', '48h rush'],
  },
  {
    id: 'maintenance',
    slug: 'maintenance',
    icon: 'shield-check',
    image: '/images/services/maintenance.jpg',
    titleAr: 'الصيانة',
    titleEn: 'Maintenance',
    descriptionAr: 'صيانة وقائية وإصلاح فوري لخطوط الإنتاج.',
    descriptionEn: 'Preventive maintenance and rapid repair for production lines.',
    tagAr: 'صيانة',
    tagEn: 'Maintenance',
    specificationsAr: ['صيانة وقائية', 'طوارئ 24/7', 'قطع أصلية'],
    specificationsEn: ['Preventive', '24/7 callout', 'OEM parts'],
  },
  {
  id: 'training',
  slug: 'training',
  icon: 'graduation-cap',
  image: '/images/services/training.jpg',
  titleAr: 'التدريب',
  titleEn: 'Training',
  descriptionAr: 'برامج تدريب عملية ومتخصصة لتطوير مهارات الفرق الفنية والمهندسين على أحدث التقنيات الصناعية.',
  descriptionEn: 'Practical and specialized training programs to enhance the skills of engineers and technical teams using the latest industrial technologies.',
  tagAr: 'تدريب',
  tagEn: 'Training',
  specificationsAr: ['تدريب عملي', 'ورش عمل', 'شهادات إتمام'],
  specificationsEn: ['Hands-on Training', 'Workshops', 'Completion Certificates'],
},
  {
  id: 'consulting',
  slug: 'consulting',
  icon: 'briefcase',
  image: '/images/services/consulting.jpg',
  titleAr: 'الاستشارات',
  titleEn: 'Consulting',
  descriptionAr: 'استشارات هندسية وفنية لمساعدة الشركات على تحسين الإنتاجية، واختيار الحلول الصناعية المناسبة.',
  descriptionEn: 'Engineering and technical consulting services to help businesses improve productivity and implement the right industrial solutions.',
  tagAr: 'استشارات',
  tagEn: 'Consulting',
  specificationsAr: ['دعم فني', 'تحليل المشاريع', 'حلول مخصصة'],
  specificationsEn: ['Technical Support', 'Project Analysis', 'Customized Solutions'],
  },
  {
    id: 'technical-support',
    slug: 'technical-support',
    icon: 'headset',
    image: '/images/services/technical-support.jpg',
    titleAr: 'الدعم الفني',
    titleEn: 'Technical Support',
    descriptionAr: 'استشارات هندسية ودعم تطبيقي من فريق متخصص.',
    descriptionEn: 'Engineering consultation and applied support from specialists.',
    tagAr: 'دعم',
    tagEn: 'Support',
    specificationsAr: ['في الموقع', 'CAD/CAM', 'تدريب'],
    specificationsEn: ['On-site', 'CAD/CAM', 'Training'],
  },
  
];

/** Services shown as full detail rows on the Services page. */
export const detailedServices = services.filter((s) => s.specificationsEn.length > 0);
