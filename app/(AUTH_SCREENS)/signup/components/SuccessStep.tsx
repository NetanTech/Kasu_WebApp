"use client";
import { Google, Verify } from "@/app/components/svgs/svg";

const SuccessStep = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center text-center">
      <Verify />
      <h3 className="font-semibold text-[#0D0D0D]">
        You’re ready to go!
        <br /> Check your email to begin.
      </h3>

      <p className="body-medium-regular text-grey-300">
        We’ve sent a verification link to your email address.
        <br />
        Click the link to activate your account and start building your
        <br />
        AI-powered marketing workspace.
      </p>

      <button className="flex items-center gap-2 border border-[#e7e7e7] rounded-xl justify-center hover:bg-grey-50/50 transition-all ease-in-out body-small-medium text-black w-[90%] py-2 px-3">
        <Google className="w-4 h-4" />
        Open Gmail
      </button>
    </div>
  );
};

export default SuccessStep;
