import type { Client } from './types';

/**
 * Client / partner logos rendered in the "Trusted by" strip. `logo` points at
 * a future SVG/PNG wordmark; until supplied the name is shown as text.
 */
export const clients: Client[] = [
  { id: 'aramco', name: 'ARAMCO', logo: '/images/clients/aramco.svg' },
  { id: 'arab contractors company', name: 'arab contractors company', logo: '/images/clients/arab contractors company.svg' },
  { id: 'elsewedy electric', name: 'elsewedy electric', logo: '/images/clients/elsewedy electric.svg' },
  { id: 'military production factory', name: 'military production factory', logo: '/images/clients/military production factory.svg' },
  { id: 'zamil', name: 'ZAMIL', logo: '/images/clients/zamil.svg' },
  { id: 'nesma', name: 'NESMA', logo: '/images/clients/nesma.svg' },
];
