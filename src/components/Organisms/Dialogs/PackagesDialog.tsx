"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LangType } from "@/types/globals";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PackageType } from "@/types/Packages";
import PackagesCard from "@/components/Molecules/Cards/PackagesCard";

interface Props {
  Packages: PackageType[];
  lang: LangType;
}

const PackagesDialog = ({ Packages, lang }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit px-20">
          {lang === "ar" ? "اكتشف الباقات" : "Discover the packages"}
        </Button>
      </DialogTrigger>

      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="!max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="grid grid-cols-2 gap-4">
          {Packages.map((item) => (
            <PackagesCard key={item.id} Package={item} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackagesDialog;
