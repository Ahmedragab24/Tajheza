"use client";

import { Loader } from "lucide-react";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";

interface IProps {
  className?: string;
  title?: string;
}

const LoaderSpan = ({ className, title }: IProps) => {
  const language = useLocale();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {title ? (
        <p className="text-sm md:text-lg">{title}</p>
      ) : (
        <p className="text-sm md:text-lg">
          {language === "en" ? "...Loading" : "جاري التحميل..."}
        </p>
      )}

      <Loader className={`w-4 h-4 md:w-8 md:h-8 animate-spin text-primary`} />
    </div>
  );
};

export default LoaderSpan;
