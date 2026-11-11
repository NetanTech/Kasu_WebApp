"use client";
import { Google, Mail } from "@/app/components/svgs/svg";
import Link from "next/link";

const CheckInboxStep = () => {
  return (
    <div className="flex flex-col  w-full gap-6">
      <div className="flex w-full items-center justify-center">
        <Mail />
      </div>

      <div className="flex flex-col gap-6 items-center justify-center text-center">
        <h3 className="font-semibold text-[#0D0D0D]">Check your inbox</h3>

        <p className="body-medium-regular text-grey-300">
          We&apos;ve sent a reset link to{" "}
          <span className="font-medium block">example@gmail.com</span> The link
          expires in 15 minutes.
        </p>

        <button className="flex items-center gap-2 border border-[#e7e7e7] rounded-xl justify-center hover:bg-grey-50/50 transition-all ease-in-out body-small-medium text-black w-full py-2 px-3">
          <Google className="w-4 h-4" />
          Open Gmail
        </button>

        <div className="w-full flex items-center justify-center">
          <Link
            href="/login"
            className="flex items-center underline text-center body-medium-regular text-blue-300 hover:text-blue-400"
          >
            ← Back to Sign In
          </Link>
        </div>

        <p className="text-center body-medium-regular text-black">
          Didn&apos;t receive link?{" "}
          <Link
            href="/signup"
            className="underline text-blue-300 hover:text-blue-400"
          >
            Resend link
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckInboxStep;
