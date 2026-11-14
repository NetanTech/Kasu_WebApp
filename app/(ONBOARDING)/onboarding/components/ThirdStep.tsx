"use client";

import {
  Camera,
  Message,
  Recorder,
  Sheet,
} from "@/app/components/svgs/svg";
import type { OnboardingValues } from "@/app/lib/utils/zodOnboardingSchema";
import { motion } from "motion/react";
import { Controller, useFormContext } from "react-hook-form";
import { cn, FOCUS_RING } from "../utils";
import FieldError from "./FieldError";
import SelectionTick from "./SelectionTick";

const PREFERENCES = [
  {
    label: "Take a photo of your notebook",
    description:
      "Snap daily sales ledgers, customer debt lists, or supplier waybills from your phone or webcam.",
    icon: Camera,
    perk: "Most popular for shop owners",
  },
  {
    label: "Upload an Excel or CSV file",
    description:
      "Drag and drop sales sheets, inventory lists, or bank account downloads.",
    icon: Sheet,
    perk: "Instant column matching",
  },
  {
    label: "Record a voice note",
    description:
      "Speak in plain English or Nigerian Pidgin. Mention what you sold, who paid, or stock bought.",
    icon: Recorder,
    perk: "Takes under 30 seconds",
  },
  {
    label: "Type or paste a message",
    description:
      "Paste WhatsApp orders, customer chats, or type in quick daily totals directly.",
    icon: Message,
    perk: "Freeform text",
  },
] as const;

const ThirdStep = () => {
  const { control } = useFormContext<OnboardingValues>();

  return (
    <div className="flex flex-col gap-8">
      <Controller
        control={control}
        name="preference"
        render={({ field, fieldState }) => {
          const errorId = "preference-error";

          return (
            <fieldset
              tabIndex={-1}
              data-invalid={fieldState.invalid || undefined}
              aria-describedby={fieldState.error ? errorId : undefined}
              className="min-w-0 focus:outline-none"
            >
              <legend className="sr-only">
                How would you like to add your first records?
              </legend>

              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                {PREFERENCES.map((method) => {
                  const Icon = method.icon;
                  const selected = field.value === method.label;

                  return (
                    <button
                      key={method.label}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => field.onChange(method.label)}
                      className={cn(
                        "flex flex-col items-start justify-between gap-2.5 rounded-xl border-2 bg-blue-50 p-6 text-left transition-colors lg:min-h-52",
                        FOCUS_RING,
                        selected
                          ? "border-blue-500"
                          : "border-transparent hover:border-blue-300",
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                            selected ? "bg-blue-500" : "bg-[#007AFF26]",
                          )}
                        >
                          <Icon
                            aria-hidden="true"
                            className={cn(
                              "transition-colors",
                              selected ? "text-white" : "text-blue-500",
                            )}
                          />
                        </div>

                        {selected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 2 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="flex items-center gap-1 rounded-full bg-blue-500 px-4 py-0.5 text-[12px] leading-4 tracking-[0.4px] text-white"
                          >
                            <SelectionTick />
                            Selected
                          </motion.div>
                        )}
                      </div>

                      <div className="flex flex-col items-start gap-2">
                        <p className="body-medium-medium">{method.label}</p>
                        <p className="body-small-regular max-w-[85%] text-start text-grey-300">
                          {method.description}
                        </p>
                      </div>

                      <p className="text-[12px] leading-4 font-medium tracking-[0.4px] text-blue-500">
                        {method.perk}
                      </p>
                    </button>
                  );
                })}
              </div>

              <FieldError
                id={errorId}
                show={Boolean(fieldState.error)}
                className="mt-2"
              >
                {fieldState.error?.message}
              </FieldError>
            </fieldset>
          );
        }}
      />

      <div className="w-full rounded-lg bg-blue-50 px-4.25 py-3">
        <div className="flex flex-col items-start gap-1.5">
          <p className="body-small-medium text-black">
            KASU will show you what it found and ask you to confirm before
            anything is saved.
          </p>
          <p className="body-xsmall-regular text-grey-400">
            Nothing enters your business ledger automatically. You stay in
            complete control of every figure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThirdStep;
