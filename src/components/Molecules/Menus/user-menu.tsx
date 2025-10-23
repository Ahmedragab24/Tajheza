"use client";

import {
  BookOpenIcon,
  CircleUserRound,
  Layers2Icon,
  Building2Icon,
  ShieldCheckIcon,
  FileTextIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import Link from "next/link";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import LogoutBtn from "@/components/Atoms/buttons/LogoutBtn";

export default function UserMenu() {
  const lang = useLocale() as LangType;
  const { data } = useGetUserInfoQuery();
  const UserInfo = data?.data.user;

  console.log("UserInfo", UserInfo);

  const menuLinks = [
    {
      href: `/${lang}/client/profile`,
      labelAr: "الملف الشخصي",
      labelEn: "Profile",
      icon: CircleUserRound,
    },
    {
      href: `/${lang}/client/services`,
      labelAr: "الخدمات",
      labelEn: "Services",
      icon: Layers2Icon,
    },
    {
      href: `/${lang}/client/companies`,
      labelAr: "الشركات",
      labelEn: "Companies",
      icon: Building2Icon,
    },
    {
      href: `/${lang}/client/faqs`,
      labelAr: "الأسئلة الشائعة",
      labelEn: "FAQ",
      icon: BookOpenIcon,
    },
    {
      href: `/${lang}/client/privacy-policy`,
      labelAr: "سياسة الخصوصية",
      labelEn: "Privacy Policy",
      icon: ShieldCheckIcon,
    },
    {
      href: `/${lang}/client/terms-and-conditions`,
      labelAr: "الشروط والأحكام",
      labelEn: "Terms & Conditions",
      icon: FileTextIcon,
    },
  ];

  return (
    <DropdownMenu dir={lang === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={UserInfo?.image} alt="Profile image" />
            <AvatarFallback>{UserInfo?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {UserInfo?.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {UserInfo?.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* الروابط */}
        <DropdownMenuGroup>
          {menuLinks.map((item, index) => (
            <Link key={index} href={item.href}>
              <DropdownMenuItem className="cursor-pointer">
                <item.icon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span className="ml-2">
                  {lang === "ar" ? item.labelAr : item.labelEn}
                </span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <LogoutBtn lang={lang} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
