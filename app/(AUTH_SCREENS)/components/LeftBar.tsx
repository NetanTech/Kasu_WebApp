import Image from "next/image";
import React from "react";

const LeftBar = () => {
  return (
    <div className="relative hidden min-h-0 min-w-0 overflow-hidden lg:m-6 lg:mr-4 lg:block lg:min-h-0 lg:rounded-2xl bg-linear-to-b from-[#130E41] to-[#4E4891]">
      <div className="absolute w-full h-100  left-[20%] -bottom-5  overflow-hidden rounded-[20px]">
        <Image
          src={"/assets/dashboard.jpg"}
          alt=""
          width={1000}
          height={600}
          className="object-top-left w-full"
        />
      </div>
    </div>
  );
};

export default LeftBar;
