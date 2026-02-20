'use client';

import { cn } from '@/lib/utils';

const steps: { label: string; description: string }[] = [
  {
    label: 'Setup',
    description:
      'Select vehicle and regulation scope. Configure templates and regs for the COP run.',
  },
  {
    label: 'Assign',
    description:
      'Delegate verdicts to owners. Bulk routing by OE or component.',
  },
  {
    label: 'Resolve',
    description:
      'Owners upload evidence and complete verdicts. Status linked for audit trail.',
  },
  {
    label: 'Approve',
    description:
      'Review and approve. Audit snapshot and sign-off before release or reuse.',
  },
  {
    label: 'Reuse',
    description:
      'Clone and inherit from previous runs. Reuse templates where regulation allows.',
  },
];

export function KovonProcessStepper({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-3xl space-y-12 py-12',
        className
      )}
    >
      <div className="mb-4 flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          High Level Tool Workflow
        </h2>
        <p className="text-muted-foreground">
          From initial configuration to audit-ready compliance.
        </p>
      </div>

      <div className="relative flex flex-col gap-6">
        {/* Vertical dashed line */}
        <div
          className="absolute bottom-10 left-[40px] top-10 w-px border-l-2 border-dashed border-border/60 sm:left-[56px]"
          aria-hidden
        />

        {steps.map((step, index) => (
          <div
            key={step.label}
            className="group relative flex items-stretch overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_40px_-15px_rgba(var(--primary),0.2)]"
          >
            <div className="relative z-10 flex w-20 shrink-0 flex-col items-center justify-center border-r border-border bg-muted/30 transition-colors duration-500 group-hover:bg-primary/10 sm:w-28">
              <span className="absolute top-3 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 transition-colors group-hover:text-primary/70">
                Step
              </span>
              <span className="text-5xl font-black tracking-tighter text-muted-foreground/30 transition-colors duration-500 group-hover:text-primary sm:text-7xl">
                {index + 1}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
