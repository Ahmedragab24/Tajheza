"use client";

import React from "react";
import Logo from "../Atoms/images/logo";
import SocialIconsGroup from "../Molecules/IconsGroup/SocialIconsGroup";

const ProviderFooter = () => {
  return (
    <footer className="bg-primary font-['Cairo']" style={{ direction: "rtl" }}>
      <div className="container mx-auto py-12 px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-right">
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <h4 className="text-lg font-bold text-[#e3dcd5] mb-3">
            متجر تجهيزة الإلكتروني
          </h4>
          <p className="text-[#c5b8ad] text-xs leading-relaxed">
            دعم على مدار 24 ساعة، 7 أيام في الأسبوع
          </p>
          <p className="text-[#c5b8ad] text-xs">966123456789 :الاتصال بالدعم</p>

          <Logo isBg size="lg" />
          <SocialIconsGroup />
        </div>

        <div className="lg:col-span-1">
          <h4 className="w-fit border-b text-lg font-bold text-[#e3dcd5] mb-6">
            دليل الشراء
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                دليل تسجيل الطلب
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                طرق الدفع
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                كيفية شحن الطلبات
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                شروط إرجاع المنتج
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-1">
          <h4 className="w-fit border-b text-lg font-bold text-[#e3dcd5]  mb-6">
            خدمات العملاء
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                الأسئلة الشائعة
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                سياسة الخصوصية
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                تقديم شكوى
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                ضمان المنتجات
              </a>
            </li>
          </ul>
        </div>

        {/* العمود الرابع: تجهيزة */}
        <div className="lg:col-span-1">
          <h4 className="w-fit border-b text-lg font-bold text-[#e3dcd5] mb-6">
            تجهيزة
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                عروض ومحصولات
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                فرصة التعاون
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                اتصل بنا
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#c5b8ad] hover:text-white transition-colors"
              >
                خريطة الموقع
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* الجزء السفلي - الحقوق */}
      <div className="border-t border-[#5a3a38] py-6">
        <p className="text-center text-sm text-[#c5b8ad]">
          جميع حقوق هذا الموقع محفوظة لمتجر تجهيزة الإلكتروني
        </p>
      </div>
    </footer>
  );
};

export default ProviderFooter;
