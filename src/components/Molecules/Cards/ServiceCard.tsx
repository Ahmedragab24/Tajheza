"use client";

import { Card } from "@/components/ui/card";
import { setSelectedServiceId } from "@/store/features/servicesSlice";
import { ServiceType } from "@/types/Services";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

interface Props {
  service: ServiceType;
}

const ServiceCard = ({ service }: Props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedServiceId(service.id));
  };

  return (
    <Link href="/client/services" onClick={handleClick}>
      <Card className="overflow-hidden flex flex-col justify-center items-center gap-2 hover:!border-primary hover:shadow-xl hover:bg-secondary/20 cursor-pointer duration-300 transition-all group p-2">
        <div className="relative w-20 h-20 md:w-30 md:h-30 rounded-full overflow-hidden border-2 group-hover:border-secondary">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-105 duration-300"
          />
        </div>

        <h4 className="text-lg text-gray-700 group-hover:scale-105 group-hover:text-primary duration-300">
          {service.name}
        </h4>
      </Card>
    </Link>
  );
};

export default ServiceCard;
