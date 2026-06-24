import type { Project, ProjectCategory } from './types';

/** Generic word for a project, used in media-frame captions. */
export const projectLabelAr = 'مشروع';
export const projectLabelEn = 'Project';

/**
 * Portfolio categories. The first entry ("all") is the default filter; the rest
 * map to `Project.category`. `short*` drives the filter chips, `label*` drives
 * the media-frame label.
 */
export const projectCategories: ProjectCategory[] = [
  { key: 'all', shortAr: 'الكل', shortEn: 'All', labelAr: '', labelEn: '' },
  { key: 'laser', shortAr: 'ليزر', shortEn: 'Laser', labelAr: 'قص ليزر', labelEn: 'Laser cutting' },
  { key: 'cnc', shortAr: 'CNC', shortEn: 'CNC', labelAr: 'تصنيع CNC', labelEn: 'CNC machining' },
  { key: 'fabrication', shortAr: 'تصنيع', shortEn: 'Fabrication', labelAr: 'تصنيع', labelEn: 'Fabrication' },
];

/**
 * Portfolio projects. The home page teaser uses the first four; the portfolio
 * page renders all of them with category filtering. `featured` marks the large
 * 2×2 bento tiles.
 */
export const projects: Project[] = [
  {
    id: 'p1',
    slug: 'laser-cut-steel-facade',
    titleAr: 'واجهة فولاذية مقطوعة بالليزر',
    titleEn: 'Laser-cut steel facade',
    category: 'laser',
    icon: 'layout-grid',
    featured: true,
    image: '/images/projects/steel-facade.jpg',
    gallery: [],
    descriptionAr: 'واجهة معمارية بأنماط دقيقة مقطوعة بالليزر على صفائح فولاذية.',
    descriptionEn: 'Architectural facade with intricate patterns laser-cut from steel sheet.',
    clientName: 'ARAMCO',
    completionDate: '2025-09',
  },
  {
    id: 'p2',
    slug: 'cnc-machined-housing',
    titleAr: 'حاوية مشغّلة CNC',
    titleEn: 'CNC machined housing',
    category: 'cnc',
    icon: 'cog',
    image: '/images/projects/machined-housing.jpg',
    gallery: [],
    descriptionAr: 'حاوية ألمنيوم بتفاوتات دقيقة مشغّلة على ماكينة 5 محاور.',
    descriptionEn: 'Tight-tolerance aluminium housing machined on a 5-axis centre.',
    clientName: 'SABIC',
    completionDate: '2025-07',
  },
  {
    id: 'p3',
    slug: 'welded-frame-assembly',
    titleAr: 'هيكل ملحوم',
    titleEn: 'Welded frame assembly',
    category: 'fabrication',
    icon: 'layers',
    image: '/images/projects/welded-frame.jpg',
    gallery: [],
    descriptionAr: 'هيكل فولاذي إنشائي ملحوم ومجهّز للطلاء.',
    descriptionEn: 'Structural steel frame, welded and prepared for coating.',
    clientName: 'ZAMIL',
    completionDate: '2025-06',
  },
  {
    id: 'p4',
    slug: 'laser-cutting-reel',
    titleAr: 'لقطات قص بالليزر',
    titleEn: 'Laser cutting reel',
    category: 'laser',
    icon: 'scan-line',
    image: '/images/projects/laser-reel.jpg',
    gallery: [],
    descriptionAr: 'مقطع لخط قص ليزر فايبر أثناء التشغيل.',
    descriptionEn: 'Footage of a fiber laser cutting line in production.',
    clientName: 'MAADEN',
    completionDate: '2025-05',
  },
  {
    id: 'p5',
    slug: 'precision-turned-shafts',
    titleAr: 'أعمدة مخروطة بدقة',
    titleEn: 'Precision turned shafts',
    category: 'cnc',
    icon: 'circle-dot',
    image: '/images/projects/turned-shafts.jpg',
    gallery: [],
    descriptionAr: 'أعمدة فولاذية مخروطة بتفاوتات ميكرونية للمضخات.',
    descriptionEn: 'Steel shafts turned to micron tolerances for pump assemblies.',
    clientName: 'ALFANAR',
    completionDate: '2025-04',
  },
  {
    id: 'p6',
    slug: 'structural-steel-canopy',
    titleAr: 'مظلة فولاذية إنشائية',
    titleEn: 'Structural steel canopy',
    category: 'fabrication',
    icon: 'frame',
    featured: true,
    image: '/images/projects/steel-canopy.jpg',
    gallery: [],
    descriptionAr: 'مظلة فولاذية كبيرة مصنّعة ومجمّعة في الموقع.',
    descriptionEn: 'Large steel canopy fabricated and assembled on site.',
    clientName: 'NESMA',
    completionDate: '2025-03',
  },
  {
    id: 'p7',
    slug: 'perforated-panel-array',
    titleAr: 'ألواح مثقّبة',
    titleEn: 'Perforated panel array',
    category: 'laser',
    icon: 'grid-2x2',
    image: '/images/projects/perforated-panels.jpg',
    gallery: [],
    descriptionAr: 'ألواح ستانلس ستيل مثقّبة بأنماط دقيقة للتهوية.',
    descriptionEn: 'Stainless panels precision-perforated for ventilation.',
    clientName: 'SABIC',
    completionDate: '2025-02',
  },
  {
    id: 'p8',
    slug: 'custom-gearbox-parts',
    titleAr: 'قطع علبة تروس مخصصة',
    titleEn: 'Custom gearbox parts',
    category: 'cnc',
    icon: 'settings',
    image: '/images/projects/gearbox-parts.jpg',
    gallery: [],
    descriptionAr: 'قطع علبة تروس بالهندسة العكسية لخطوط إنتاج قديمة.',
    descriptionEn: 'Reverse-engineered gearbox parts for legacy production lines.',
    clientName: 'MAADEN',
    completionDate: '2025-01',
  },
];
