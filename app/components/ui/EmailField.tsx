"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";

import {
  DROPDOWN_LIST_TALL,
  DROPDOWN_PANEL,
  DROPDOWN_ROW_ACTIVE_BG,
  DROPDOWN_ROW_ACTIVE_TEXT,
  DROPDOWN_ROW_IDLE_TEXT,
  DROPDOWN_ROW_TEXT,
  DROPDOWN_SCROLLBAR,
} from "./dropdownStyles";
import TextField, { type TextFieldProps } from "./Textfield";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const DEFAULT_EMAIL_DOMAINS = [
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "hotmail.com",
  "icloud.com",
  "protonmail.com",
] as const;

export interface EmailFieldProps
  extends Omit<
    TextFieldProps,
    | "type"
    | "onChange"
    | "fieldAdornment"
    | "passwordIcon"
    | "passwordVisibleIcon"
    | "passwordHiddenIcon"
  > {
  /** Domains offered after the "@". */
  domains?: readonly string[];
  /** Called with the full input value, including after a suggestion is picked. */
  onChange?: (value: string) => void;
}

const getSuggestions = (email: string, domains: readonly string[]) => {
  const atIndex = email.indexOf("@");
  if (atIndex <= 0) return [];

  const localPart = email.slice(0, atIndex);
  const domainQuery = email.slice(atIndex + 1).toLowerCase();

  return domains
    .filter((domain) => domain.toLowerCase().startsWith(domainQuery))
    .map((domain) => `${localPart}@${domain}`);
};

export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  (
    {
      id: idProp,
      value,
      defaultValue,
      domains = DEFAULT_EMAIL_DOMAINS,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
      isDisabled = false,
      error,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const listboxId = `${id}-listbox`;

    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const reduceMotion = useReducedMotion();

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(() =>
      defaultValue !== undefined ? String(defaultValue) : "",
    );
    const currentValue = isControlled ? String(value) : internalValue;

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);

    const suggestions = getSuggestions(currentValue, domains);
    const canSuggest =
      !isDisabled &&
      suggestions.length > 0 &&
      !suggestions.includes(currentValue);
    const isOpen = open && canSuggest;
    const safeActive =
      isOpen && active >= 0 && active < suggestions.length ? active : -1;

    useEffect(() => {
      if (!canSuggest) {
        setOpen(false);
        setActive(-1);
      }
    }, [canSuggest]);

    useEffect(() => {
      if (!isOpen || safeActive < 0) return;

      listRef.current
        ?.querySelector<HTMLElement>(`[data-index="${safeActive}"]`)
        ?.scrollIntoView({ block: "nearest" });
    }, [isOpen, safeActive]);

    const setValue = (next: string) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const choose = (email: string) => {
      setValue(email);
      setOpen(false);
      setActive(-1);
      inputRef.current?.focus();
    };

    const move = (direction: 1 | -1) => {
      const count = suggestions.length;
      if (!count) return;

      setActive((previous) => {
        if (previous < 0) return direction === 1 ? 0 : count - 1;
        return (previous + direction + count) % count;
      });
    };

    const handleChange = (next: string) => {
      setValue(next);

      const nextSuggestions = getSuggestions(next, domains);
      const shouldOpen =
        !isDisabled &&
        nextSuggestions.length > 0 &&
        !nextSuggestions.includes(next);

      setOpen(shouldOpen);
      setActive(shouldOpen ? 0 : -1);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      if (canSuggest) {
        setOpen(true);
        setActive(0);
      }
      onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setOpen(false);
      setActive(-1);
      onBlur?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (!isDisabled) {
        switch (event.key) {
          case "ArrowDown":
            if (canSuggest) {
              event.preventDefault();
              if (isOpen) move(1);
              else {
                setOpen(true);
                setActive(0);
              }
            }
            break;
          case "ArrowUp":
            if (canSuggest) {
              event.preventDefault();
              if (isOpen) move(-1);
              else {
                setOpen(true);
                setActive(suggestions.length - 1);
              }
            }
            break;
          case "Enter":
            if (isOpen && safeActive >= 0) {
              const email = suggestions[safeActive];
              if (email !== currentValue) {
                event.preventDefault();
                choose(email);
              } else {
                setOpen(false);
              }
            }
            break;
          case "Escape":
            if (isOpen) {
              event.preventDefault();
              setOpen(false);
            }
            break;
          case "Tab":
            if (isOpen) setOpen(false);
            break;
        }
      }

      onKeyDown?.(event);
    };

    return (
      <TextField
        ref={inputRef}
        id={id}
        {...rest}
        type="email"
        value={currentValue}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        isDisabled={isDisabled}
        error={error}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          safeActive >= 0 ? `${id}-option-${safeActive}` : undefined
        }
        fieldAdornment={
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className={DROPDOWN_PANEL}
              >
                <ul
                  ref={listRef}
                  id={listboxId}
                  role="listbox"
                  className={cn(DROPDOWN_LIST_TALL, DROPDOWN_SCROLLBAR)}
                >
                  {suggestions.map((email, index) => {
                    const isActive = index === safeActive;

                    return (
                      <li
                        key={email}
                        id={`${id}-option-${index}`}
                        role="option"
                        data-index={index}
                        aria-selected={isActive}
                        onMouseDown={(event) => event.preventDefault()}
                        onMouseMove={() => setActive(index)}
                        onClick={() => choose(email)}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 px-3.5 py-3",
                          DROPDOWN_ROW_TEXT,
                          isActive
                            ? cn(
                                DROPDOWN_ROW_ACTIVE_BG,
                                DROPDOWN_ROW_ACTIVE_TEXT,
                              )
                            : DROPDOWN_ROW_IDLE_TEXT,
                        )}
                      >
                        {email}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        }
      />
    );
  },
);

EmailField.displayName = "EmailField";

export default EmailField;
