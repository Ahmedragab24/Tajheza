"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { LangType } from "@/types/globals";
import { useState } from "react";
import AddPackageForm from "../Forms/AddPackageForm";
import { PackageType } from "@/types/Packages";

interface Props {
  packageData: PackageType;
  lang: LangType;
}

const UpdatePackageDialog = ({ packageData, lang }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          <Edit2 className="w-4 h-4 mr-1" />
          {lang === "ar" ? "تعديل" : "Edit"}
        </Button>
      </DialogTrigger>

      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="!max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <AddPackageForm setOpen={setOpen} packageData={packageData} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePackageDialog;
