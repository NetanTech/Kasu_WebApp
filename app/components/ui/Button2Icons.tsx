"use client";

import {
  Button,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
} from "@/app/components/ui/Button";
import { motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import {
  useState,
  type FocusEventHandler,
  type MouseEventHandler,
  type ReactNode,
} from "react";

const iconVariants = {
  initial: { opacity: 1 },
  hover: {
    x: "-100%",
    opacity: 0,
  },
} satisfies Variants;

const labelVariants = {
  initial: { x: "0%" },
  hover: { x: "-20%" },
} satisfies Variants;

const arrowVariants = {
  initial: {
    x: "-100%",
    opacity: 0,
  },
  hover: {
    x: "-160%",
    opacity: 1,
  },
} satisfies Variants;

const animationTransition = {
  type: "keyframes",
  stiffness: 120,
  damping: 10,
} satisfies Transition;

type Button2IconsProps = Omit<
  ButtonProps,
  | "children"
  | "leadingIcon"
  | "trailingIcon"
  | "size"
  | "variant"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
> & {
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
};

export default function Button2Icons({
  leftIcon,
  rightIcon,
  className,
  children,
  size = "lg",
  variant = "secondary",
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...buttonProps
}: Button2IconsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isHovered || isFocused;

  return (
    <Button
      {...buttonProps}
      variant={variant}
      size={size}
      className={`relative ${className ?? ""}`}
      onMouseEnter={(event) => {
        setIsHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setIsHovered(false);
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
    >
      <motion.div
        aria-hidden="true"
        initial="initial"
        animate={isActive ? "hover" : "initial"}
        variants={iconVariants}
        transition={animationTransition}
      >
        {leftIcon}
      </motion.div>

      <motion.div
        initial="initial"
        animate={isActive ? "hover" : "initial"}
        variants={labelVariants}
        transition={animationTransition}
      >
        <span>{ children }</span>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial="initial"
        animate={isActive ? "hover" : "initial"}
        variants={arrowVariants}
        transition={{
          ...animationTransition,
          delay: 0.1,
        }}
        
      >
        {rightIcon}
        
      </motion.div>
    </Button>
  );
}
