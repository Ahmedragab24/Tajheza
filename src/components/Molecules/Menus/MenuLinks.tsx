"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx";

interface Props {
  type: "mobile" | "desktop";
}

const MenuLinks = ({ type }: Props) => {
  const t = useTranslations("Navigation");
  const lang = useLocale();
  const pathname = usePathname();
  const isRtl = lang === "ar";

  const navigationLinks = [
    { href: `/${lang}/client`, label: t("home") },
    { href: `/${lang}/client/services`, label: t("services") },
    { href: `/${lang}/client/profile`, label: t("profile") },
  ];

  const isDesktop = type === "desktop";

  return (
    <NavigationMenu
      className={isDesktop ? "w-full" : "max-w-none"}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <NavigationMenuList
        className={
          isDesktop ? "gap-2" : "flex-col items-start gap-0 md:gap-2 w-full"
        }
      >
        {navigationLinks.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <NavigationMenuItem
              key={index}
              className={isDesktop ? "" : "w-full"}
            >
              <NavigationMenuLink
                href={link.href}
                className={clsx(
                  "text-md py-1.5 font-medium rounded-full transition-colors",
                  isDesktop
                    ? "text-muted-foreground hover:text-primary px-3"
                    : "py-1.5 px-2 block w-full",
                  isActive &&
                    (isDesktop
                      ? "text-primary font-bold bg-white"
                      : "text-primary font-bold rounded-sm")
                )}
              >
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuLinks;
