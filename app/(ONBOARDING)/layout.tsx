import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-1 items-center justify-center bg-blue-50 px-4 py-8 sm:px-6">
      <div className="layout-shell min-h-[min(43.75rem,85dvh)] w-full overflow-hidden rounded-[20px] py-24.5 px-21.25 bg-white">
        { children }
      </div>
    </div>
  );
};

export default Layout;
