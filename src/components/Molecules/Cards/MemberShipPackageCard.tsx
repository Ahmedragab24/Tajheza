"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LangType } from "@/types/globals";
import { CheckCircle2, Crown } from "lucide-react";
import React from "react";
import { MembershipPackageType } from "@/types/MembershipPackedge";
import RiyalIcon from "@/components/Atoms/Icons/RiyalIcon";
import Image from "next/image";

interface Props {
  lang: LangType;
  package: MembershipPackageType;
}

const MemberShipPackageCard = ({ lang, package: pkg }: Props) => {
  return (
    <Card
      className={`relative border-2 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden ${
        pkg.the_best
          ? "border-primary ring-2 ring-primary/30"
          : "border-gray-200"
      }`}
    >
      <Image
        src={pkg.image || ""}
        alt={pkg.name}
        fill
        className="object-cover absolute inset-0 z-0"
      />

      <div className="absolute inset-0 bg-black/40 z-10" />

      <CardContent className="relative z-20 p-6 flex flex-col items-center gap-4 text-center">
        {pkg.the_best && (
          <div className="flex items-center gap-1 absolute -top-2 md:top-0 left-3 bg-primary text-orange-200 text-sm font-medium px-3 py-1 rounded-full">
            <span>{lang === "ar" ? "الأفضل" : "Best"}</span>
            <Crown className="w-4 h-4 " />
          </div>
        )}

        <h2 className="text-xl font-semibold text-white">{pkg.name}</h2>

        <div className="flex items-center justify-center gap-1 bg-white text-primary font-bold text-lg p-3 rounded-full border border-white/50">
          {pkg.price > 0 ? (
            <>
              <span>{pkg.price}</span>
              <RiyalIcon className="w-4 h-4" />
              <span>/ {lang === "ar" ? "شهر" : "month"}</span>
            </>
          ) : (
            <span>{lang === "ar" ? "مجانية" : "Free"}</span>
          )}
        </div>
        <p className="text-gray-200 text-sm">
          {lang === "ar" ? "يتم إصدار الفاتورة سنويًا" : "Billed annually"}
        </p>

        <ul className="w-full text-start mt-4 space-y-2">
          {pkg.features.map((feature) => (
            <li
              key={feature.id}
              className="flex items-center gap-2 text-sm text-white drop-shadow-lg"
            >
              <CheckCircle2 className="text-green-500 w-4 h-4" />
              <span>{feature.name}</span>
            </li>
          ))}
        </ul>

        <Button variant={"outline"} className={`mt-6 w-full rounded-full `}>
          {lang === "ar" ? "ابدأ الآن" : "Start Now"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MemberShipPackageCard;
