import Image from "next/image";
import React from "react";

interface Props {
  size?: number;
}

const RiyalIcon = ({ size = 20 }: Props) => {
  return (
    <Image src="/Icons/Riyal.svg" alt="Riyal" width={size} height={size} />
  );
};

export default RiyalIcon;
