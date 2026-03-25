import { BrandLogoMark } from '@/components/brand/BrandLogoMark';
import type { BrandLogoId } from '@/lib/brand-logos';

export function CvBrandLogo({ id, label }: { id: BrandLogoId; label: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-1.5">
      <BrandLogoMark id={id} label={label} size={36} className="max-h-full max-w-full" />
    </div>
  );
}
