"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  type?: "icon" | "dropDown";
  className?: string;
}

const ToggleLanguage = ({ type = "icon", className }: Props) => {
  const router = useRouter();
  const lang = useLocale();
  const pathname = usePathname();
  const t = useTranslations();

  const switchLanguage = (locale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  return (
    <>
      {type === "icon" ? (
        <DropdownMenu dir={lang === "ar" ? "rtl" : "ltr"}>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild className="group">
                  <Button variant={"none"} aria-label="ToggleLanguage">
                    <Globe
                      strokeWidth={1.5}
                      className="duration-400 group-hover:text-primary"
                    />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{lang === "ar" ? "اللغة" : "Language"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => switchLanguage("ar")}>
              {t("ToggleLanguage.ar")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchLanguage("en")}>
              {t("ToggleLanguage.en")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Select value={lang} onValueChange={(value) => switchLanguage(value)}>
          <SelectTrigger className={`w-full ${className || ""}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar">{t("ToggleLanguage.ar")}</SelectItem>
            <SelectItem value="en">{t("ToggleLanguage.en")}</SelectItem>
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default ToggleLanguage;
