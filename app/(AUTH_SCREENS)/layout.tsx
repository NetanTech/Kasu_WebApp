import Image from "next/image";
import React from "react";
import Logo from "../components/ui/Logo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-1 items-center justify-center bg-blue-50 px-4 py-8 sm:px-6">
      {/* Left Panel: Image container */}
      <div className="layout-shell flex min-h-[min(43.75rem,85dvh)] w-full flex-col overflow-hidden rounded-[20px] bg-white lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,1fr)]">
        <div className="relative hidden min-h-0 min-w-0 overflow-hidden lg:m-6 lg:mr-4 lg:block lg:min-h-0 lg:rounded-2xl">
          <div className="relative h-full min-h-[min(40.75rem,calc(85dvh-3rem))] w-full">
            <Image
              src={"/images/auth-leftpanel.png"}
              alt="Dashboard"
              fill
              className="object-cover object-top-left"
              sizes="(min-width: 1024px) 55vw, 569px"
              priority
            />
          </div>
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:h-full lg:px-8 lg:py-8 lg:pr-12">
          <Logo className="mb-8 lg:hidden" />
          <div className="mx-auto w-full max-w-full lg:max-w-130.5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
