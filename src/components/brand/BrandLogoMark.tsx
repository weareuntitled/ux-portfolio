'use client';

import Image from 'next/image';
import { brandLogos, type BrandLogoId } from '@/lib/brand-logos';
import { cn } from '@/lib/utils';

type BrandLogoMarkProps = {
  id: BrandLogoId;
  label: string;
  /** Logical box size (next/image width/height) */
  size?: number;
  className?: string;
};

/**
 * Inline brand / institution mark from `src/app/images` (bundled).
 * Use `unoptimized` for SVG sources.
 */
export function BrandLogoMark({ id, label, size = 40, className }: BrandLogoMarkProps) {
  return (
    <Image
      src={brandLogos[id]}
      alt={label}
      width={size}
      height={size}
      className={cn('shrink-0 object-contain', className)}
      unoptimized
    />
  );
}
