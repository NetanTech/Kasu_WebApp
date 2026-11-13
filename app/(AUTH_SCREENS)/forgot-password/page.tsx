"use client";
import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import CheckInboxStep from "./components/CheckInboxStep";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

const Page = () => {
  const [email, setEmail] = useState("");
  return (
    <AnimatePresence mode="wait">
      {!email ? (
        <ForgotPasswordForm key="form" onEmailSent={setEmail} />
      ) : (
        <CheckInboxStep
          key="sent"
          email={email}
          onResend={() => setEmail("")}
        />
      )}
    </AnimatePresence>
  );
};

export default Page;
