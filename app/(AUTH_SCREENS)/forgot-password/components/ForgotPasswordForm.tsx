"use client";
import Button from "@/app/components/ui/Button";
import TextField from "@/app/components/ui/Textfield";
import Link from "next/link";

export interface ForgotPasswordFormProps {
  onEmailSent: () => void;
}

const ForgotPasswordForm = ({ onEmailSent }: ForgotPasswordFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <h3 className="font-semibold text-[#0D0D0D]">Forgot your password</h3>
        <p className="text-grey-300 body-medium-regular">
          Enter your email, we’ll send you a reset link
        </p>
      </div>

      {/* Bottom part */}
      <div className="flex flex-col gap-6">
        {/* Form */}
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <TextField label="Email" placeholder="example@gmail.com" />
          </div>

          <Button size="lg" variant="primary" className="w-full" onClick={onEmailSent}>
            Send Reset Link
          </Button>
        </form>

        <div className="w-full flex items-center justify-center">
          <Link
            href="/login"
            className="flex items-center underline text-center body-medium-regular text-blue-300 hover:text-blue-400"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
