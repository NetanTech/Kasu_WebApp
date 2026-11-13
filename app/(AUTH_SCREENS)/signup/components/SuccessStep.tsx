"use client";
import {
  authContainer,
  authExit,
  authItem,
} from "@/app/components/animations/auth";
import { MainVerify } from "@/app/components/svgs/motionsvgs";
import { ArrowRight, Google } from "@/app/components/svgs/svg";
import Button2Icons from "@/app/components/ui/Button2Icons";
import { motion } from "motion/react";
import Link from "next/link";

const SuccessStep = () => {
  return (
    <motion.div
      variants={authContainer}
      initial="hidden"
      animate="visible"
      exit={authExit}
      className="flex flex-col gap-6 items-center justify-center text-center"
    >
      <motion.div variants={authItem}>
        <MainVerify />
      </motion.div>
      <motion.h1 variants={authItem} className="auth-title text-[#0D0D0D]">
        You’re ready to go!
        <br /> Check your email to begin.
      </motion.h1>

      <motion.p
        variants={authItem}
        className="body-medium-regular text-grey-300"
      >
        We’ve sent a verification link to your email address.
        <br />
        Click the link to activate your account and start building your
        <br />
        AI-powered marketing workspace.
      </motion.p>

      <motion.div variants={authItem} className="flex w-full justify-center">
        <Button2Icons
          size="sm"
          variant="social"
          className="w-[90%] rounded-xl hover:bg-transparent"
          leftIcon={<Google className="h-4 w-4" />}
          rightIcon={<ArrowRight className="h-4 w-4 text-grey-300" />}
        >
          <p className="body-small-medium">Open Gmail</p>
        </Button2Icons>
      </motion.div>

      <motion.div variants={authItem}>
        <Link
          href="/login"
          className="underline body-medium-regular text-blue-300 hover:text-blue-400"
        >
          ← Back to Sign In
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default SuccessStep;
