import type { MachineCategory } from './types';

/**
 * Reusable machine categories. Each machine in `machines.ts` references one of
 * these by `slug`. Ready for a future machines listing / category pages — no
 * component currently renders these, so adding the pages later only needs to
 * consume this data.
 */
export const machineCategories: MachineCategory[] = [
  {
    id: 'cnc-machines',
    slug: 'cnc-machines',
    icon: 'cog',
    titleAr: 'مكائن CNC',
    titleEn: 'CNC Machines',
    descriptionAr: 'مراكز تشغيل ومخارط CNC للخراطة والتفريز الدقيق متعدد المحاور.',
    descriptionEn: 'CNC machining centres and lathes for precise multi-axis milling and turning.',
    coverImage: '/images/machines/categories/cnc-machines.jpg',
  },
  {
    id: 'laser-cutting-machines',
    slug: 'laser-cutting-machines',
    icon: 'scan-line',
    titleAr: 'مكائن قص بالليزر',
    titleEn: 'Laser Cutting Machines',
    descriptionAr: 'مكائن قص بالليزر للصفائح المعدنية بأطوال وسماكات متنوعة.',
    descriptionEn: 'Laser cutting machines for sheet metal across a range of sizes and thicknesses.',
    coverImage: '/images/machines/categories/laser-cutting.jpg',
  },
  {
    id: 'fiber-laser-machines',
    slug: 'fiber-laser-machines',
    icon: 'flame',
    titleAr: 'مكائن ليزر فايبر',
    titleEn: 'Fiber Laser Machines',
    descriptionAr: 'مكائن ليزر فايبر عالية القدرة لقص سريع ودقيق للمعادن.',
    descriptionEn: 'High-power fiber laser machines for fast, accurate metal cutting.',
    coverImage: '/images/machines/categories/fiber-laser.jpg',
  },
  {
    id: 'cnc-spare-parts',
    slug: 'cnc-spare-parts',
    icon: 'wrench',
    titleAr: 'قطع غيار CNC',
    titleEn: 'CNC Spare Parts',
    descriptionAr: 'قطع غيار أصلية وبديلة لمكائن CNC والليزر بمختلف الماركات.',
    descriptionEn: 'OEM and replacement spare parts for CNC and laser machines across brands.',
    coverImage: '/images/machines/categories/spare-parts.jpg',
  },
  {
    id: 'industrial-equipment',
    slug: 'industrial-equipment',
    icon: 'layers',
    titleAr: 'معدات صناعية',
    titleEn: 'Industrial Equipment',
    descriptionAr: 'مكابس وثنّايات ومعدات تشكيل ولحام للورش الصناعية.',
    descriptionEn: 'Press brakes, benders and forming / welding equipment for industrial shops.',
    coverImage: '/images/machines/categories/industrial-equipment.jpg',
  },
];

/** Look up a category by its slug. */
export function getMachineCategory(slug: string): MachineCategory | undefined {
  return machineCategories.find((c) => c.slug === slug);
}
