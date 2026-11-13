"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Eye } from "@/app/components/svgs/svg";
import TextField, {
  type TextFieldLabelLink,
} from "@/app/components/ui/Textfield";
import PasswordRules from "./PasswordRules";

export interface PasswordFieldProps {
  /** Current password value, used to evaluate the rules. */
  value: string;
  /** Validation message from react-hook-form. */
  error?: string;
  /** Return value of `form.register("password")`. */
  registration: UseFormRegisterReturn;
  /** Increment to replay the shake for repeated errors. */
  shakeKey?: number;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  labelLink?: TextFieldLabelLink;
  labelLinkClassname?: string;
}

const PasswordField = ({
  value,
  error,
  registration,
  shakeKey,
  label = "Password",
  placeholder = "Password",
  autoComplete = "new-password",
  labelLink,
  labelLinkClassname,
}: PasswordFieldProps) => {
  const [focused, setFocused] = useState(false);
  const reduceMotion = useReducedMotion();

  const { onBlur, ...fieldProps } = registration;
  const hasValue = value.length > 0;
  const showRules = focused || hasValue;
  const invalid = Boolean(error) && hasValue;
  const fieldError = !value && error ? error : Boolean(error);

  return (
    <div className="group/password flex flex-col">
      <TextField
        {...fieldProps}
        label={label}
        placeholder={placeholder}
        type="password"
        passwordIcon={Eye}
        autoComplete={autoComplete}
        labelLink={labelLink}
        labelLinkClassname={labelLinkClassname}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          onBlur(event);
          setFocused(false);
        }}
        error={fieldError}
        shakeKey={shakeKey}
      />

      <AnimatePresence initial={false}>
        {showRules && (
          <motion.div
            key="password-rules"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 5 }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, height: 0, marginTop: 0 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <PasswordRules value={value} invalid={invalid} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PasswordField;
