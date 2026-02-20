import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { deliveryStepperSteps } from '@/content/home';

export function DeliveryStepper() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {deliveryStepperSteps.map((step, i) => (
        <span key={step.label} className="flex items-center gap-2">
          <Badge variant="secondary" className="font-normal">
            {step.label}: {step.value}
          </Badge>
          {i < deliveryStepperSteps.length - 1 && (
            <Separator orientation="horizontal" className="w-4 flex-1 min-w-0 sm:w-6" />
          )}
        </span>
      ))}
    </div>
  );
}
