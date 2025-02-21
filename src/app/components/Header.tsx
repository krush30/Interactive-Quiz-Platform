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
    <div className="h-[60px] p-[24px]  flex items-center justify-between">
      <div
        onClick={handleHome}
        className="text-[24px] text-[#21bb0f] font-semibold cursor-pointer"
      >
        Interactive Quiz Platform
      </div>
      <div>
        <Button>QUIZ HISTORY</Button>
      </div>
    </div>
  );
};

export default Header;
