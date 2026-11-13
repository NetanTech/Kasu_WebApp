"use client";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from "react";

export type ButtonSize = "sm" | "lg";
export type ButtonVariant = "primary" | "secondary" | "social";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** `sm` or `lg`. Both shrink slightly below the `md` breakpoint. */
  size: ButtonSize;
  /** `primary` (filled) or `secondary` (outlined). */
  variant: ButtonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Disables the button. Also respects the native `disabled` prop. */
  isDisabled?: boolean;
  /** Icon rendered before the label. */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: ReactNode;
  /** Stretch to the width of the parent. */
  fullWidth?: boolean;
}


const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");


const BASE =
  "inline-flex items-center justify-center rounded-lg font-dm-sans font-medium " +
  "tracking-[-0.02em] whitespace-nowrap select-none cursor-pointer " +
  "transition-colors duration-150 motion-reduce:transition-none " +
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 " +
  "disabled:cursor-not-allowed";

const SIZES = {
  sm: {
    text: "text-xs leading-4 md:text-sm md:leading-5",
    gap: "gap-1.5 md:gap-2",
    label: "px-3 py-2 md:px-4",
    withIcon: "px-2.5 py-2 md:px-3",
    iconOnly: "p-2",
    icon: "size-4 md:size-5",
    border: "border",
  },
  lg: {
    text: "text-sm leading-5 md:text-base md:leading-6",
    gap: "gap-1.5 md:gap-2",
    label: "px-5 py-3 md:px-6",
    withIcon: "px-3.5 py-3 md:px-4",
    iconOnly: "p-3",
    icon: "size-5 md:size-6",
    border: "border-[1.5px]",
  },
} as const;

const VARIANTS = {
  primary: [
    "bg-blue-500 text-white",
    "enabled:hover:bg-blue-400",
    "enabled:active:bg-blue-700",
    "enabled:focus-visible:bg-blue-700",
    "disabled:bg-blue-100",
  ].join(" "),

  secondary: [
    "bg-white text-black border-[#E7E7E7]",
    "enabled:hover:bg-blue-50 enabled:hover:border-blue-600 enabled:hover:text-blue-600",
    "enabled:active:bg-blue-50 enabled:active:border-blue-700 enabled:active:text-blue-700",
    "enabled:focus-visible:bg-blue-50 enabled:focus-visible:border-blue-700 enabled:focus-visible:text-blue-700",
    "disabled:bg-white disabled:border-[#F0F2F5] disabled:text-[#98A2B3]",
  ].join(" "),

  social: [
    'bg-transparent text-black  body-small-medium border border-grey-50',
    'enabled:hover:bg-grey-50/50 enabled:hover:border-grey-50 enabled:hover:text-black',
    'enabled:active:bg-grey-50/50 enabled:active:border-grey-50 enabled:active:text-black',
    'enabled:focus-visible:bg-grey-50/50 enabled:focus-visible:border-grey-300 enabled:focus-visible:text-black',
    'disabled:bg-transparent disabled:border-[#F0F2F5] disabled:text-[#98A2B3]',
  ].join(" "),
} as const;


const LG_SECONDARY_BORDER_BOOST = [
  "enabled:active:shadow-[inset_0_0_0_0.5px_var(--color-blue-700)]",
  "enabled:focus-visible:shadow-[inset_0_0_0_0.5px_var(--color-blue-700)]",
  "disabled:shadow-[inset_0_0_0_0.5px_#F0F2F5]",
].join(" ");


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      variant,
      onClick,
      isDisabled = false,
      leadingIcon,
      trailingIcon,
      fullWidth = false,
      type = "button",
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const s = SIZES[size];
    const hasLabel =
      children !== undefined &&
      children !== null &&
      children !== false &&
      children !== "";
    const hasIcon = Boolean(leadingIcon || trailingIcon);
    const isIconOnly = !hasLabel && hasIcon;

    const padding = isIconOnly ? s.iconOnly : hasIcon ? s.withIcon : s.label;

    const renderIcon = (icon: ReactNode) => (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 items-center justify-center [&>svg]:size-full",
          s.icon,
        )}
      >
        {icon}
      </span>
    );

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled || disabled}
        className={cn(
          className,
          BASE,
          s.text,
          s.gap,
          padding,
          VARIANTS[variant],
          variant === "secondary" && s.border,
          variant === "secondary" && size === "lg" && LG_SECONDARY_BORDER_BOOST,
          fullWidth && "w-full",
        )}
        {...rest}
      >
        {leadingIcon && renderIcon(leadingIcon)}
        {hasLabel && children}
        {trailingIcon && renderIcon(trailingIcon)}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;