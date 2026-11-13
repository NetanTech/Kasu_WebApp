"use client";
import {
  authContainer,
  authFade,
  authItem,
  authLine,
} from "@/app/components/animations/auth";
import { ArrowRight, Eye, Google } from "@/app/components/svgs/svg";
import Button from "@/app/components/ui/Button";
import Button2Icons from "@/app/components/ui/Button2Icons";
import EmailField from "@/app/components/ui/EmailField";
import TextField from "@/app/components/ui/Textfield";
import { loginSchema, LoginValues } from "@/app/lib/utils/zodAuthSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

const Page = () => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  const { submitCount, isSubmitting, errors } = form.formState;
  return (
    <motion.div
      variants={authContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div
        variants={authContainer}
        className="flex flex-col gap-2 items-center justify-center text-center"
      >
        <motion.h1 variants={authItem} className="auth-title text-[#0D0D0D]">
          Sign In
        </motion.h1>
        <motion.p
          variants={authItem}
          className="text-grey-300 body-medium-regular"
        >
          Welcome back to Kasu
        </motion.p>
      </motion.div>

      {/* Bottom part */}
      <motion.div variants={authContainer} className="flex flex-col gap-6">
        {/* Form */}
        <motion.form
          variants={authContainer}
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
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
                    { ...field }
                    error={ fieldState.error?.message }
                    autoComplete="email"
                    shakeKey={submitCount}
                  />
                )}
              />
            </motion.div>
            <motion.div variants={authItem}>
              <TextField
                label="Password"
                placeholder="Password"
                type="password"
                { ...form.register('password') }
                error={errors.password?.message}
                shakeKey={ submitCount }
                passwordIcon={Eye}
                autoComplete="current-password"
                labelLink={{
                  text: "forgot password",
                  href: "/forgot-password",
                }}
                labelLinkClassname="text-[#B0B0B0] text-[16px] capitalize tracking-[-1%] leading-[24px] hover:underline transition-all"
              />
            </motion.div>
          </motion.div>

          <motion.div variants={authItem}>
            <Button
            type="submit"
              size="lg"
              variant="primary"
              className="w-full"
              disabled={ isSubmitting }
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
            Or log in with
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
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="underline text-blue-300 hover:text-blue-400"
          >
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Page;
