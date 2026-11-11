"use client";
import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type InputHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

export interface TextFieldLabelLink {
  text: string;
  href?: string;
  onClick?: () => void;
}

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
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
  isDisabled?: boolean;
  /** Icon shown while the password is visible (type="password" only). */
  passwordVisibleIcon?: ReactNode;
  /** Icon shown while the password is hidden (type="password" only). */
  passwordHiddenIcon?: ReactNode;
  containerClassName?: string;
}

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const TEXT = "text-base leading-6 tracking-[-0.02em]";

const LABEL_TEXT =
  "text-sm leading-5 md:text-base md:leading-6 font-medium tracking-[-0.02em] text-grey-500";

const LINK_TEXT =
  "shrink-0 text-sm leading-5 font-semibold tracking-[-0.02em] text-blue-500";

const ERROR_TEXT = "text-xs leading-4 md:text-sm md:leading-5 tracking-[-0.02em] text-error-500";

const ICON_BOX = "inline-flex size-5 md:size-6 shrink-0 items-center justify-center [&>svg]:size-full";

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
      isDisabled = false,
      disabled,
      passwordVisibleIcon,
      passwordHiddenIcon,
      containerClassName,
      className,
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

    const isPassword = type === "password";
    const hasToggle = isPassword && Boolean(passwordVisibleIcon || passwordHiddenIcon);
    const passwordIcon = showPassword
      ? (passwordVisibleIcon ?? passwordHiddenIcon)
      : (passwordHiddenIcon ?? passwordVisibleIcon);
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

    const iconColor = isFieldDisabled ? "text-grey-100" : "text-grey-300";

    return (
      <div className={cn("flex w-full flex-col gap-1 font-dm-sans", containerClassName)}>
        {(label || labelLink) && (
          <div className="flex items-start gap-2">
            {label ? (
              <label htmlFor={id} className={cn("flex-1 cursor-pointer", LABEL_TEXT)}>
                {label}
              </label>
            ) : (
              <span className="flex-1" />
            )}
            {labelLink &&
              (labelLink.href ? (
                <a href={labelLink.href} onClick={labelLink.onClick} className={!labelLinkClassname ? LINK_TEXT : labelLinkClassname}>
                  {labelLink.text}
                </a>
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

        <div
          onClick={focusInput}
          className={cn(
            "flex w-full items-center gap-1 rounded-lg border px-3 py-2 transition-colors duration-150 motion-reduce:transition-none",
            isFieldDisabled
              ? "bg-grey-50 border-grey-50 cursor-not-allowed"
              : hasError
                ? "bg-error-50 border-error-50 cursor-text"
                : "bg-white border-grey-50 cursor-text focus-within:border-blue-500",
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
            <span className={cn("shrink-0", TEXT, isFieldDisabled ? "text-grey-100" : "text-grey-300")}>
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
              className={cn(ICON_BOX, iconColor, !isFieldDisabled && "cursor-pointer")}
            >
              {passwordIcon}
            </button>
          ) : (
            trailingIcon && (
              <span aria-hidden="true" className={cn(ICON_BOX, iconColor)}>
                {trailingIcon}
              </span>
            )
          )}
        </div>

        {errorMessage && (
          <p id={errorId} role="alert" className={ERROR_TEXT}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;