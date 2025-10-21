"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { LangType } from "@/types/globals";
import { useState } from "react";
import { ProviderCompanyInfoForUpdateType } from "@/types/ProviderCompany";
import CompanyProfileForm from "../Forms/CompanyProfileForm";

interface Props {
  companyInfo: ProviderCompanyInfoForUpdateType | undefined;
  lang: LangType;
}

const EditCompanyProfileDialog = ({ companyInfo, lang }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          size="icon"
          className="rounded-full z-10 relative !w-8 !h-8 md:!w-10 md:!h-10"
        >
          <Edit2 className="!w-4 !h-4 md:!w-6 md:!h-6 text-primary" />
        </Button>
      </DialogTrigger>

      <DialogContent
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="!max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <CompanyProfileForm setOpen={setOpen} companyInfo={companyInfo} />
      </DialogContent>
    </Dialog>
  );
};

export default EditCompanyProfileDialog;
