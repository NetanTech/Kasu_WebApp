import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type TextareaHTMLAttributes,
} from "react";

export interface TextAreaLabelLink {
  text: string;
  href?: string;
  onClick?: () => void;
}

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "maxLength"> {
  /** Linked to the textarea through `id`, so clicking it focuses the field. */
  label?: string;
  labelLink?: TextAreaLabelLink;
  /** Max characters. Enforced on type/paste and shown as a live counter. */
  characterLength?: number;
  showCounter?: boolean;
  /** `string` shows the message below the field; `true` only styles the field. */
  error?: string | boolean;
  helperText?: string;
  isDisabled?: boolean;
  containerClassName?: string;
}

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const LABEL_TEXT =
  "text-sm leading-5 md:text-base md:leading-6 font-medium tracking-[-0.02em] text-grey-500";

const SMALL_TEXT = "text-xs leading-4 md:text-sm md:leading-5 tracking-[-0.02em]";

// Input text stays 16px on mobile so iOS Safari doesn't zoom on focus.
const FIELD_BASE =
  "block w-full min-h-20 h-28 md:h-[140px] resize-none rounded-lg border px-3 py-2 " +
  "font-dm-sans text-base leading-6 tracking-[-0.02em] text-grey-500 " +
  "placeholder:text-grey-200 outline-none " +
  "transition-colors duration-150 motion-reduce:transition-none " +
  "disabled:bg-grey-50 disabled:border-grey-50 disabled:text-grey-300 " +
  "disabled:placeholder:text-grey-100 disabled:cursor-not-allowed";

const FIELD_IDLE =
  "bg-transparent border-grey-50 focus:border-blue-500";

const FIELD_ERROR =
  "bg-error-50 border-error-500 focus:ring-2 focus:ring-error-500/20";

const LINK =
  "shrink-0 rounded-sm text-sm leading-5 md:text-base md:leading-6 font-semibold " +
  "tracking-[-0.02em] text-blue-500 hover:text-blue-400 hover:underline " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id: idProp,
      name,
      label,
      labelLink,
      characterLength,
      showCounter = true,
      error,
      helperText,
      isDisabled = false,
      disabled,
      containerClassName,
      className,
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
    const helperId = `${id}-helper`;
    const counterId = `${id}-counter`;

    const [innerLength, setInnerLength] = useState(
      () => String(value ?? defaultValue ?? "").length,
    );
    const currentLength =
      value !== undefined ? String(value).length : innerLength;

    const hasLimit = typeof characterLength === "number" && characterLength > 0;
    const atLimit = hasLimit && currentLength >= characterLength;
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;
    const helper = errorMessage ? undefined : helperText;
    const counterVisible = hasLimit && showCounter;

    const describedBy =
      [
        errorMessage && errorId,
        helper && helperId,
        counterVisible && counterId,
        rest["aria-describedby"],
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInnerLength(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className={cn("flex w-full flex-col gap-1", containerClassName)}>
        {(label || labelLink) && (
          <div className="flex items-start justify-between gap-2">
            {label ? (
              <label htmlFor={id} className={cn("flex-1 cursor-pointer", LABEL_TEXT)}>
                {label}
              </label>
            ) : (
              <span className="flex-1" />
            )}
            {labelLink &&
              (labelLink.href ? (
                <a href={labelLink.href} onClick={labelLink.onClick} className={LINK}>
                  {labelLink.text}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={labelLink.onClick}
                  className={cn(LINK, "cursor-pointer")}
                >
                  {labelLink.text}
                </button>
              ))}
          </div>
        )}

        <textarea
          ref={ref}
          id={id}
          name={name ?? idProp}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={hasLimit ? characterLength : undefined}
          disabled={isDisabled || disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cn(FIELD_BASE, hasError ? FIELD_ERROR : FIELD_IDLE, className)}
          {...rest}
        />

        {(errorMessage || helper || counterVisible) && (
          <div className="flex items-start justify-between gap-2">
            {errorMessage ? (
              <p id={errorId} role="alert" className={cn("text-error-500", SMALL_TEXT)}>
                {errorMessage}
              </p>
            ) : helper ? (
              <p id={helperId} className={cn("text-grey-300", SMALL_TEXT)}>
                {helper}
              </p>
            ) : (
              <span />
            )}

            {counterVisible && (
              <span
                id={counterId}
                className={cn(
                  "ml-auto shrink-0 tabular-nums",
                  SMALL_TEXT,
                  atLimit ? "text-error-500" : "text-grey-300",
                )}
              >
                {currentLength}/{characterLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;