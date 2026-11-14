"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  FormProvider,
  useForm,
  type FieldPath,
} from "react-hook-form";
import { authExit } from "@/app/components/animations/auth";
import {
  onboardingSchema,
  type OnboardingValues,
} from "@/app/lib/utils/zodOnboardingSchema";
import FirstStep from "./components/FirstStep";
import OnboardingFooter from "./components/OnboardingFooter";
import SecondStep from "./components/SecondStep";
import StepHeader from "./components/StepHeader";
import SuccessStep from "./components/SuccessStep";
import ThirdStep from "./components/ThirdStep";
import type { OnboardingStep } from "./types";

const DEFAULT_VALUES: OnboardingValues = {
  businessName: "",
  businessTypes: [],
  location: "",
  teamSize: "1 to 5",
  recordMethods: [],
  separateMoney: "sometimes",
  preference: "",
};

const STEP_FIELDS: Record<
  OnboardingStep,
  FieldPath<OnboardingValues>[]
> = {
  1: ["businessName", "businessTypes", "location", "teamSize"],
  2: ["recordMethods", "separateMoney"],
  3: ["preference"],
};

const STEP_X = 16;

const Page = () => {
  const [step, setStep] = useState<OnboardingStep>(1);
  const [direction, setDirection] = useState<-1 | 0 | 1>(0);
  const [finished, setFinished] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef<OnboardingStep>(step);

  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    mode: "onTouched",
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (previousStep.current === step) return;

    previousStep.current = step;
    scrollRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const goToStep = (next: OnboardingStep) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = await form.trigger(STEP_FIELDS[step]);

    if (!isValid) {
      setAttempt((count) => count + 1);

      window.setTimeout(() => {
        const firstInvalidField = scrollRef.current?.querySelector<HTMLElement>(
          '[aria-invalid="true"], [data-invalid="true"]',
        );

        if (!firstInvalidField) return;

        firstInvalidField.focus();

        const describedBy =
          firstInvalidField.getAttribute("aria-describedby") ?? "";
        const errorMessage = describedBy
          .split(/\s+/)
          .map((id) => document.getElementById(id))
          .find((element) => element?.getAttribute("role") === "alert");

        (errorMessage ?? firstInvalidField).scrollIntoView({
          block: "center",
        });
      }, 0);
      return;
    }

    if (step === 3) {
      setFinished(true);
      return;
    }

    goToStep((step + 1) as OnboardingStep);
  };

  const handleBack = () => {
    if (step > 1) {
      goToStep((step - 1) as OnboardingStep);
    }
  };

  const businessName = form.getValues("businessName").trim();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {finished ? (
        <motion.div key="success" className="h-full w-full">
          <SuccessStep businessName={businessName} />
        </motion.div>
      ) : (
        <motion.div
          key="onboarding"
          className="h-full w-full"
          exit={authExit}
        >
          <FormProvider {...form}>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex h-full flex-col"
            >
              <div
                ref={scrollRef}
                className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-10 md:px-8 lg:px-21.25 lg:py-24.5"
              >
                <div className="mx-auto flex w-full max-w-267.5 flex-col gap-8">
                  <StepHeader step={step} headingRef={headingRef} />

                  <motion.div
                    key={step}
                    initial={
                      direction === 0
                        ? { opacity: 0, y: 8 }
                        : { opacity: 0, x: direction * STEP_X }
                    }
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                      duration: 0.24,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col gap-8"
                  >
                    {step === 1 && <FirstStep shakeKey={attempt} />}
                    {step === 2 && <SecondStep />}
                    {step === 3 && <ThirdStep />}
                  </motion.div>
                </div>
              </div>

              <OnboardingFooter
                step={step}
                onBack={handleBack}
                onSkip={() => setFinished(true)}
              />
            </form>
          </FormProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Page;
