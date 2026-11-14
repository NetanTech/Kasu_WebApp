"use client";

import { MainVerify } from "@/app/components/svgs/motionsvgs";
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
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4 py-10 text-center md:px-8 lg:px-21.25">
      <MainVerify aria-hidden="true" className="h-20 w-20" />

      <div className="flex max-w-md flex-col gap-2">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="heading-4 text-balance text-black outline-none"
        >
          You&apos;re all set!
        </h1>
        <p className="body-medium-regular text-grey-300">
          We&apos;ve got everything we need. KASU is ready to help{" "}
          {businessName ? businessName : "your business"} keep cleaner records
          and understand daily sales.
        </p>
      </div>
    </div>
  );
};

export default SuccessStep;
