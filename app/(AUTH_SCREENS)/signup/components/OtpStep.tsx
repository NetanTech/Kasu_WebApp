"use client";
import Button from "@/app/components/ui/Button";
import { OTPInput } from "@/app/components/ui/OtpInput";
import Link from "next/link";

export interface OtpStepProps {
  onVerify: () => void;
}

const OtpStep = ({ onVerify }: OtpStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 text-center">
      <h3 className="font-semibold">Code Verification</h3>
      <p className="body-medium-regular text-grey-300">
        We have sent code to your Email{" "}
        <span className="text-blue-500">example@email.com</span>
      </p>

      <OTPInput length={4} />
      <Button
        size="lg"
        variant="primary"
        className="w-[80%]"
        onClick={onVerify}
      >
        Verify
      </Button>
      <p className="text-center body-medium-regular text-grey-500">
        Didn&apos;t receive code,{" "}
        <Link
          href="/login"
          className="underline text-blue-300 hover:text-blue-400"
        >
          Resend
        </Link>
      </p>
    </div>
  );
};

export default OtpStep;
