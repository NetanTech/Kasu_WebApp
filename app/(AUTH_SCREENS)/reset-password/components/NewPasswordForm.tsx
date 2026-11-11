"use client";
import { Eye, EyeSlash } from "@/app/components/svgs/svg";
import Button from "@/app/components/ui/Button";
import TextField from "@/app/components/ui/Textfield";

export interface NewPasswordFormProps {
  onPasswordSet: () => void;
}

const NewPasswordForm = ({ onPasswordSet }: NewPasswordFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <h3 className="font-semibold text-[#0D0D0D]">Set New Password</h3>
        <p className="text-grey-300 body-medium-regular">
          Choose a strong password you haven&apos;t used before.
        </p>
      </div>

      {/* Bottom part */}
      <div className="flex flex-col gap-6">
        {/* Form */}
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <TextField
              label="Password"
              placeholder="Password"
              type="password"
              passwordHiddenIcon={<EyeSlash className="text-grey-200" />}
              passwordVisibleIcon={<Eye className="text-grey-200" />}
            />
            <TextField
              label="Confirm Password"
              placeholder="Re-enter new password"
              type="password"
              passwordHiddenIcon={<EyeSlash className="text-grey-200" />}
              passwordVisibleIcon={<Eye className="text-grey-200" />}
            />
          </div>

          <p className="body-small-regular text-grey-300 text-center">
            Use at least 8 characters, one uppercase, one number, and one symbol
          </p>

          <Button
            size="lg"
            variant="primary"
            className="w-full"
            onClick={onPasswordSet}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordForm;
