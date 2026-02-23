'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CvDownloadButton() {
  return (
    <Button asChild variant="outline" className="gap-2">
      <a href="/daniel_Peters_CV.pdf" download="Daniel_Peters_CV.pdf" aria-label="Download CV as PDF">
        <Download className="h-4 w-4" />
        Download PDF
      </a>
    </Button>
  );
}