import React from "react";
import janseva from "@/assets/janseva-logo.png";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img src={janseva} alt="JanSeva Logo" className="h-8 w-8 object-contain" />
    </div>
  );
};

export default Logo;
