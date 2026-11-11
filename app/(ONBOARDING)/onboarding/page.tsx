"use client";
import React, { useState } from "react";

const steps = [
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
    headline: "Complete your profile",
    description: "Start with whatever is easiest. You can add more anytime.",
  },
];

const Page = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                {/* Header area */}
                <div className="flex flex-col gap-6">
                  {/* Step indicator */}
                  <div className="flex flex-col gap-2">
                    {/* Title + main title */}
                    <div className="flex items-center justify-between">
                      <p className="uppercase text-blue-500 text-[11px] leading-3.25 tracking-[0.06px] font-semibold ">
                        Step {step} of 3
                      </p>

                      <p className="text-[12px] leading-4 text-grey-900">
                        {steps[step - 1].title}
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-blue-100">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-in-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h5 className="font-medium text-black">
                      {steps[step - 1].headline}
                    </h5>
                    <p className="body-small-regular text-grey-300">
                      {steps[step - 1].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
