"use client";

import React from "react";
import Logo from "../Atoms/images/logo";
import SocialIconsGroup from "../Molecules/IconsGroup/SocialIconsGroup";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("ProviderFooter");
  const lang = useLocale();

  const dashboardLinks = [
    { id: 1, label: t("dashboard.home"), path: `/${lang}/provider/home` },
    {
      id: 2,
      label: t("dashboard.myServices"),
      path: `/${lang}/provider/my-services`,
    },
    { id: 3, label: t("dashboard.orders"), path: `/${lang}/provider/orders` },
    {
      id: 4,
      label: t("dashboard.addService"),
      path: `/${lang}/provider/add-service`,
    },
  ];

  const companyLinks = [
    { id: 1, label: t("company.profile"), path: `/${lang}/provider/profile` },
    {
      id: 2,
      label: t("company.conversations"),
      path: `/${lang}/provider/conversations`,
    },
    {
      id: 3,
      label: t("company.notifications"),
      path: `/${lang}/provider/notifications`,
    },
    {
      id: 4,
      label: t("company.changePassword"),
      path: `/${lang}/provider/change-password`,
    },
  ];

  const importantLinks = [
    { id: 1, label: t("important.faq"), path: `/${lang}/provider/faqs` },
    {
      id: 2,
      label: t("important.privacy"),
      path: `/${lang}/provider/privacy-policy`,
    },
    {
      id: 3,
      label: t("important.terms"),
      path: `/${lang}/provider/terms-and-conditions`,
    },
    {
      id: 4,
      label: t("important.customerService"),
      path: `/${lang}/provider/customer-service`,
    },
  ];

  return (
    <footer className="bg-primary font-['Cairo']" style={{ direction: "rtl" }}>
      <div className="Container py-12 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-start">
        {/* Logo + Info */}
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <h4 className="text-sm md:text-lg font-bold text-[#e3dcd5]">
            {t("title")}
          </h4>
          <p className="text-[#c5b8ad] text-xs leading-relaxed">
            {t("support")}
          </p>

          <Logo isBg size="lg" />
          <SocialIconsGroup />
        </div>

        {/* Dashboard Links */}
        <div className="lg:col-span-1">
          <h4 className="w-fit mx-auto md:mx-0 border-b text-sm md:text-lg font-bold text-[#e3dcd5] mb-6">
            {t("sections.dashboard")}
          </h4>
          <ul className="space-y-2 md:space-y-4">
            {dashboardLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="text-[#c5b8ad] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div className="lg:col-span-1">
          <h4 className="w-fit mx-auto md:mx-0 border-b text-sm md:text-lg font-bold text-[#e3dcd5] mb-6">
            {t("sections.company")}
          </h4>
          <ul className="space-y-2 md:space-y-4">
            {companyLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="text-[#c5b8ad] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Links */}
        <div className="lg:col-span-1">
          <h4 className="w-fit mx-auto md:mx-0 border-b text-sm md:text-lg font-bold text-[#e3dcd5] mb-6">
            {t("sections.support")}
          </h4>
          <ul className="space-y-2 md:space-y-4">
            {importantLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="text-[#c5b8ad] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary/20 py-6 flex flex-col justify-center items-center">
        <p className="text-xs md:text-sm text-[#c5b8ad]">{t("copyright")}</p>
        <p className="text-[#c5b8ad] hover:text-secondary text-xs md:text-sm">
          {lang === "ar"
            ? "تم التصميم والتطوير بواسطة"
            : "Designed and developed by"}
          <Link
            href="https://computinggate.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-2 transition-all duration-200 mx-1"
          >
            {lang === "ar" ? "شركة بوابة الحوسبة" : "Computing Gate Company"}
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
