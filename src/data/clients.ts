import type { Client } from './types';

/**
 * Client / partner logos rendered in the "Trusted by" strip. `logo` points at
 * a future SVG/PNG wordmark; until supplied the name is shown as text.
 */
export const clients: Client[] = [
  { id: 'aramco', name: 'ARAMCO', logo: '/images/clients/aramco.svg' },
  { id: 'sabic', name: 'SABIC', logo: '/images/clients/sabic.svg' },
  { id: 'alfanar', name: 'ALFANAR', logo: '/images/clients/alfanar.svg' },
  { id: 'maaden', name: 'MAADEN', logo: '/images/clients/maaden.svg' },
  { id: 'zamil', name: 'ZAMIL', logo: '/images/clients/zamil.svg' },
  { id: 'nesma', name: 'NESMA', logo: '/images/clients/nesma.svg' },
];
