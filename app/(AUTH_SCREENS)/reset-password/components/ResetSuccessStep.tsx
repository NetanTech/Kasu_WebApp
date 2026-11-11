"use client";
import { Verify } from "@/app/components/svgs/svg";
import Button from "@/app/components/ui/Button";

export interface ResetSuccessStepProps {
  onContinue: () => void;
}

const ResetSuccessStep = ({ onContinue }: ResetSuccessStepProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full items-center justify-center">
        <Verify />
      </div>

      <div className="flex flex-col gap-6 items-center justify-center text-center">
        <h3 className="font-semibold text-[#0D0D0D]">Password reset!</h3>

        <p className="body-medium-regular text-grey-300">
          Your password has been updated successfully.
          <br /> You&apos;re all set to sign in.
        </p>

        <Button
          size="lg"
          variant="primary"
          className="w-full"
          onClick={onContinue}
        >
          Go To Sign In
        </Button>

        <p className="body-medium-regular text-grey-300">
          You&apos;ll be redirected to your dashboard after signing in
        </p>
      </div>
    </div>
  );
};

export default ResetSuccessStep;
