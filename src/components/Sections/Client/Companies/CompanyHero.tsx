"use client";

import { Star, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CompanyDetailsType } from "@/types/Companies";
import Image from "next/image";
import { LangType } from "@/types/globals";
import ShareButton from "@/components/Atoms/buttons/ShareBtn";

interface CompanyHeroProps {
  company: CompanyDetailsType;
  lang: LangType;
}

export function CompanyHero({ company, lang }: CompanyHeroProps) {
  const isRtl = lang === "ar";

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            company.background ||
            "/placeholder.svg?height=600&width=1920&query=elegant+business+background"
          }
          alt={company.name}
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
                {company.owner.is_online && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                    {isRtl ? "متصل الأن" : "Online"}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <ShareButton lang={lang} productName={company.name} />
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
                {company.name}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-semibold text-lg">
                    {company.rating.toFixed(1)}
                  </span>
                  <span className="text-white/80 text-sm">
                    ({company.reviews_count} reviews)
                  </span>
                </div>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {company.address}
                </Badge>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-white/30">
                    <AvatarImage src={company.owner.image || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {company.owner.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Owner</p>
                    <p className="text-white text-xl font-semibold">
                      {company.owner.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" className="rounded-full" asChild>
                    <a href={`tel:${company.owner.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      {isRtl ? "أتصال" : "Call"}
                    </a>
                  </Button>
                  <Button variant="secondary" className="rounded-full" asChild>
                    <a href={`mailto:${company.owner.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      {isRtl ? "الإيميل" : "Email"}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
