"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-[60px] px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between flex-wrap gap-2">
      <div
        onClick={handleHome}
        className="text-base sm:text-lg md:text-2xl text-[#21bb0f] font-semibold cursor-pointer"
      >
        Interactive Quiz Platform
      </div>
      <div className="mt-1 sm:mt-0">
        <Button
          size="large"
          className="h-10 sm:h-12 px-3 sm:px-4 text-xs sm:text-sm"
        >
          QUIZ HISTORY
        </Button>
      </div>
    </div>
  );
};

export default Header;
