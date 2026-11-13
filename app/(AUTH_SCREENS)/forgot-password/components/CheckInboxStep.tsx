"use client";
import {
  authContainer,
  authExit,
  authFade,
  authItem,
} from "@/app/components/animations/auth";
import EmailSentIcon from "@/app/components/svgs/EmailSentIcon";
import { ArrowRight, Google } from "@/app/components/svgs/svg";
import Button2Icons from "@/app/components/ui/Button2Icons";
import { motion } from "motion/react";
import Link from "next/link";

const CheckInboxStep = ({
  email,
  onResend,
}: {
  email: string;
  onResend: () => void;
}) => {
  return (
    <motion.div
      variants={authContainer}
      initial="hidden"
      animate="visible"
      exit={authExit}
      className="flex flex-col w-full gap-4"
    >
      <motion.div
        variants={authItem}
        className="flex w-full items-center justify-center"
      >
        <EmailSentIcon size={80} />
      </motion.div>

      <motion.div
        variants={authContainer}
        className="flex flex-col gap-6 items-center justify-center text-center"
      >
        <motion.h1
          variants={authItem}
          className="auth-title text-[#0D0D0D]"
        >
          Check your inbox
        </motion.h1>

        <motion.p
          variants={authItem}
          className="body-medium-regular text-grey-300"
        >
          We&apos;ve sent a reset link to{" "}
          <span className="font-medium block">{email}</span> The link expires in
          15 minutes.
        </motion.p>

        <motion.div variants={authItem} className="w-full">
          <Button2Icons
            size="sm"
            variant="social"
            className="w-full rounded-xl hover:bg-transparent"
            leftIcon={<Google className="h-4 w-4" />}
            rightIcon={<ArrowRight className="h-4 w-4 text-grey-300" />}
          >
            <p className="body-small-medium">Open Gmail</p>
          </Button2Icons>
        </motion.div>

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

        <motion.p
          variants={authFade}
          className="text-center body-medium-regular text-black"
        >
          Didn&apos;t receive link?{" "}
          <button
            type="button"
            onClick={onResend}
            className="cursor-pointer underline text-blue-300 hover:text-blue-400"
          >
            Resend link
          </button>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default CheckInboxStep;
