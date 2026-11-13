"use client";
import {
  authContainer,
  authExit,
  authItem,
} from "@/app/components/animations/auth";
import PasswordField from "@/app/components/shared/PasswordField";
import { Eye } from "@/app/components/svgs/svg";
import Button from "@/app/components/ui/Button";
import TextField from "@/app/components/ui/Textfield";
import { resetSchema, ResetValues } from "@/app/lib/utils/zodAuthSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useForm, useWatch } from "react-hook-form";

export interface NewPasswordFormProps {
  onPasswordSet: () => void;
}

const NewPasswordForm = ({ onPasswordSet }: NewPasswordFormProps) => {
  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting, errors, submitCount } = form.formState;
  const password = useWatch({ control: form.control, name: "password" }) ?? "";

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
          Set New Password
        </motion.h1>
        <motion.p
          variants={authItem}
          className="text-grey-300 body-medium-regular"
        >
          Choose a strong password you haven&apos;t used before.
        </motion.p>
      </motion.div>

      {/* Bottom part */}
      <motion.div variants={authContainer} className="flex flex-col gap-6">
        {/* Form */}
        <motion.form
          variants={authContainer}
          onSubmit={form.handleSubmit(onPasswordSet)}
          className="flex flex-col gap-8"
          noValidate
        >
          <motion.div variants={authContainer} className="flex flex-col gap-6">
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
                placeholder="Re-enter new password"
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
              isDisabled={ isSubmitting }
            >
              Reset Password
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default NewPasswordForm;
