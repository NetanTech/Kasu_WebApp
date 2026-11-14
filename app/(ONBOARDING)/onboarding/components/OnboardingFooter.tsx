import { ArrowRight2 } from "@/app/components/svgs/svg";
import Button from "@/app/components/ui/Button";
import type { OnboardingStep } from "../types";
import { cn, FOCUS_RING } from "../utils";

interface OnboardingFooterProps {
  step: OnboardingStep;
  onBack: () => void;
  onSkip: () => void;
}

const OnboardingFooter = ({
  step,
  onBack,
  onSkip,
}: OnboardingFooterProps) => {
  const isLastStep = step === 3;

  return (
    <footer className="shrink-0 border-t border-grey-50 bg-white px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8 lg:px-21.25">
      <div className="mx-auto grid w-full max-w-4xl grid-cols-2 items-center gap-2 sm:flex sm:justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={onBack}
            className={cn(
              "body-small-medium min-h-11 rounded-sm px-3 py-2 text-grey-300 transition-colors hover:text-black md:px-4",
              FOCUS_RING,
            )}
          >
            Back
          </button>
        )}

        {isLastStep && (
          <button
            type="button"
            onClick={onSkip}
            className={cn(
              "body-small-medium order-first col-span-2 min-h-11 w-full rounded-sm px-3 py-2 text-center text-blue-500 transition-colors hover:underline hover:underline-offset-4 sm:order-none sm:col-span-1 sm:w-auto",
              FOCUS_RING,
            )}
          >
            Skip for now, show me an example business
          </button>
        )}

        <Button
          type="submit"
          size="sm"
          variant="primary"
          trailingIcon={<ArrowRight2 aria-hidden="true" className="text-white" />}
          className={cn(
            "min-h-11",
            step === 1
              ? "col-span-2 w-full sm:col-span-1 sm:ml-auto sm:w-auto"
              : "w-full sm:w-auto",
          )}
        >
          {isLastStep ? "Finish" : "Continue"}
        </Button>
      </div>
    </footer>
  );
};

export default OnboardingFooter;
