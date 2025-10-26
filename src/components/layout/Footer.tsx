"use client";

import React from "react";
import Logo from "../Atoms/images/logo";
import SocialIconsGroup from "../Molecules/IconsGroup/SocialIconsGroup";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";

const ProviderFooter = () => {
  const t = useTranslations("Footer");
  const lang = useLocale();
  const { data } = useGetUserInfoQuery();
  const userInfo = data?.data;

  const dashboardLinks = [
    { id: 1, label: t("dashboard.home"), path: `/${lang}/client` },
    {
      id: 2,
      label: t("dashboard.Services"),
      path: `/${lang}/client/services`,
    },
    {
      id: 3,
      label: t("dashboard.Occasions"),
      path: `/${lang}/client/occasions`,
    },
    {
      id: 4,
      label: t("dashboard.Companies"),
      path: `/${lang}/client/companies`,
    },
  ];

  const companyLinks = [
    {
      id: 1,
      label: t("company.MyFavorites"),
      path: `/${lang}/client/profile`,
    },
    {
      id: 2,
      label: t("company.Conversations"),
      path: `/${lang}/client/profile`,
    },
    {
      id: 3,
      label: t("company.Notifications"),
      path: `/${lang}/client/profile`,
    },
    {
      id: 4,
      label: t("company.changePassword"),
      path: `/${lang}/client/profile`,
    },
  ];

  const importantLinks = [
    { id: 1, label: t("important.faq"), path: `/${lang}/client/faqs` },
    {
      id: 2,
      label: t("important.privacy"),
      path: `/${lang}/client/privacy-policy`,
    },
    {
      id: 3,
      label: t("important.terms"),
      path: `/${lang}/client/terms-and-conditions`,
    },
    {
      id: 4,
      label: t("important.customerService"),
      path: `/${lang}/client/profile`,
    },
  ];

  if (userInfo?.user.type === "provider") return;

  return (
    <footer
      className="bg-primary font-['Cairo']"
      style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
    >
      {/* <div className="bg-secondary text-[#4a2c2a] py-6 px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-right">
          <h3 className="font-semibold text-base mb-4">
            تابعونا على وسائل التواصل الاجتماعي
          </h3>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              aria-label="Instagram"
              className="text-2xl text-[#4a2c2a] hover:text-[#8c5b5a] transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-2xl text-[#4a2c2a] hover:text-[#8c5b5a] transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Pinterest"
              className="text-2xl text-[#4a2c2a] hover:text-[#8c5b5a] transition-colors"
            >
              <FaPinterestP />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-2xl text-[#4a2c2a] hover:text-[#8c5b5a] transition-colors"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="w-full md:w-auto text-center md:text-right">
          <h3 className="font-semibold text-base mb-4">
            اذا إحتجت إلى تجهيزة بالبحث عن خدمتك
          </h3>
          <div className="flex w-full max-w-md mx-auto md:mx-0">
            <button
              type="submit"
              className="bg-[#4a2c2a] text-white font-semibold py-3 px-6 rounded-l-md hover:bg-[#603836] transition-colors"
            >
              بحث
            </button>
            <input
              type="text"
              placeholder="ما الذي تبحث عنه لمناسبتك؟"
              className="w-full py-3 px-4 text-right rounded-r-md border-none outline-none"
            />
          </div>
        </div>
      </div> */}

      <div className="Container mx-auto py-12 grid  grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-start">
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

        {/* WebsiteDirectory Links */}
        <div className="lg:col-span-1">
          <h4 className="w-fit mx-auto md:mx-0 border-b text-sm md:text-lg font-bold text-[#e3dcd5] mb-6">
            {t("sections.WebsiteDirectory")}
          </h4>
          <ul className="space-y-2 md:space-y-4">
            {dashboardLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="text-[#c5b8ad] hover:text-white transition-colors text-xs md:text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile */}
        <div className="lg:col-span-1">
          <h4 className="w-fit mx-auto md:mx-0 border-b text-sm md:text-lg font-bold text-[#e3dcd5] mb-6">
            {t("sections.Profile")}
          </h4>
          <ul className="space-y-2 md:space-y-4">
            {companyLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="text-[#c5b8ad] hover:text-white transition-colors text-xs md:text-sm"
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
                  className="text-[#c5b8ad] hover:text-white transition-colors text-xs md:text-sm"
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

export default ProviderFooter;
