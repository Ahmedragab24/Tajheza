"use client";

import { Button } from "@/components/ui/button";
import { LangType } from "@/types/globals";
import { Share2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface IProps {
  productName: string;
  lang: LangType;
}

const ShareButton: React.FC<IProps> = ({ productName, lang }) => {
  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const shareData = {
      title: document.title,
      text:
        lang === "en"
          ? `Check out this ad: ${productName}`
          : `شاهد هذا العرض: ${productName}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success(
          lang === "en" ? "Shared successfully ✅" : "تم المشاركة بنجاح ✅"
        );
      } catch (err) {
        console.error(
          lang === "en" ? "Failed to share:" : "فشل في المشاركة:",
          err
        );
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(
          lang === "en" ? "Copied to clipboard ✅" : "تم النسخ إلى الحافظة ✅"
        );
      } catch (err) {
        console.error(lang === "en" ? "Failed to copy:" : "فشل في النسخ:", err);
      }
    }
  };

  return (
    <Button
      variant={"secondary"}
      size="icon"
      className="rounded-full z-10 relative !w-8 !h-8 md:!w-10 md:!h-10"
      onClick={handleShare}
    >
      <Share2 className="!w-4 !h-4 md:!w-6 md:!h-6 text-primary" />
    </Button>
  );
};

export default ShareButton;
