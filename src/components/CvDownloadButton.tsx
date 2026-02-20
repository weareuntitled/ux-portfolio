'use client';

import { Download } from 'lucide-react';

type CvDownloadButtonProps = {
  className?: string;
};

export function CvDownloadButton({ className }: CvDownloadButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
      aria-label="Download CV as PDF (opens print dialog)"
    >
      <Download className="h-4 w-4" strokeWidth={2} />
      Download PDF
    </button>
  );
}
