/** Lightweight placeholder for dynamically loaded below-the-fold sections */
export function SectionSkeleton({ className = 'min-h-[200px]' }: { className?: string }) {
  return <div className={className} aria-hidden />;
}
