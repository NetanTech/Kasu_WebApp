"use client";
import React, { useState } from "react";
import OtpStep from "./components/OtpStep";
import SignupForm from "./components/SignupForm";
import SuccessStep from "./components/SuccessStep";

const Page = () => {
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  return step == "form" ? (
    <SignupForm onSubmit={() => setStep("otp")} />
  ) : step == "otp" ? (
    <OtpStep onVerify={() => setStep("success")} />
  ) : (
    <SuccessStep />
  );
};

export default Page;
