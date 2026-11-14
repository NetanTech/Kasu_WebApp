"use client";

import { Lock, Tick } from "@/app/components/svgs/svg";
import TextField from "@/app/components/ui/Textfield";
import type { OnboardingValues } from "@/app/lib/utils/zodOnboardingSchema";
import { Controller, useFormContext } from "react-hook-form";
import { cn, FOCUS_RING, toggleValue } from "../utils";
import { motion } from "motion/react";
import FieldError from "./FieldError";

const BUSINESS_TYPES = [
  "Shop or retail",
  "Food and restaurant",
  "Fashion & tailoring",
  "Beauty & barbing",
  "Services",
  "Wholesale or distribution",
  "Other",
] as const;

const TEAM_SIZES = ["1 to 5", "6 to 20", "21 to 50", "50+"] as const;

interface FirstStepProps {
  shakeKey: number;
}

const FirstStep = ({ shakeKey }: FirstStepProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<OnboardingValues>();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <p id="business-name-label" className="body-small-medium text-black">
            What is your business name?
          </p>
          <TextField
            type="text"
            placeholder="e.g. Adaeze Provisions & Grains"
            autoComplete="organization"
            {...register("businessName")}
            aria-labelledby="business-name-label"
            aria-describedby="business-name-help"
            error={errors.businessName?.message}
            shakeKey={shakeKey}
          />
        </div>
        <p
          id="business-name-help"
          className="text-[13px] leading-4.5 text-grey-300"
        >
          Or your trading name if not formally registered.
        </p>
      </div>

      <Controller
        control={control}
        name="businessTypes"
        render={({ field, fieldState }) => {
          const errorId = "business-types-error";
          const helpId = "business-types-help";

          return (
            <fieldset
              tabIndex={-1}
              data-invalid={fieldState.invalid || undefined}
              aria-describedby={
                cn(helpId, fieldState.error && errorId) || undefined
              }
              className="min-w-0 focus:outline-none"
            >
              <legend className="body-small-medium text-black">
                What type of business do you run?
              </legend>
              <p
                id={helpId}
                className="mt-1 text-[13px] leading-4.5 text-grey-300"
              >
                Select all that apply.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {BUSINESS_TYPES.map((businessType) => {
                  const selected = field.value.includes(businessType);

                  return (
                    <motion.button
                      key={businessType}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        field.onChange(toggleValue(field.value, businessType))
                      }
                      layout
                      className={cn(
                        "body-xsmall-regular relative isolate flex min-h-10 items-center justify-center gap-2 overflow-hidden rounded-full px-3.5 py-2 transition-colors",
                        FOCUS_RING,
                        selected
                          ? "text-white"
                          : "bg-blue-50 text-black",
                      )}
                    >
                      <motion.div
                        initial={false}
                        animate={{
                          width: selected ? "100%" : "30px",
                          height: selected ? "100%" : "30px",
                          opacity: selected ? 1 : 0,
                          translateY: selected ? "0%" : "30%",
                        }}
                        transition={{
                          duration: 0.36,
                          ease: [0.36, 1, 0.36, 1],
                        }}
                        className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500"
                      />
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          aria-hidden="true"
                          className="flex w-2.75 justify-center"
                        >
                          <Tick />
                        </motion.span>
                      )}

                      {businessType}
                    </motion.button>
                  );
                })}
              </div>

              {fieldState.error && (
                <div className="mt-2">
                  <FieldError id={errorId}>
                    {fieldState.error.message}
                  </FieldError>
                </div>
              )}
            </fieldset>
          );
        }}
      />

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <p
            id="business-location-label"
            className="body-small-medium text-black"
          >
            Where is your business located?
          </p>
          <TextField
            type="text"
            placeholder="e.g. Lagos (Idumota, Lagos Island)"
            autoComplete="address-level2"
            {...register("location")}
            aria-labelledby="business-location-label"
            aria-describedby="business-location-help"
            error={errors.location?.message}
            shakeKey={shakeKey}
          />
        </div>
        <p
          id="business-location-help"
          className="text-[13px] leading-4.5 text-grey-300"
        >
          Mention town, market, or local government area.
        </p>
      </div>

      <Controller
        control={control}
        name="teamSize"
        render={({ field, fieldState }) => {
          const errorId = "team-size-error";

          return (
            <fieldset
              tabIndex={-1}
              data-invalid={fieldState.invalid || undefined}
              aria-describedby={fieldState.error ? errorId : undefined}
              className="min-w-0 focus:outline-none"
            >
              <legend className="body-small-medium text-black">
                How many people work with you?
              </legend>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TEAM_SIZES.map((teamSize) => {
                  const selected = field.value === teamSize;

                  return (
                    <button
                      key={teamSize}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => field.onChange(teamSize)}
                      className={cn(
                        "group/team-size body-small-semibold flex min-h-16 w-full flex-col items-center justify-center rounded-lg px-3 py-3 transition-colors",
                        FOCUS_RING,
                        selected
                          ? "bg-blue-500 text-white shadow-[0px_0px_2px_0px_rgba(0,0,0,0.2)]"
                          : "bg-blue-50 text-black hover:bg-blue-300 hover:text-white",
                      )}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span
                          aria-hidden="true"
                          className="flex w-[11px] justify-center"
                        >
                          {selected && <Tick />}
                        </span>
                        {teamSize}
                      </span>
                      <span
                        className={cn(
                          "text-[12px] leading-4 font-medium tracking-[0.4px]",
                          selected
                            ? "text-white"
                            : "text-grey-300 group-hover/team-size:text-white",
                        )}
                      >
                        people
                      </span>
                    </button>
                  );
                })}
              </div>

              {fieldState.error && (
                <div className="mt-2">
                  <FieldError id={errorId}>
                    {fieldState.error.message}
                  </FieldError>
                </div>
              )}
            </fieldset>
          );
        }}
      />

      <div className="w-full rounded-lg bg-blue-50 px-4.25 py-3">
        <div className="flex items-center gap-2.5 md:max-w-[40%]">
          <Lock aria-hidden="true" className="shrink-0 text-grey-400" />
          <p className="body-xsmall-regular text-grey-300">
            Your details are private and safely encrypted. KASU only uses this
            to customize receipt headers and sales reports for your shop.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
