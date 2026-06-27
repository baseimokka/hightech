import type { Client } from './types';

/**
 * Client / partner logos rendered in the "Trusted by" strip. `logo` points at
 * the brand logo image; `name` is used as the image alt text.
 */
export const clients: Client[] = [
  { id: 'aramco', name: 'Aramco', logo: '/images/clients/aramco.png' },
  { id: 'arab-contractors', name: 'Arab Contractors Company', logo: '/images/clients/arab-contractors-company.jpg' },
  { id: 'elsewedy-electric', name: 'Elsewedy Electric', logo: '/images/clients/elsewedy-electric.jpg' },
  { id: 'military-production', name: 'Military Production Factory', logo: '/images/clients/military-production-factory.jpg' },
  { id: 'zamil', name: 'Zamil', logo: '/images/clients/zamil.png' },
  { id: 'nesma', name: 'Nesma', logo: '/images/clients/nesma.png' },
];
