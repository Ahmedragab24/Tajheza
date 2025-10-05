import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description?: string;
  iconPath?: string;
}

const SectionTitle = ({ title, description, iconPath }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {iconPath && <Image src={iconPath} alt="icon" width={30} height={30} />}
        <h3 className="text-primary font-semibold text-xl md:text-3xl">
          {title}
        </h3>
      </div>
      {description && (
        <p className="text-xs md:text-sm text-gray-700">{description}</p>
      )}
    </div>
  );
};

export default SectionTitle;
