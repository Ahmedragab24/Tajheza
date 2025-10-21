"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Home,
  LayoutGrid,
  ClipboardList,
  PlusCircle,
  Building,
  Settings,
  Headphones,
  KeyRound,
  Trash2,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import LogoutBtn from "@/components/Atoms/buttons/LogoutBtn";
import { FaQuestion } from "react-icons/fa";
import { useState } from "react";

export function ProviderSidebar() {
  const pathname = usePathname();
  const lang = useLocale() as LangType;
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  const mainLinks = [
    {
      label: lang === "ar" ? "الصفحة الرئيسية" : "Home",
      href: `/${lang}/provider/home`,
      icon: Home,
    },
    {
      label: lang === "ar" ? "خدماتي" : "My Services",
      href: `/${lang}/provider/my-services`,
      icon: LayoutGrid,
    },
    {
      label: lang === "ar" ? "الطلبات" : "Orders",
      href: `/${lang}/provider/orders`,
      icon: ClipboardList,
    },
    {
      label: lang === "ar" ? "إضافة خدمة جديدة" : "Add New Service",
      href: `/${lang}/provider/add-service`,
      icon: PlusCircle,
    },
    {
      label: lang === "ar" ? "حساب الشركة" : "Company Account",
      href: `/${lang}/provider/profile`,
      icon: Building,
    },
    {
      label: lang === "ar" ? "المحادثات" : "Chats",
      href: `/${lang}/provider/conversations`,
      icon: Settings,
    },
    {
      label: lang === "ar" ? "الإشعارات" : "Notifications",
      href: `/${lang}/provider/notifications`,
      icon: Bell,
    },

    {
      label: lang === "ar" ? "تغيير كلمة المرور" : "Change Password",
      href: `/${lang}/provider/change-password`,
      icon: KeyRound,
    },
    {
      label: lang === "ar" ? "حذف الحساب" : "Delete Account",
      href: `/${lang}/provider/delete-account`,
      icon: Trash2,
    },
  ];

  const importantLinks = [
    {
      label: lang === "ar" ? "الأسئلة المكررة" : "FAQs",
      href: `/${lang}/provider/faqs`,
      icon: FaQuestion,
    },
    {
      label: lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
      href: `/${lang}/provider/privacy-policy`,
      icon: KeyRound,
    },
    {
      label: lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions",
      href: `/${lang}/provider/terms-and-conditions`,
      icon: ClipboardList,
    },
    {
      label: lang === "ar" ? "خدمة العملاء" : "Customer Support",
      href: `/${lang}/provider/customer-service`,
      icon: Headphones,
    },
  ];

  return (
    <Sidebar
      className="pt-22 shadow-xl"
      side={lang === "ar" ? "right" : "left"}
    >
      <SidebarHeader>
        <h2 className="text-center text-lg font-semibold text-primary ">
          {lang === "ar" ? "لوحة التحكم" : "Dashboard"}
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainLinks.map(({ label, href, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild>
                  <Link
                    href={href}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-2 rounded-md font-medium text-gray-700 text-sm transition w-full text-start",
                      (label.includes("حذف") || label.includes("Delete")) &&
                        "!text-red-500",
                      pathname === href
                        ? "text-primary bg-secondary hover:!bg-secondary/80 font-semibold"
                        : "text-gray-700 hover:!bg-secondary"
                    )}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        pathname === href ? "text-primary" : "text-gray-700"
                      } `}
                    />
                    {label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            {/* Collapse Section */}
            <SidebarMenuItem>
              <button
                onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-secondary rounded-md transition"
              >
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4" />
                  {lang === "ar" ? "عن تجهيزة" : "About Tajheza"}
                </div>
                {isCompanyOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : lang === "ar" ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {isCompanyOpen && (
                <div className="mt-2 pl-8 flex flex-col gap-1">
                  {importantLinks.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={clsx(
                        "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition hover:bg-secondary",
                        pathname === href
                          ? "text-primary bg-secondary hover:!bg-secondary/80 font-semibold"
                          : "text-gray-700 hover:!bg-secondary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarMenu className="mb-2 cursor-pointer">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <div className="w-full">
              <LogoutBtn lang={lang} />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      <SidebarFooter className="border-t py-4">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Tajheza
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default ProviderSidebar;
