"use client";
import { Eye, EyeSlash, Google } from "@/app/components/svgs/svg";
import Button from "@/app/components/ui/Button";
import TextField from "@/app/components/ui/Textfield";
import Link from "next/link";

export interface SignupFormProps {
  onSubmit: () => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <h3 className="font-semibold text-[#0D0D0D]">Create an account</h3>
        <p className="text-grey-300 body-medium-regular">
          Start building your marketing engine
        </p>
      </div>

      {/* Bottom part */}
      <div className="flex flex-col gap-6">
        {/* Form */}
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <TextField label="Email" placeholder="Enter your email" />
            <TextField
              label="Password"
              placeholder="Password"
              type="password"
              passwordHiddenIcon={<EyeSlash className="text-grey-200" />}
              passwordVisibleIcon={<Eye className="text-grey-200" />}
            />

            <TextField
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              passwordHiddenIcon={<EyeSlash className="text-grey-200" />}
              passwordVisibleIcon={<Eye className="text-grey-200" />}
            />
          </div>

          <Button
            size="lg"
            variant="primary"
            className="w-full"
            onClick={onSubmit}
          >
            Get Started
          </Button>
        </form>

        <div className="flex h-6 w-full items-center justify-center gap-4">
          <span className="h-0 min-w-0 flex-1 border-t border-grey-100" />
          <span className="shrink-0 text-sm text-grey-400">Or</span>
          <span className="h-0 min-w-0 flex-1 border-t border-grey-100" />
        </div>

        <button className="flex items-center gap-2 border border-[#e7e7e7] rounded-xl justify-center hover:bg-grey-50/50 transition-all ease-in-out body-small-medium text-black w-full py-2 px-3">
          <Google className="w-4 h-4" />
          Continue with Google
        </button>

        <p className="text-center body-medium-regular text-black">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline text-blue-300 hover:text-blue-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
