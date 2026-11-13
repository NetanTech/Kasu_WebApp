"use client";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentType,
  type InputHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type SVGProps,
} from "react";

import { AlertDiamond } from "../svgs/svg";

export interface TextFieldLabelLink {
  text: string;
  href?: string;
  onClick?: () => void;
}

type PasswordIconProps = SVGProps<SVGSVGElement> & {
  slashed?: boolean;
};

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "prefix"
> {
  /** Linked to the input through `id`, so clicking it focuses the field. */
  label?: string;
  labelLink?: TextFieldLabelLink;
  labelLinkClassname?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Text shown inside the field after the input, e.g. "cm". */
  suffix?: string;
  /** `string` shows the message below the field; `true` only styles the field. */
  error?: string | boolean;
  /** Increment to replay the shake for repeated errors with the same message. */
  shakeKey?: number;
  isDisabled?: boolean;
  /** SVG component that receives whether the password is currently hidden. */
  passwordIcon?: ComponentType<PasswordIconProps>;
  /** Icon shown while the password is visible (type="password" only). */
  passwordVisibleIcon?: ReactNode;
  /** Icon shown while the password is hidden (type="password" only). */
  passwordHiddenIcon?: ReactNode;
  containerClassName?: string;
  /** Rendered inside the field's relative wrapper, e.g. a dropdown anchored below the input. */
  fieldAdornment?: ReactNode;
}

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const TEXT = "text-base leading-6 tracking-[-0.02em]";

const COLOR_TRANSITION =
  "transition-colors duration-150 motion-reduce:transition-none";

const LABEL_TEXT =
  "text-sm leading-5 md:text-base md:leading-6 font-medium tracking-[-0.02em]";

const LINK_TEXT =
  "shrink-0 text-sm leading-5 font-semibold tracking-[-0.02em] text-blue-500";

const ERROR_TEXT =
  "text-xs leading-4 md:text-sm md:leading-5 tracking-[-0.02em] text-error-500";

