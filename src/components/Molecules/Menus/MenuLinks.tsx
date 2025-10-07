"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

interface Props {
  type: "mobile" | "desktop";
}

const MenuLinks = ({ type }: Props) => {
  const t = useTranslations("Navigation");
  const lang = useLocale();
  const isRtl = lang === "ar";

  const navigationLinks = [
    { href: "/", label: t("home"), active: true },
    { href: "#", label: t("services") },
    { href: "/client/home/occasions", label: t("Occasions") },
  ];

  const isDesktop = type === "desktop";

  return (
    <NavigationMenu
      className={isDesktop ? "" : "max-w-none *:w-full"}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <NavigationMenuList
        className={
          isDesktop ? "gap-2" : "flex-col items-start gap-0 md:gap-2 w-full"
        }
      >
        {navigationLinks.map((link, index) => (
          <NavigationMenuItem key={index} className={isDesktop ? "" : "w-full"}>
            <NavigationMenuLink
              href={link.href}
              active={link.active}
              className={`text-md ${
                isDesktop
                  ? "text-muted-foreground hover:text-primary py-1.5 font-medium rounded-full"
                  : "py-1.5"
              }`}
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuLinks;
