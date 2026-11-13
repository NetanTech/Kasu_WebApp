"use client";
import {
  authContainer,
  authExit,
  authFade,
  authItem,
} from "@/app/components/animations/auth";
import { MainVerify } from "@/app/components/svgs/motionsvgs";
import Button from "@/app/components/ui/Button";
import { motion } from "motion/react";

export interface ResetSuccessStepProps {
  onContinue: () => void;
}

const ResetSuccessStep = ({ onContinue }: ResetSuccessStepProps) => {
  return (
    <motion.div
      variants={authContainer}
      initial="hidden"
      animate="visible"
      exit={authExit}
      className="flex flex-col gap-6"
    >
      <motion.div
        variants={authItem}
        className="flex w-full items-center justify-center"
      >
        <MainVerify />
      </motion.div>

      <motion.div
        variants={authContainer}
        className="flex flex-col gap-6 items-center justify-center text-center"
      >
        <motion.h1
          variants={authItem}
          className="auth-title text-[#0D0D0D]"
        >
          Password reset!
        </motion.h1>

        <motion.p
          variants={authItem}
          className="body-medium-regular text-grey-300"
        >
          Your password has been updated successfully.
          <br /> You&apos;re all set to sign in.
        </motion.p>

        <motion.div variants={authItem} className="w-full">
          <Button
            size="lg"
            variant="primary"
            className="w-full"
            onClick={onContinue}
          >
            Go To Sign In
          </Button>
        </motion.div>

        <motion.p
          variants={authFade}
          className="body-medium-regular text-grey-300"
        >
          You&apos;ll be redirected to your dashboard after signing in
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ResetSuccessStep;
