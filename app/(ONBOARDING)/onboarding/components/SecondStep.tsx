"use client";

import {
  Book,
  Counter,
  Message,
  Receipt,
  Recorder,
  Restart,
  Sheet,
  Tick,
} from "@/app/components/svgs/svg";
import type { OnboardingValues } from "@/app/lib/utils/zodOnboardingSchema";
import { Controller, useFormContext } from "react-hook-form";
import { cn, FOCUS_RING } from "../utils";
import FieldError from "./FieldError";
import SeparateMoneyField from "./SeparateMoneyField";

const NO_RECORDS_METHOD = "I don't keep records yet";

const RECORD_METHODS = [
  {
    label: "Notebook or paper",
    description: "Physical ledgers, daybooks or paper receipts",
    icon: Book,
  },
  {
    label: "WhatsApp messages",
    description: "Customer orders, chats and audio clips",
    icon: Message,
  },
  {
    label: "POS or sales app",
    description: "Moniepoint, OPay, Baxi or card machine prints",
    icon: Counter,
  },
  {
    label: "Bank statements",
    description: "PDF downloads or mobile app transaction logs",
    icon: Receipt,
  },
  {
    label: "Excel or Google Sheets",
    description: "Spreadsheets and digital transaction logs",
    icon: Sheet,
  },
  {
    label: "Voice notes",
    description: "Audio reminders of sales and daily debt tabs",
    icon: Recorder,
  },
  {
    label: NO_RECORDS_METHOD,
    description: "Starting fresh from today with automated KASU records",
    icon: Restart,
  },
] as const;

const toggleRecordMethod = (current: string[], method: string) => {
  if (method === NO_RECORDS_METHOD) {
    return current.includes(method) ? [] : [method];
  }

  const withoutNoRecords = current.filter(
    (value) => value !== NO_RECORDS_METHOD,
  );

  return withoutNoRecords.includes(method)
    ? withoutNoRecords.filter((value) => value !== method)
    : [...withoutNoRecords, method];
};

const SecondStep = () => {
  const { control } = useFormContext<OnboardingValues>();

  return (
    <div className="flex flex-col gap-8">
      <Controller
        control={control}
        name="recordMethods"
        render={({ field, fieldState }) => {
          const errorId = "record-methods-error";

          return (
            <fieldset
              tabIndex={-1}
              data-invalid={fieldState.invalid || undefined}
              aria-describedby={fieldState.error ? errorId : undefined}
              className="min-w-0 focus:outline-none"
            >
              <legend className="sr-only">
                How do you keep records today?
              </legend>

              <div className="grid w-full grid-cols-1 gap-x-3.5 gap-y-6 md:grid-cols-2">
                {RECORD_METHODS.map((method) => {
                  const Icon = method.icon;
                  const selected = field.value.includes(method.label);

                  return (
                    <button
                      key={method.label}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        field.onChange(
                          toggleRecordMethod(field.value, method.label),
                        )
                      }
                      className={cn(
                        "flex w-full items-start justify-between rounded-xl border p-4 text-left transition-colors",
                        FOCUS_RING,
                        selected
                          ? "border-blue-200 bg-blue-50"
                          : "border-blue-50 bg-white hover:border-blue-300 hover:bg-blue-50/50",
                      )}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#007AFF26]">
                          <Icon
                            aria-hidden="true"
                            className={cn(
                              "transition-colors",
                              selected ? "text-blue-500" : "text-grey-400",
                            )}
                          />
                        </div>

                        <div className="flex flex-col items-start">
                          <p className="body-small-medium text-black">
                            {method.label}
                          </p>
                          <p className="body-xsmall-regular text-start text-grey-400">
                            {method.description}
                          </p>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                          selected ? "bg-blue-500" : "bg-[#007AFF26]",
                        )}
                      >
                        {selected && <Tick />}
                      </div>
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

      <SeparateMoneyField />
    </div>
  );
};

export default SecondStep;
