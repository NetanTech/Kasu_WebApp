"use client";

import { useIsomorphicLayoutEffect } from "@/app/lib/hooks/useIsomorphicLayoutEffect";
import type { OnboardingValues } from "@/app/lib/utils/zodOnboardingSchema";
import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn, FOCUS_RING } from "../utils";
import FieldError from "./FieldError";
import SelectionTick from "./SelectionTick";

const SEPARATE_MONEY_OPTIONS = [
  { label: "Yes", value: "yes" },
  { label: "Sometimes", value: "sometimes" },
  { label: "No", value: "no" },
] as const;

interface SeparateMoneyControlProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const SeparateMoneyControl = ({
  value,
  onChange,
  error,
}: SeparateMoneyControlProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const activeIndex = SEPARATE_MONEY_OPTIONS.findIndex(
    (option) => option.value === value,
  );

  useIsomorphicLayoutEffect(() => {
    const updateIndicator = () => {
      const activeButton = buttonRefs.current[activeIndex];
      const container = filterRef.current;

      if (!activeButton || !container) {
        setIndicatorStyle({ left: 0, width: 0 });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    };

    updateIndicator();

    const container = filterRef.current;
    if (!container) return;

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(container);
    window.addEventListener("resize", updateIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeIndex]);

  const errorId = "separate-money-error";
  const helpId = "separate-money-help";

  return (
    <div className="flex flex-col gap-3">
      <div
        tabIndex={-1}
        role="group"
        aria-labelledby="separate-money-label"
        data-invalid={Boolean(error) || undefined}
        aria-describedby={cn(helpId, error && errorId) || undefined}
        className="flex flex-col items-start gap-4 rounded-xl bg-blue-50 p-4 focus:outline-none md:flex-row md:items-center md:justify-between md:p-6"
      >
        <div className="flex flex-col items-start gap-1.5">
          <p
            id="separate-money-label"
            className="body-small-medium text-black"
          >
            Do you separate business money from personal money?
          </p>
          <p
            id={helpId}
            className="body-xsmall-regular text-grey-400 md:max-w-md"
          >
            KASU can automatically tag how much business revenue flows into
            daily personal expenses.
          </p>
        </div>

        <div
          ref={filterRef}
          role="group"
          aria-label="Separate business and personal money"
          className="relative flex w-full items-center gap-2 rounded-xl bg-white p-1.5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:w-auto"
        >
          <span
            aria-hidden="true"
            className="absolute top-1.5 bottom-1.5 z-0 rounded-lg bg-blue-500 transition-[left,width] duration-150 ease-in-out motion-reduce:transition-none"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.width ? 1 : 0,
            }}
          />

          {SEPARATE_MONEY_OPTIONS.map((option, index) => {
            const selected = index === activeIndex;

            return (
              <button
                key={option.value}
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(option.value)}
                className={cn(
                  "relative z-10 flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2 md:flex-none md:px-4",
                  FOCUS_RING,
                  selected
                    ? "body-xsmall-medium text-white"
                    : "body-xsmall-regular text-grey-400 hover:text-black",
                )}
              >
                <span
                  aria-hidden="true"
                  className="hidden w-[11px] justify-center sm:flex"
                >
                  {selected && <SelectionTick />}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <FieldError id={errorId} show={Boolean(error)}>
        {error}
      </FieldError>
    </div>
  );
};

const SeparateMoneyField = () => {
  const { control } = useFormContext<OnboardingValues>();

  return (
    <Controller
      control={control}
      name="separateMoney"
      render={({ field, fieldState }) => (
        <SeparateMoneyControl
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default SeparateMoneyField;
