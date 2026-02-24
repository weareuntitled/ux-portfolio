'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CvDownloadButtonProps = {
  className?: string;
};

export function CvDownloadButton({ className }: CvDownloadButtonProps) {
  return (
    <Button asChild variant="outline" className={cn('gap-2', className)}>
      <a href="/daniel_Peters_CV.pdf" download="Daniel_Peters_CV.pdf" aria-label="Download CV as PDF">
        <Download className="h-4 w-4" />
        Download PDF
      </a>
    </Button>
  );
}
