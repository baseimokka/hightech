import type { ContactInfo } from './types';

/**
 * Contact details — used by the contact page, footer, WhatsApp links and the
 * floating action button. `whatsapp` must be in full international format with
 * digits only.
 */
export const contact: ContactInfo = {
  phone: '+201286000646',
  whatsapp: '201286000646',
  email: 'sales@hightech.sa',

  addressAr: 'المنطقة الصناعية الثالثة، الرياض، المملكة العربية السعودية',
  addressEn: '3rd Industrial Zone, Riyadh, Saudi Arabia',

  hoursAr: 'الأحد – الخميس · 8 ص – 6 م',
  hoursEn: 'Sun – Thu · 8 AM – 6 PM',

  googleMapsUrl: 'https://maps.google.com/?q=3rd+Industrial+Zone+Riyadh',
};
