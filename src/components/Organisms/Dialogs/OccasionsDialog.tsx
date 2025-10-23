"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const OccasionsDialog = ({ children }: Props) => {
  const lang = useLocale() as LangType;
  const isRtl = lang === "ar";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        dir={isRtl ? "rtl" : "ltr"}
        className="!max-w-md md:!max-w-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 text-center"
      >
        <DialogHeader>
          <DialogTitle className="text-base text-center md:text-lg font-semibold text-gray-900 dark:text-white">
            {isRtl
              ? "عليك تنزيل التطبيق لكي تستطيع إنشاء مناسبة"
              : "You need to download the app to create an event"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center gap-4 mt-4">
          {/* App Store */}
          <Link
            href="https://apps.apple.com/eg/app/%D8%B9%D9%82%D8%B1%D9%87%D8%A7-aqrha/id6743926325?l=ar"
            target="_blank"
            className="flex items-center justify-between w-[150px] md:w-[180px] gap-3 py-2 px-4 bg-black dark:bg-gray-800 rounded-xl hover:scale-105 hover:opacity-90 transition-transform duration-300"
          >
            <div className="flex flex-col text-start">
              <p className="text-gray-400 text-[10px] md:text-xs leading-none">
                {isRtl ? "احصل عليه من" : "Get it on"}
              </p>
              <h3 className="text-white text-xs md:text-sm font-semibold">
                App Store
              </h3>
            </div>
            <Image
              src="/Logos/ic_round-apple.png"
              alt="App Store"
              width={50}
              height={50}
            />
          </Link>

          {/* Google Play */}
          <Link
            href="https://play.google.com/store/apps/details?id=com.aqerha.computing"
            target="_blank"
            className="flex items-center justify-between w-[150px] md:w-[180px] gap-3 py-2 px-4 bg-black dark:bg-gray-800 rounded-xl hover:scale-105 hover:opacity-90 transition-transform duration-300"
          >
            <div className="flex flex-col text-start">
              <p className="text-gray-400 text-[10px] md:text-xs leading-none">
                {isRtl ? "احصل عليه من" : "Get it on"}
              </p>
              <h3 className="text-white text-xs md:text-sm font-semibold">
                Google Play
              </h3>
            </div>
            <Image
              src="/Logos/google_play.png"
              alt="Google Play"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OccasionsDialog;
