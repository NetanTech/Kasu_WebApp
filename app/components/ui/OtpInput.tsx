"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

type OTPStatus = "idle" | "error" | "success";

interface OTPInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;

  status?: OTPStatus;
  errorMessage?: string;
  disabled?: boolean;

  className?: string;
  inputClassName?: string;
  slotClassName?: string;

  name?: string;
  id?: string;
  ariaLabel?: string;
  required?: boolean;
  autoFocus?: boolean;
}

export function OTPInput({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  status = "idle",
  errorMessage,
  disabled = false,
  className = "",
  inputClassName = "",
  slotClassName = "",
  name,
  id,
  ariaLabel = "Verification code",
  required = false,
  autoFocus = false,
}: OTPInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;

  const inputRef = useRef<HTMLInputElement>(null);
  const lastCompletedValue = useRef<string | null>(null);

  const [internalValue, setInternalValue] = useState(() =>
    defaultValue.replace(/\D/g, "").slice(0, length),
  );

  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const isControlled = value !== undefined;

  const otpValue = (isControlled ? value : internalValue)
    .replace(/\D/g, "")
    .slice(0, length);

  const commitValue = useCallback(
    (nextValue: string) => {
      const sanitized = nextValue.replace(/\D/g, "").slice(0, length);

      if (!isControlled) {
        setInternalValue(sanitized);
      }

      onChange?.(sanitized);

      if (sanitized.length === length) {
        if (lastCompletedValue.current !== sanitized) {
          lastCompletedValue.current = sanitized;
          onComplete?.(sanitized);
        }
      } else {
        lastCompletedValue.current = null;
      }
    },
    [length, isControlled, onChange, onComplete],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const rawValue = input.value;
    const cursor = input.selectionStart ?? rawValue.length;

    const sanitized = rawValue.replace(/\D/g, "").slice(0, length);
    const nextCursor = rawValue.slice(0, cursor).replace(/\D/g, "").length;

    commitValue(sanitized);
    setActiveIndex(Math.min(nextCursor, length - 1));

    requestAnimationFrame(() => {
      inputRef.current?.setSelectionRange(
        Math.min(nextCursor, sanitized.length),
        Math.min(nextCursor, sanitized.length),
      );
    });
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pastedValue) return;

    commitValue(pastedValue);
    setActiveIndex(Math.min(pastedValue.length, length - 1));

    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(
        pastedValue.length,
        pastedValue.length,
      );
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const cursor = input.selectionStart ?? 0;

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      const next = Math.max(0, cursor - 1);

      input.setSelectionRange(next, next);
      setActiveIndex(Math.min(next, length - 1));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      const next = Math.min(length, cursor + 1);

      input.setSelectionRange(next, next);
      setActiveIndex(Math.min(next, length - 1));
    }

    if (event.key === "Home") {
      event.preventDefault();
      input.setSelectionRange(0, 0);
      setActiveIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      input.setSelectionRange(otpValue.length, otpValue.length);
      setActiveIndex(Math.min(otpValue.length, length - 1));
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - rect.left) / rect.width;

    const index = Math.min(
      length - 1,
      Math.max(0, Math.floor(position * length)),
    );

    setActiveIndex(index);

    // Keep the actual text cursor within the existing value.
    const cursor = Math.min(index, otpValue.length);

    event.currentTarget.setSelectionRange(cursor, cursor);
  };

  const handleFocus = () => {
    setIsFocused(true);

    const cursor = inputRef.current?.selectionStart ?? otpValue.length;

    setActiveIndex(Math.min(cursor, length - 1));
  };

  const handleBlur = () => {
    setIsFocused(false);
    setActiveIndex(-1);
  };

  const getSlotClasses = (index: number) => {
    const isActive = isFocused && activeIndex === index;

    const base =
      "relative flex aspect-square min-w-0 flex-1 max-w-[50px] sm:max-w-[60px] items-center justify-center rounded-xl border text-base font-normal transition-all duration-200 ease-out";

    if (disabled) {
      return `${base} border-grey-100 bg-grey-50 text-grey-200`;
    }

    if (status === "error") {
      return `${base} border-error-500 bg-error-50 text-error-500 ${
        isActive ? "ring-2 ring-error-500/10" : ""
      }`;
    }

    if (status === "success") {
      return `${base} border-green-500 bg-green-50 text-green-500 ${
        isActive ? "ring-2 ring-green-500/10" : ""
      }`;
    }

    if (isActive) {
      return `${base} border-blue-500 bg-blue-50 text-blue-500 ring-2 ring-blue-500/10`;
    }

    return `${base} border-blue-50 bg-blue-50 text-blue-500 hover:border-blue-200`;
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative flex w-full items-center justify-center gap-2 sm:gap-4"
        style={
          {
            "--otp-length": length,
          } as CSSProperties
        }
      >
        {/* Single real input controlling all visual slots */}
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          maxLength={length}
          value={otpValue}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          aria-label={ariaLabel}
          aria-invalid={status === "error"}
          aria-describedby={errorMessage ? messageId : undefined}
          className={`pointer-events-none absolute inset-0 z-10 h-full w-full cursor-text opacity-0 ${inputClassName}`}
          onChange={handleChange}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Visual OTP slots */}
        {Array.from({ length }, (_, index) => (
          <div
            key={index}
            aria-hidden="true"
            className={`${getSlotClasses(index)} ${slotClassName}`}
            onClick={() => {
              if (disabled) return;

              const input = inputRef.current;
              if (!input) return;

              input.focus();

              const cursor = Math.min(index, otpValue.length);
              input.setSelectionRange(cursor, cursor);

              setActiveIndex(index);
            }}
          >
            <span className="select-none">{otpValue[index] ?? ""}</span>
          </div>
        ))}
      </div>

      {status === "error" && errorMessage && (
        <p id={messageId} className="mt-2 text-sm text-error-500" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