const ICON_BOX =
  "inline-flex size-5 md:size-6 shrink-0 items-center justify-center [&>svg]:size-full";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id: idProp,
      name,
      type = "text",
      label,
      labelLink,
      labelLinkClassname,
      leadingIcon,
      trailingIcon,
      suffix,
      error,
      shakeKey,
      isDisabled = false,
      disabled,
      passwordIcon: PasswordIcon,
      passwordVisibleIcon,
      passwordHiddenIcon,
      containerClassName,
      className,
      fieldAdornment,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const errorId = `${id}-error`;

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const [showPassword, setShowPassword] = useState(false);
    const controls = useAnimationControls();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
      if (!error || reduceMotion) return;
      controls.start({
        x: [0, -6, 6, -4, 4, 0],
        transition: { duration: 0.4, ease: "easeInOut" },
      });
    }, [error, shakeKey, reduceMotion, controls]);

    const isPassword = type === "password";
    const hasToggle =
      isPassword &&
      Boolean(PasswordIcon || passwordVisibleIcon || passwordHiddenIcon);

    const inputType = isPassword && showPassword ? "text" : type;

    const isFieldDisabled = isDisabled || disabled;
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;

    const describedBy =
      [errorMessage && errorId, rest["aria-describedby"]]
        .filter(Boolean)
        .join(" ") || undefined;

    const focusInput = (e: MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("button")) return;
      inputRef.current?.focus();
    };

    const labelColor = hasError
      ? "text-error-500"
      : "text-grey-500 group-focus-within:text-blue-500";

    const iconColor = cn(
      COLOR_TRANSITION,
      isFieldDisabled
        ? "text-grey-100"
        : hasError
          ? "text-error-500"
          : "text-grey-300 group-focus-within:text-blue-500",
    );

    const fieldStateClasses = isFieldDisabled
      ? "bg-grey-50 border-grey-50 cursor-not-allowed"
      : hasError
        ? "bg-error-50 border-error-50 cursor-text"
        : cn(
            "bg-white cursor-text focus-within:border-blue-500","border-grey-50 hover:border-blue-300",
          );

    return (
      <div
        className={cn(
          "group flex w-full flex-col gap-1 font-dm-sans",
          containerClassName,
        )}
      >
        {(label || labelLink) && (
          <div className="flex items-start gap-2">
            {label ? (
              <label
                htmlFor={id}
                className={cn(
                  "flex-1 cursor-pointer",
                  LABEL_TEXT,
                  COLOR_TRANSITION,
                  labelColor,
                )}
              >
                {label}
              </label>
            ) : (
              <span className="flex-1" />
            )}
            {labelLink &&
              (labelLink.href ? (
                labelLink.href.startsWith("/") ? (
                  <Link
                    href={labelLink.href}
                    onClick={labelLink.onClick}
                    className={
                      !labelLinkClassname ? LINK_TEXT : labelLinkClassname
                    }
                  >
                    {labelLink.text}
                  </Link>
                ) : (
                  <a
                    href={labelLink.href}
                    onClick={labelLink.onClick}
                    className={
                      !labelLinkClassname ? LINK_TEXT : labelLinkClassname
                    }
                  >
                    {labelLink.text}
                  </a>
                )
              ) : (
                <button
                  type="button"
                  onClick={labelLink.onClick}
                  className={cn(LINK_TEXT, "cursor-pointer")}
                >
                  {labelLink.text}
                </button>
              ))}
          </div>
        )}

        <div className="relative">
          <motion.div
            animate={controls}
            onClick={focusInput}
            className={cn(
              "flex w-full items-center gap-1 rounded-lg border px-3 py-2",
              COLOR_TRANSITION,
              fieldStateClasses,
            )}
          >
            {leadingIcon && (
              <span aria-hidden="true" className={cn(ICON_BOX, iconColor)}>
                {leadingIcon}
              </span>
            )}

            <input
              ref={inputRef}
              id={id}
              name={name ?? idProp}
              type={inputType}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              disabled={isFieldDisabled}
              aria-invalid={hasError || undefined}
              aria-describedby={describedBy}
              className={cn(
                "h-6 min-w-0 flex-1 bg-transparent text-grey-500 outline-none",
                "placeholder:text-grey-200 disabled:placeholder:text-grey-100 disabled:cursor-not-allowed",
                TEXT,
                className,
              )}
              {...rest}
            />

            {suffix && (
              <span
                className={cn(
                  "shrink-0",
                  TEXT,
                  isFieldDisabled ? "text-grey-100" : "text-grey-300",
                )}
              >
                {suffix}
              </span>
            )}

            {hasToggle ? (
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                disabled={isFieldDisabled}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className={cn(
                  ICON_BOX,
                  iconColor,
                  !isFieldDisabled && "cursor-pointer",
                )}
              >
                {PasswordIcon ? (
                  <PasswordIcon
                    className={iconColor}
                    slashed={!showPassword}
                  />
                ) : showPassword ? (
                  (passwordVisibleIcon ?? passwordHiddenIcon)
                ) : (
                  (passwordHiddenIcon ?? passwordVisibleIcon)
                )}
              </button>
            ) : (
              trailingIcon && (
                <span aria-hidden="true" className={cn(ICON_BOX, iconColor)}>
                  {trailingIcon}
                </span>
              )
            )}
          </motion.div>

          {fieldAdornment}
        </div>

        <AnimatePresence initial={false}>
          {errorMessage && (
            <motion.p
              id={errorId}
              role="alert"
              initial={reduceMotion ? false : { opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={
                reduceMotion ? undefined : { opacity: 0, height: 0, y: -4 }
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                ERROR_TEXT,
                "flex items-center gap-1 overflow-hidden",
              )}
            >
              <AlertDiamond
                aria-hidden="true"
                className="size-3 shrink-0 md:size-3.5"
              />
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
