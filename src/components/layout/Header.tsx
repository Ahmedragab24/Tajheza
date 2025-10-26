"use client";

import Logo from "@/components/Atoms/images/logo";
import NotificationMenu from "@/components/Molecules/Menus/notification-menu";
import UserMenu from "@/components/Molecules/Menus/user-menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchInput from "../Atoms/inputs/SearchInput";
import ToggleLanguage from "../Molecules/Toggles/ToggleLanguage";
import MenuLinks from "../Molecules/Menus/MenuLinks";
import RegisterDialog from "../Organisms/Dialogs/RegisterDialog";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function Header() {
  const lang = useLocale();
  const isLogin = getAuthTokenClient();
  const { data } = useGetUserInfoQuery();
  const userInfo = data?.data;

  return (
    <header className="bg-white shadow-lg Container py-2 sticky top-0 z-50">
      <div className="flex h-15 md:h-18 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-primary hover:text-primary/90">
              <Logo isBg={false} />
            </Link>
          </div>
          {/* Mobile menu trigger */}
          {userInfo?.user.type !== "provider" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <MenuLinks type="mobile" />
              </PopoverContent>
            </Popover>
          )}
        </div>
        {/* Middle area */}
        {userInfo?.user.type !== "provider" ? (
          <div className="hidden md:flex items-center justify-between gap-4 bg-secondary p-2 rounded-full w-2xl">
            {/* Navigation menu */}
            <MenuLinks type="desktop" />

            {/* Search form */}
            <SearchInput />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs md:text-lg">
            <h4>{lang === "ar" ? "👋 مرحبا :" : "👋 welcome :"}</h4>
            <h4 className="text-primary font-bold underline">
              {userInfo?.user?.name}
            </h4>
          </div>
        )}
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Language */}
          <ToggleLanguage />
          {/* Notification */}
          <NotificationMenu />
          {/* User menu Or Register */}
          {isLogin ? (
            userInfo?.user.type !== "provider" && <UserMenu />
          ) : (
            <RegisterDialog />
          )}
        </div>
      </div>
    </header>
  );
}
