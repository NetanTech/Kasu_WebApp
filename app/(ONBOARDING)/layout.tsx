import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Set up your business on Kasu.",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-blue-50 px-4 py-8 sm:px-6">
      <div className="layout-shell flex h-[min(43.75rem,85dvh)] w-full flex-col overflow-hidden rounded-[20px] bg-white">
        {children}
      </div>
    </div>
  );
};

export default Layout;
