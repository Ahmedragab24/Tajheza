"use client";

import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const { data } = useGetUserInfoQuery();
  const userInfo = data?.data;

  if (userInfo?.user.type === "provider") return;

  return (
    <footer className="bg-primary font-['Cairo']" style={{ direction: "rtl" }}>
      <div className="bg-secondary text-[#4a2c2a] py-6 px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
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
      </div>

      <div className="container mx-auto py-12 px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-right">
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <img
            src="https://i.ibb.co/9hGLq2Z/tajheza-logo.png"
            alt="Tajheza Logo"
            className="w-20 h-auto mb-4"
          />
          <h4 className="text-lg font-bold text-[#e3dcd5] mb-3">
            متجر تجهيزة الإلكتروني
          </h4>
          <p className="text-[#c5b8ad] text-sm leading-relaxed">
            دعم على مدار 24 ساعة، 7 أيام في الأسبوع
          </p>
          <p className="text-[#c5b8ad] text-sm">966123456789 :الاتصال بالدعم</p>
        </div>

        <div className="lg:col-span-1">
          <h4 className="text-lg font-bold text-[#e3dcd5] mb-6">دليل الشراء</h4>
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
          <h4 className="text-lg font-bold text-[#e3dcd5] mb-6">
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
          <h4 className="text-lg font-bold text-[#e3dcd5] mb-6">تجهيزة</h4>
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

export default Footer;
