'use client';

export type MethodologyStep = {
  number: string;
  title: string;
  description: string;
  /** When true, step uses primary accent (circle + title) */
  highlight?: boolean;
};

type Props = {
  title: string;
  steps: MethodologyStep[];
  className?: string;
};

/**
 * UX Methodology timeline: vertical line + numbered circles (01, 02, …)
 * with title and description. Last or marked step can use primary highlight.
 */
export function MethodologyTimeline({ title, steps, className = '' }: Props) {
  if (!steps?.length) return null;

  return (
    <section className={`max-w-3xl space-y-12 py-8 ${className}`}>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">
          {title}
        </h2>
      </div>

      <div className="relative pl-4 sm:pl-6">
        <div
          className="absolute left-[27px] top-4 bottom-4 w-px bg-zinc-800 sm:left-[35px]"
          aria-hidden
        />
        <div className="space-y-10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex items-start gap-6"
            >
              <div
                className={`absolute -left-4 flex h-7 w-7 items-center justify-center rounded-full border-4 border-zinc-950 text-[10px] font-bold sm:-left-3.5 sm:h-9 sm:w-9 sm:text-xs ${
                  step.highlight
                    ? 'bg-primary/20 text-primary shadow-[0_0_15px_rgba(var(--primary),0.4)]'
                    : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                {step.number}
              </div>
              <div className="ml-8 pt-1 sm:ml-10 sm:pt-1.5">
                <h4
                  className={`text-lg font-semibold ${
                    step.highlight ? 'text-primary' : 'text-zinc-200'
                  }`}
                >
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
