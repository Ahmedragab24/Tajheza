"use client";

import {
  BookOpenIcon,
  CircleUserRound,
  Layers2Icon,
  PinIcon,
  UserPenIcon,
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

  return (
    <DropdownMenu dir={lang === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={UserInfo?.image} alt="Profile image" />
            <AvatarFallback>{UserInfo?.name.slice(0, 2)}</AvatarFallback>
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
        <DropdownMenuGroup>
          <Link href={"/client/profile"}>
            <DropdownMenuItem className="cursor-pointer">
              <CircleUserRound
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>{lang === "ar" ? "الملف الشخصي" : "Profile"}</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PinIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <LogoutBtn lang={lang} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
