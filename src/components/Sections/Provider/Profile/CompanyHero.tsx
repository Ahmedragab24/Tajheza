"use client";

import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { LangType } from "@/types/globals";
import ShareButton from "@/components/Atoms/buttons/ShareBtn";
import {
  ProviderCompanyInfoForUpdateType,
  ProviderCompanyInfoType,
} from "@/types/ProviderCompany";
import EditCompanyProfileDialog from "@/components/Organisms/Dialogs/EditCompanyProfileDialog";

interface CompanyHeroProps {
  company: ProviderCompanyInfoForUpdateType | undefined;
  info: ProviderCompanyInfoType | undefined;
  lang: LangType;
}

export function CompanyHero({ company, lang, info }: CompanyHeroProps) {
  const isRtl = lang === "ar";

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            company?.background ||
            "/placeholder.svg?height=600&width=1920&query=elegant+business+background"
          }
          alt={company?.name || ""}
          fill
          quality={100}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Logo and Actions */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-card shadow-2xl">
                  <Image
                    src={
                      company?.logo ||
                      "/placeholder.svg?height=120&width=120&query=company+logo"
                    }
                    alt={company?.name || ""}
                    fill
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {info?.owner.is_online && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                    {isRtl ? "متصل الأن" : "Online"}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShareButton lang={lang} productName={company?.name || ""} />
              <EditCompanyProfileDialog lang={lang} companyInfo={company} />
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
                {company?.name}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {company?.city}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
