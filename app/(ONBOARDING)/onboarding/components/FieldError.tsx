"use client";

import { AlertDiamond } from "@/app/components/svgs/svg";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "../utils";

interface FieldErrorProps {
  id?: string;
  show: boolean;
  className?: string;
  children: ReactNode;
}

const FieldError = ({ id, show, className, children }: FieldErrorProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.p
          id={id}
          role="alert"
          initial={reduceMotion ? false : { opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "flex items-center gap-1 overflow-hidden text-xs leading-4 tracking-[-0.02em] text-error-500 md:text-sm md:leading-5",
            className,
          )}
        >
          <AlertDiamond
            aria-hidden="true"
            className="size-3 shrink-0 md:size-3.5"
          />
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default FieldError;
