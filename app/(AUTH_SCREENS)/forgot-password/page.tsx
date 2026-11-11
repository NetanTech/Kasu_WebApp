"use client";
import React, { useState } from "react";
import CheckInboxStep from "./components/CheckInboxStep";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

const Page = () => {
  const [emailSet, setEmailSet] = useState(false);
  return !emailSet ? (
    <ForgotPasswordForm onEmailSent={() => setEmailSet(true)} />
  ) : (
    <CheckInboxStep />
  );
};

export default Page;
