"use client";
import {
  authContainer,
  authExit,
  authFade,
  authItem,
  authLine,
} from "@/app/components/animations/auth";
import PasswordField from "@/app/components/shared/PasswordField";
import { ArrowRight, Eye, Google } from "@/app/components/svgs/svg";
import Button from "@/app/components/ui/Button";
import Button2Icons from "@/app/components/ui/Button2Icons";
import EmailField from "@/app/components/ui/EmailField";
import TextField from "@/app/components/ui/Textfield";
import { signUpSchema, SignUpValues } from "@/app/lib/utils/zodAuthSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";

export interface SignupFormProps {
  onSubmit: () => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control: form.control, name: "password" }) ?? "";
  const { errors, submitCount, isSubmitting } = form.formState;

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
          Create an account
        </motion.h1>
        <motion.p
          variants={authItem}
          className="text-grey-300 body-medium-regular"
        >
          Start building your marketing engine
        </motion.p>
      </motion.div>

      {/* Bottom part */}
      <motion.div variants={authContainer} className="flex flex-col gap-6">
        {/* Form */}
        <motion.form
          variants={authContainer}
          onSubmit={form.handleSubmit(onSubmit)}
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
                    {...field}
                    error={fieldState.error?.message}
                    label="Email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    shakeKey={submitCount}
                  />
                )}
              />
            </motion.div>
            <motion.div variants={authItem}>
              <PasswordField
                value={password}
                error={errors.password?.message}
                registration={form.register("password")}
                shakeKey={submitCount}
                label="Password"
                placeholder="Password"
                autoComplete="new-password"
              />
            </motion.div>

            <motion.div variants={authItem}>
              <TextField
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                {...form.register("confirmPassword")}
                error={errors.confirmPassword?.message}
                passwordIcon={Eye}
                autoComplete="new-password"
                shakeKey={submitCount}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={authItem}>
            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="w-full"
              isDisabled={isSubmitting}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.form>

        <motion.div
          variants={authContainer}
          className="flex h-6 w-full items-center justify-center gap-4"
        >
          <motion.span
            variants={authLine}
            style={{ originX: 1 }}
            className="h-0 min-w-0 flex-1 border-t border-grey-100"
          />
          <motion.span
            variants={authFade}
            className="shrink-0 text-sm text-grey-400"
          >
            Or
          </motion.span>
          <motion.span
            variants={authLine}
            style={{ originX: 0 }}
            className="h-0 min-w-0 flex-1 border-t border-grey-100"
          />
        </motion.div>

        <motion.div variants={authItem} className="w-full">
          <Button2Icons
            size="sm"
            variant="social"
            className="w-full rounded-xl hover:bg-transparent"
            leftIcon={<Google className="h-4 w-4" />}
            rightIcon={<ArrowRight className="h-4 w-4 text-grey-300" />}
          >
            <p className="body-small-medium">Continue with Google</p>
          </Button2Icons>
        </motion.div>

        <motion.p
          variants={authFade}
          className="text-center body-medium-regular text-black"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline text-blue-300 hover:text-blue-400"
          >
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SignupForm;
