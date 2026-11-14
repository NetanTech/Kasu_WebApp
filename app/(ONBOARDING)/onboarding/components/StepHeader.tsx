import type { RefObject } from "react";
import type { OnboardingStep } from "../types";

const STEPS = [
  {
    title: "About your business",
    headline: "Tell us about your business",
    description:
      "This helps KASU understand your records and organize your daily sales properly.",
  },
  {
    title: "Your records & cash flow",
    headline: "How do you keep records today?",
    description:
      "Pick everything that applies. KASU works with all of them seamlessly.",
  },
  {
    title: "Your first record",
    headline: "How would you like to add your first records?",
    description: "Start with whatever is easiest. You can add more anytime.",
  },
] as const;

interface StepHeaderProps {
  step: OnboardingStep;
  headingRef: RefObject<HTMLHeadingElement | null>;
}

const StepHeader = ({ step, headingRef }: StepHeaderProps) => {
  const currentStep = STEPS[step - 1];

  return (
    <header className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] leading-3.25 font-semibold tracking-[0.06px] text-blue-500 uppercase">
            Step {step} of 3
          </p>
          <p className="text-[12px] leading-4 text-grey-900">
            {currentStep.title}
          </p>
        </div>

        <div
          role="progressbar"
          aria-label="Onboarding progress"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step}
          className="relative h-1.5 w-full overflow-hidden rounded-full bg-blue-100"
        >
          <div
            className="h-full rounded-full transition-all bg-blue-500"
            style={{ width: `${(step / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="heading-5 text-black outline-none"
        >
          {currentStep.headline}
        </h1>
        <p className="body-small-regular text-grey-300">
          {currentStep.description}
        </p>
      </div>
    </header>
  );
};

export default StepHeader;
