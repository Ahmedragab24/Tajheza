import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description: string;
  image: string;
  classImage?: string;
}

const NotFoundData = ({ title, description, image, classImage }: Props) => {
  return (
    <div className="min-h-[50vh] flex flex-col gap-2 justify-center items-center">
      <div
        className={`relative ${classImage} w-[100px] h-[100px] md:w-[150px] md:h-[150px]`}
      >
        <Image src={image} alt={title} fill />
      </div>

      <h3 className="text-lg md:text-xl font-semibold text-primary">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default NotFoundData;
