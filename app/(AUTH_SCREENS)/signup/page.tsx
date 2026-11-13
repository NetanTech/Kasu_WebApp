"use client";
import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import OtpStep from "./components/OtpStep";
import SignupForm from "./components/SignupForm";
import SuccessStep from "./components/SuccessStep";

const Page = () => {
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  return (
    <AnimatePresence mode="wait">
      {step === "form" ? (
        <SignupForm key="form" onSubmit={() => setStep("otp")} />
      ) : step === "otp" ? (
        <OtpStep key="otp" onVerify={() => setStep("success")} />
      ) : (
        <SuccessStep key="success" />
      )}
    </AnimatePresence>
  );
};

export default Page;
