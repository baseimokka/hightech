import type { Certification } from './types';

/**
 * Quality / compliance certifications shown on the About page.
 * Add a new entry here (with its logo in /public/images/certifications) as more
 * certificates are issued — the About certifications grid renders them all.
 */
export const certifications: Certification[] = [
  {
    id: 'iso-9001',
    logo: '/images/certifications/iso.png',
    width: 496,
    height: 403,
    titleAr: 'آيزو 9001:2015',
    titleEn: 'ISO 9001:2015',
    descriptionAr: 'نظام إدارة الجودة',
    descriptionEn: 'Quality Management System',
  },
  {
    id: 'sgs',
    logo: '/images/certifications/sgs.png',
    width: 320,
    height: 320,
    titleAr: 'SGS',
    titleEn: 'SGS',
    descriptionAr: 'اعتماد نظام الجودة ISO 9001',
    descriptionEn: 'ISO 9001 System Certification',
  },
  {
    id: 'ce',
    logo: '/images/certifications/ce.png',
    width: 554,
    height: 554,
    titleAr: 'علامة CE',
    titleEn: 'CE Marking',
    descriptionAr: 'المطابقة الأوروبية',
    descriptionEn: 'European Conformity',
  },
  {
    id: 'cqc',
    logo: '/images/certifications/cqc.jpg',
    width: 250,
    height: 159,
    titleAr: 'CQC',
    titleEn: 'CQC',
    descriptionAr: 'شهادة الجودة الصينية',
    descriptionEn: 'China Quality Certification',
  },
  {
    id: 'cnas',
    logo: '/images/certifications/cnas.png',
    width: 447,
    height: 447,
    titleAr: 'CNAS',
    titleEn: 'CNAS',
    descriptionAr: 'الاعتماد الوطني الصيني',
    descriptionEn: 'China National Accreditation',
  },
];
