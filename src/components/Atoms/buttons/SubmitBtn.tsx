"use client";

import { Loader } from "lucide-react";
import { Button } from "../../ui/button";
import { useLocale } from "next-intl";

interface SubmitBtnProps {
  title: string;
  disabled?: boolean;
  className?: string;
  loading: boolean;
}

const SubmitBtn = ({ title, disabled, loading, className }: SubmitBtnProps) => {
  const lang = useLocale();

  return (
    <Button
      className={`w-full h-11 ${className}`}
      type="submit"
      disabled={disabled}
    >
      {loading ? (
        <div className={`flex items-center gap-2 ${className}`}>
          <p className="text-sm md:text-lg">
            {lang === "en" ? "...Loading" : "جاري التحميل..."}
          </p>

          <Loader className={`w-4 h-4 md:w-8 md:h-8 animate-spin text-white`} />
        </div>
      ) : (
        <span className="text-white">{title}</span>
      )}
    </Button>
  );
};

export default SubmitBtn;
