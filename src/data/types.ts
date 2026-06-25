/**
 * Shared content-layer types.
 *
 * The content layer is the single source of truth for all *domain* content
 * (company, services, machines, projects, clients, contact, statistics).
 * Every translatable field is stored as an explicit `*Ar` / `*En` pair so the
 * data can be edited without touching components. Use `pick()` to resolve a
 * pair against the active locale.
 *
 * (Pure UI strings — navigation, buttons, form labels, section eyebrows, SEO
 * meta — live in `messages/*.json` and are handled by next-intl.)
 */
import type { Locale } from '@/i18n/routing';

export type { Locale };

/** Resolve an Arabic/English pair against the active locale. */
export function pick(locale: string, ar: string, en: string): string {
  return locale === 'ar' ? ar : en;
}

/** Resolve an Arabic/English string-array pair against the active locale. */
export function pickList(locale: string, ar: string[], en: string[]): string[] {
  return locale === 'ar' ? ar : en;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface Industry {
  /** Lucide icon name (see components/ui/Icon). */
  icon: string;
  titleAr: string;
  titleEn: string;
}

export interface MissionVision {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface Company {
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  taglineAr: string;
  taglineEn: string;
  mission: MissionVision;
  vision: MissionVision;
  social: SocialLinks;
  industries: Industry[];
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  addressAr: string;
  addressEn: string;
  hoursAr: string;
  hoursEn: string;
  googleMapsUrl: string;
}

export interface StatCard {
  value: string;
  suffixAr: string;
  suffixEn: string;
  labelAr: string;
  labelEn: string;
}

export interface Statistics {
  yearsOfExperience: number;
  completedProjects: number;
  happyClients: number;
  machinesInstalled: number;
  /** The four KPI cards rendered in the hero strip and About page. */
  cards: StatCard[];
}

export interface Service {
  id: string;
  slug: string;
  /** Lucide icon name. */
  icon: string;
  image: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  /** Short caption used on the services media frame. */
  tagAr: string;
  tagEn: string;
  /** Spec chips shown on the Services page (empty = not shown as a detail row). */
  specificationsAr: string[];
  specificationsEn: string[];
}

export interface Client {
  id: string;
  name: string;
  logo: string;
}

export type ProjectCategoryKey = 'laser' | 'cnc' | 'fabrication';

export interface ProjectCategory {
  key: 'all' | ProjectCategoryKey;
  /** Short label used for the filter chips. */
  shortAr: string;
  shortEn: string;
  /** Long label used on the project media frame. */
  labelAr: string;
  labelEn: string;
}

export interface Project {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  category: ProjectCategoryKey;
  /** Lucide icon name (placeholder media). */
  icon: string;
  /** Larger 2×2 tile in the bento grid. */
  featured?: boolean;
  image: string;
  gallery: string[];
  descriptionAr: string;
  descriptionEn: string;
  clientName: string;
  completionDate: string;
}

export interface MachineCategory {
  id: string;
  slug: string;
  /** Lucide icon name used for placeholder media. */
  icon: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  coverImage: string;
}

export interface MachineSpec {
  labelAr: string;
  labelEn: string;
  valueAr: string;
  valueEn: string;
}

export interface Machine {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  /** References a MachineCategory slug. */
  category: string;
  image: string;
  gallery: string[];
  descriptionAr: string;
  descriptionEn: string;
  specifications: MachineSpec[];
  featuresAr: string[];
  featuresEn: string[];
  status: 'active' | 'inactive';
}
