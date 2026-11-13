"use client";
import {
  authContainer,
  authExit,
  authFade,
  authItem,
} from "@/app/components/animations/auth";
import Button from "@/app/components/ui/Button";
import { OTPInput } from "@/app/components/ui/OtpInput";
import { motion } from "motion/react";
import Link from "next/link";

export interface OtpStepProps {
  onVerify: () => void;
}

const OtpStep = ({ onVerify }: OtpStepProps) => {
  return (
    <motion.div
      variants={authContainer}
      initial="hidden"
      animate="visible"
      exit={authExit}
      className="flex flex-col items-center justify-center w-full gap-6 text-center"
    >
      <motion.h1 variants={authItem} className="auth-title">
        Code Verification
      </motion.h1>
      <motion.p
        variants={authItem}
        className="body-medium-regular text-grey-300"
      >
        We have sent code to your Email{" "}
        <span className="text-blue-500">example@email.com</span>
      </motion.p>

      <motion.div variants={authItem} className="flex w-full justify-center">
        <OTPInput length={4} />
      </motion.div>
      <motion.div variants={authItem} className="flex w-full justify-center">
        <Button
          size="lg"
          variant="primary"
          className="w-[80%]"
          onClick={onVerify}
        >
          Verify
        </Button>
      </motion.div>
      <motion.p
        variants={authFade}
        className="text-center body-medium-regular text-grey-500"
      >
        Didn&apos;t receive code,{" "}
        <Link
          href="/login"
          className="underline text-blue-300 hover:text-blue-400"
        >
          Resend
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default OtpStep;
