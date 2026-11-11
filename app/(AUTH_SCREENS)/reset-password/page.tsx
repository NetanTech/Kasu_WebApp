"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import NewPasswordForm from "./components/NewPasswordForm";
import ResetSuccessStep from "./components/ResetSuccessStep";

const Page = () => {
  const [passwordSet, setPasswordSet] = useState(false);
  const router = useRouter();
  return !passwordSet ? (
    <NewPasswordForm onPasswordSet={() => setPasswordSet(true)} />
  ) : (
    <ResetSuccessStep onContinue={() => router.push("/login")} />
  );
};

export default Page;
