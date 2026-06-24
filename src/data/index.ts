/**
 * Content layer — single source of truth for all domain content.
 *
 * Import from `@/data` anywhere in the app:
 *   import { services, company, contact, pick } from '@/data';
 *
 * Editing content = editing these files only. No component changes required.
 */
export * from './types';

export { company } from './company';
export { contact } from './contact';
export { statistics } from './statistics';
export { services, detailedServices } from './services';
export { clients } from './clients';
export {
  projects,
  projectCategories,
  projectLabelAr,
  projectLabelEn,
} from './projects';
export { machineCategories, getMachineCategory } from './machineCategories';
export { machines, activeMachines, getMachine, getMachinesByCategory } from './machines';
