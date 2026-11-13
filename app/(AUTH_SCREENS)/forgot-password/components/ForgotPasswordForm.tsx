"use client";
import {
  authContainer,
  authExit,
  authItem,
} from "@/app/components/animations/auth";
import Button from "@/app/components/ui/Button";
import EmailField from "@/app/components/ui/EmailField";
import { forgotSchema, ForgotValues } from "@/app/lib/utils/zodAuthSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

export interface ForgotPasswordFormProps {
  onEmailSent: (email: string) => void;
}

const ForgotPasswordForm = ({ onEmailSent }: ForgotPasswordFormProps) => {
  const form = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });
  const { isSubmitting, submitCount } = form.formState;
  return (
    <motion.div
      variants={authContainer}
      initial="hidden"
      animate="visible"
      exit={authExit}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div
        variants={authContainer}
        className="flex flex-col gap-2 items-center justify-center text-center"
      >
        <motion.h1 variants={authItem} className="auth-title text-[#0D0D0D]">
          Forgot your password
        </motion.h1>
        <motion.p
          variants={authItem}
          className="text-grey-300 body-medium-regular"
        >
          Enter your email, we’ll send you a reset link
        </motion.p>
      </motion.div>

      {/* Bottom part */}
      <motion.div variants={authContainer} className="flex flex-col gap-6">
        {/* Form */}
        <motion.form
          variants={authContainer}
          onSubmit={form.handleSubmit(({ email }) => onEmailSent(email))}
          className="flex flex-col gap-8"
          noValidate
        >
          <motion.div variants={authContainer} className="flex flex-col gap-6">
            <motion.div variants={authItem}>
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <EmailField
                    label="Email"
                    placeholder="Enter your email"
                    {...field}
                    error={fieldState.error?.message}
                    autoComplete="email"
                    shakeKey={submitCount}
                  />
                )}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={authItem}>
            <Button
            type="submit"
              size="lg"
              variant="primary"
              className="w-full"
              isDisabled={ isSubmitting }
            >
              Send Reset Link
            </Button>
          </motion.div>
        </motion.form>

        <motion.div
          variants={authItem}
          className="w-full flex items-center justify-center"
        >
          <Link
            href="/login"
            className="flex items-center underline text-center body-medium-regular text-blue-300 hover:text-blue-400"
          >
            ← Back to Sign In
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordForm;
