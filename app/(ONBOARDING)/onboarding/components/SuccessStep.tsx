"use client";

import { authContainer, authItem } from "@/app/components/animations/auth";
import { MainVerify } from "@/app/components/svgs/motionsvgs";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

interface SuccessStepProps {
  businessName: string;
}

const SuccessStep = ({ businessName }: SuccessStepProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div
      variants={authContainer}
      initial="hidden"
      animate="visible"
      className="flex h-full flex-col items-center justify-center gap-6 px-4 py-10 text-center md:px-8 lg:px-21.25"
    >
      <motion.div variants={authItem}>
        <MainVerify aria-hidden="true" className="h-20 w-20" />
      </motion.div>

      <motion.div
        variants={authContainer}
        className="flex max-w-md flex-col gap-2"
      >
        <motion.h1
          ref={headingRef}
          variants={authItem}
          tabIndex={-1}
          className="heading-4 text-balance text-black outline-none"
        >
          You&apos;re all set!
        </motion.h1>
        <motion.p
          variants={authItem}
          className="body-medium-regular text-grey-300"
        >
          We&apos;ve got everything we need. KASU is ready to help{" "}
          {businessName ? businessName : "your business"} keep cleaner records
          and understand daily sales.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SuccessStep;
