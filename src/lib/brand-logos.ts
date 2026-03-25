import eco8020 from '@/app/images/logos/8020.svg';
import kontrastFestival from '@/app/images/logos/kontrast-festival.jpg';
import smartpatient from '@/app/images/logos/smartpatient.svg';
import thi from '@/app/images/logos/thi.png';
import untitledUx from '@/app/images/logos/untitled-ux.png';

/**
 * Central brand / institution marks from `src/app/images/logos`.
 * Use with `next/image` and `unoptimized` (SVG + consistent behavior).
 */
export const brandLogos = {
  untitledUx,
  eco8020,
  smartpatient,
  thi,
  kontrastFestival,
} as const;

export type BrandLogoId = keyof typeof brandLogos;
