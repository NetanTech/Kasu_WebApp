"use client";
import { AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import NewPasswordForm from "./components/NewPasswordForm";
import ResetSuccessStep from "./components/ResetSuccessStep";

const Page = () => {
  const [passwordSet, setPasswordSet] = useState(false);
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">
      {!passwordSet ? (
        <NewPasswordForm
          key="form"
          onPasswordSet={() => setPasswordSet(true)}
        />
      ) : (
        <ResetSuccessStep
          key="success"
          onContinue={() => router.push("/login")}
        />
      )}
    </AnimatePresence>
  );
};

export default Page;
