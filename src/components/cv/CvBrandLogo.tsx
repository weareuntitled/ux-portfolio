import { BrandLogoMark } from '@/components/brand/BrandLogoMark';
import type { BrandLogoId } from '@/lib/brand-logos';

export function CvBrandLogo({ id, label }: { id: BrandLogoId; label: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-card/80 p-1.5">
      <BrandLogoMark id={id} label={label} size={36} className="max-h-full max-w-full" />
    </div>
  );
}
