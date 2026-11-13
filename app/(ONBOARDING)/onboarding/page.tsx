"use client";
import { ArrowRight2, Lock } from "@/app/components/svgs/svg";
import Button from "@/app/components/ui/Button";
import TextField from "@/app/components/ui/Textfield";
import React, { useState } from "react";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";

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

const businessList: string[] = [
  "Shop or retail",
  "Food and restaurant",
  "Fashion & tailoring",
  "Beauty & barbing",
  "Services",
  "Wholesale or distribution",
  "Other",
];

const numberofWorkers: string[] = ["1 to 5", "6 to 20", "21 to 50", "50+"];

export const Tick = () => {
  return (
    <svg
      width="11"
      height="9"
      viewBox="0 0 11 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.8 8.01667L0 4.21667L0.95 3.26667L3.8 6.11667L9.91667 0L10.8667 0.95L3.8 8.01667V8.01667"
        fill="white"
      />
    </svg>
  );
};

const Page = () => {
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState<string>(numberofWorkers[0]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Step One */}
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

        { step === 1 && <FirstStep /> }
        { step === 2 && <SecondStep /> }
      </div>

      <div className="flex items-center w-full justify-between  gap-2">
        <button
          className="text-grey-300 px-3 rounded-sm py-2 md:px-4 body-small-medium"
          onClick={() =>
            setStep((p) => {
              if (p === 3) return 2;
              if (p === 2) return 1;
              return 1;
            })
          }
        >
          Back
        </button>

        <Button
          variant="primary"
          size="sm"
          trailingIcon={<ArrowRight2 className="text-white" />}
          onClick={() => setStep((p) => {
            if (p === 1) return 2;
            if (p === 2) return 3;
            return 3
          })}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Page;
