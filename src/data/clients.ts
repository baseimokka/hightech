import type { Client } from './types';

/**
 * Client / partner logos rendered in the "Trusted by" strip. `logo` points at
 * the brand logo image; `name` is used as the image alt text.
 */
export const clients: Client[] = [
  { id: 'aramco', name: 'Aramco', logo: '/images/clients/aramco.png', width: 447, height: 447 },
  { id: 'arab-contractors', name: 'Arab Contractors Company', logo: '/images/clients/arab-contractors-company.jpg', width: 500, height: 500 },
  { id: 'elsewedy-electric', name: 'Elsewedy Electric', logo: '/images/clients/elsewedy-electric.jpg', width: 500, height: 500 },
  { id: 'military-production', name: 'Military Production Factory', logo: '/images/clients/military-production-factory.jpg', width: 500, height: 500 },
  { id: 'zamil', name: 'Zamil', logo: '/images/clients/zamil.png', width: 512, height: 512 },
  { id: 'nesma', name: 'Nesma', logo: '/images/clients/nesma.png', width: 447, height: 447 },
];
