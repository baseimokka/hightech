import type { Machine } from './types';

/**
 * Machine catalogue. Each machine references a `MachineCategory` slug. This is
 * the foundation for a future machines listing / detail pages — adding a
 * machine here (and its images) is all a future page needs.
 */
export const machines: Machine[] = [
  {
    id: 'vmc-850',
    slug: 'vmc-850-vertical-machining-center',
    nameAr: 'مركز تشغيل عمودي VMC-850',
    nameEn: 'VMC-850 Vertical Machining Center',
    category: 'cnc-machines',
    image: '/images/machines/vmc-850.jpg',
    gallery: ['/images/machines/vmc-850-1.jpg', '/images/machines/vmc-850-2.jpg'],
    descriptionAr: 'مركز تفريز عمودي 3 محاور بإطار صلب ومغزل عالي السرعة للتشغيل الدقيق.',
    descriptionEn: '3-axis vertical machining centre with a rigid frame and high-speed spindle for precision work.',
    specifications: [
      { labelAr: 'المحاور', labelEn: 'Axes', valueAr: '3 محاور', valueEn: '3-axis' },
      { labelAr: 'مساحة العمل', labelEn: 'Work area', valueAr: '850×500×500 مم', valueEn: '850×500×500 mm' },
      { labelAr: 'سرعة المغزل', labelEn: 'Spindle speed', valueAr: '12,000 لفة/د', valueEn: '12,000 rpm' },
      { labelAr: 'الدقة', labelEn: 'Accuracy', valueAr: '±0.005 مم', valueEn: '±0.005 mm' },
    ],
    featuresAr: ['تغيير أوتوماتيكي للعدد', 'نظام تبريد داخلي', 'وحدة تحكم Fanuc'],
    featuresEn: ['Automatic tool changer', 'Through-spindle coolant', 'Fanuc control'],
    status: 'active',
  },
  {
    id: 'fiber-laser-3015',
    slug: 'fiber-laser-3015',
    nameAr: 'ليزر فايبر 3015',
    nameEn: 'Fiber Laser 3015',
    category: 'fiber-laser-machines',
    image: '/images/machines/fiber-laser-3015.jpg',
    gallery: [],
    descriptionAr: 'ماكينة قص ليزر فايبر 6 كيلوواط لقص سريع للصفائح المعدنية حتى 25 مم.',
    descriptionEn: '6 kW fiber laser cutter for fast sheet-metal cutting up to 25 mm.',
    specifications: [
      { labelAr: 'القدرة', labelEn: 'Power', valueAr: '6 كيلوواط', valueEn: '6 kW' },
      { labelAr: 'مساحة القص', labelEn: 'Cutting area', valueAr: '3000×1500 مم', valueEn: '3000×1500 mm' },
      { labelAr: 'أقصى سماكة', labelEn: 'Max thickness', valueAr: '25 مم', valueEn: '25 mm' },
      { labelAr: 'الدقة', labelEn: 'Accuracy', valueAr: '±0.1 مم', valueEn: '±0.1 mm' },
    ],
    featuresAr: ['طاولة تبديل سريعة', 'رأس قص أوتوماتيكي', 'استشعار ارتفاع الرأس'],
    featuresEn: ['Shuttle table', 'Auto-focus cutting head', 'Capacitive height sensing'],
    status: 'active',
  },
  {
    id: 'co2-laser-1530',
    slug: 'co2-laser-1530',
    nameAr: 'ليزر CO₂ 1530',
    nameEn: 'CO₂ Laser 1530',
    category: 'laser-cutting-machines',
    image: '/images/machines/co2-laser-1530.jpg',
    gallery: [],
    descriptionAr: 'ماكينة قص ليزر CO₂ للمعادن والمواد غير المعدنية بمرونة عالية.',
    descriptionEn: 'CO₂ laser cutter for both metals and non-metals with high flexibility.',
    specifications: [
      { labelAr: 'القدرة', labelEn: 'Power', valueAr: '2 كيلوواط', valueEn: '2 kW' },
      { labelAr: 'مساحة القص', labelEn: 'Cutting area', valueAr: '1500×3000 مم', valueEn: '1500×3000 mm' },
      { labelAr: 'أقصى سماكة', labelEn: 'Max thickness', valueAr: '16 مم', valueEn: '16 mm' },
    ],
    featuresAr: ['دعم مواد متعددة', 'نظام شفط متكامل'],
    featuresEn: ['Multi-material support', 'Integrated fume extraction'],
    status: 'active',
  },
  {
    id: 'cnc-lathe-ck6150',
    slug: 'cnc-lathe-ck6150',
    nameAr: 'مخرطة CNC موديل CK6150',
    nameEn: 'CNC Lathe CK6150',
    category: 'cnc-machines',
    image: '/images/machines/cnc-lathe-ck6150.jpg',
    gallery: [],
    descriptionAr: 'مخرطة CNC أفقية للخراطة الدقيقة للأعمدة والقطع الدائرية.',
    descriptionEn: 'Horizontal CNC lathe for precise turning of shafts and round parts.',
    specifications: [
      { labelAr: 'أقصى قطر', labelEn: 'Max diameter', valueAr: 'Ø500 مم', valueEn: 'Ø500 mm' },
      { labelAr: 'أقصى طول', labelEn: 'Max length', valueAr: '1000 مم', valueEn: '1000 mm' },
      { labelAr: 'وحدة التحكم', labelEn: 'Control', valueAr: 'GSK / Fanuc', valueEn: 'GSK / Fanuc' },
    ],
    featuresAr: ['برجة عدد أوتوماتيكية', 'نظام تزييت مركزي'],
    featuresEn: ['Automatic turret', 'Central lubrication'],
    status: 'active',
  },
  {
    id: 'spindle-cartridge',
    slug: 'cnc-spindle-cartridge',
    nameAr: 'مغزل CNC بديل',
    nameEn: 'CNC Spindle Cartridge',
    category: 'cnc-spare-parts',
    image: '/images/machines/spindle-cartridge.jpg',
    gallery: [],
    descriptionAr: 'مغزل بديل عالي الدقة لمراكز التشغيل، جاهز للتركيب الفوري.',
    descriptionEn: 'High-precision replacement spindle cartridge for machining centres, ready to fit.',
    specifications: [
      { labelAr: 'سرعة قصوى', labelEn: 'Max speed', valueAr: '15,000 لفة/د', valueEn: '15,000 rpm' },
      { labelAr: 'نوع المخروط', labelEn: 'Taper', valueAr: 'BT40', valueEn: 'BT40' },
    ],
    featuresAr: ['متزن ديناميكياً', 'ضمان 12 شهراً'],
    featuresEn: ['Dynamically balanced', '12-month warranty'],
    status: 'active',
  },
  {
    id: 'press-brake-160t',
    slug: 'press-brake-160t',
    nameAr: 'مكبس ثني 160 طن',
    nameEn: 'Press Brake 160T',
    category: 'industrial-equipment',
    image: '/images/machines/press-brake-160t.jpg',
    gallery: [],
    descriptionAr: 'مكبس ثني هيدروليكي CNC لثني الصفائح المعدنية بزوايا دقيقة.',
    descriptionEn: 'CNC hydraulic press brake for bending sheet metal to precise angles.',
    specifications: [
      { labelAr: 'قوة الكبس', labelEn: 'Tonnage', valueAr: '160 طن', valueEn: '160 t' },
      { labelAr: 'طول الثني', labelEn: 'Bending length', valueAr: '3200 مم', valueEn: '3200 mm' },
      { labelAr: 'المحاور', labelEn: 'Axes', valueAr: '4 محاور', valueEn: '4-axis' },
    ],
    featuresAr: ['حاجز خلفي CNC', 'تعويض الانحناء'],
    featuresEn: ['CNC back gauge', 'Crowning compensation'],
    status: 'inactive',
  },
];

/** Machines that are currently available / installed. */
export const activeMachines = machines.filter((m) => m.status === 'active');

/** Look up a machine by its slug. */
export function getMachine(slug: string): Machine | undefined {
  return machines.find((m) => m.slug === slug);
}

/** Machines belonging to a category slug. */
export function getMachinesByCategory(categorySlug: string): Machine[] {
  return machines.filter((m) => m.category === categorySlug);
}
