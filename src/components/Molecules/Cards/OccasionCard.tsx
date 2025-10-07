import { Card } from "@/components/ui/card";
import { ServiceType } from "@/types/Services";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  occasion: ServiceType;
}

const OccasionCard = ({ occasion }: Props) => {
  return (
    <Link href={`/client/home/services#${occasion.id}`}>
      <Card className="border-none shadow-none flex flex-col justify-center items-center gap-2 cursor-pointer duration-300 transition-all group p-2">
        <div className="relative w-20 h-20 md:w-30 md:h-30 rounded-full overflow-hidden border-2 group-hover:border-secondary group-hover:shadow-lg">
          <Image
            src={occasion.image}
            alt={occasion.name}
            fill
            className="object-cover group-hover:scale-105 duration-300"
          />
        </div>

        <h4 className="text-lg text-gray-700 group-hover:scale-105 group-hover:text-primary duration-300">
          {occasion.name}
        </h4>
      </Card>
    </Link>
  );
};

export default OccasionCard;
