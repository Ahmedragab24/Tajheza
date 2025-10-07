import Image from "next/image";
import React from "react";

interface Props {
  size?: number;
  className?: string;
}

const RiyalIcon = ({ size = 20, className }: Props) => {
  return (
    <Image
      src="/Icons/Riyal.svg"
      alt="Riyal"
      width={size}
      height={size}
      className={`${className}`}
    />
  );
};

export default RiyalIcon;
