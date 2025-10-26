"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LangType } from "@/types/globals";
import { CompanyInfoType, ProductDetailsType } from "@/types/Products";
import { Star } from "lucide-react";
import Link from "next/link";
import { useGetCompanyByIdQuery } from "@/store/services/Companies";
import QuickChatDialog from "@/components/Organisms/Dialogs/QuickChatDialog";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import { MembershipType } from "@/types/Auth/Auth";

interface Props {
  lang: LangType;
  companyInfo: CompanyInfoType;
  product: ProductDetailsType;
  userType: MembershipType;
}

const CompanyInfo = ({ lang, companyInfo, product, userType }: Props) => {
  const isRtl = lang === "ar";
  const { data } = useGetCompanyByIdQuery(companyInfo.company_id);
  const Company = data?.data;
  const { data: userData } = useGetUserInfoQuery();
  const UserInfo = userData?.data?.user;
  const maxStars = 5;
  const rating = Number(companyInfo.rating_average) || 0;

  const renderStars = () => {
    return Array.from({ length: maxStars }, (_, index) => {
      const starNumber = index + 1;
      const isFilled = starNumber <= Math.round(rating);
      const starClasses = `w-4 h-4 transition-colors duration-200 ${
        isFilled
          ? "text-yellow-500 fill-yellow-500"
          : "text-gray-300 fill-gray-100"
      }`;
      return <Star key={index} className={starClasses} aria-hidden="true" />;
    });
  };

  return (
    <div className="border-b pb-4">
      <div className="flex gap-2 max-w-lg">
        <Link
          href={
            userType === "user"
              ? `/client/companies/${companyInfo.company_id}`
              : `/provider/profile`
          }
        >
          <Avatar className="w-12 h-12">
            <AvatarImage src={companyInfo?.logo || "/fallback-logo.png"} />
            <AvatarFallback>
              {companyInfo.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold">
                {isRtl ? "شركة" : "Company"} {companyInfo.name}
              </h4>
              <div className="flex items-center gap-1">
                <span>{rating.toFixed(1)}</span>
                {renderStars()}
              </div>
            </div>

            <div className="mx-8 flex items-center gap-2">
              {userType === "user" && (
                <QuickChatDialog
                  phone={companyInfo.phone}
                  productId={product.id}
                  userId={UserInfo?.id || 0}
                  isText
                >
                  <Image
                    src="/Icons/Chat.svg"
                    alt="Chat"
                    width={40}
                    height={40}
                    className="cursor-pointer hover:opacity-80 transition"
                  />
                </QuickChatDialog>
              )}

              <Link href={`tel:${companyInfo?.phone}`}>
                <Image
                  src="/Icons/Phone.svg"
                  alt="Phone"
                  width={40}
                  height={40}
                  className="cursor-pointer hover:opacity-80 transition"
                />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {Company && Company.ordered_users.length > 0 && (
              <div className="flex -space-x-3">
                {Company?.ordered_users?.slice(0, 3).map((user) => (
                  <Avatar key={user.id} className="border">
                    <AvatarImage src={user.image || "/fallback-avatar.png"} />
                    <AvatarFallback>
                      {user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {Company?.ordered_users?.length > 3 && (
                  <Button
                    className="!w-8 !h-8 rounded-full text-xs"
                    size="icon"
                    variant="secondary"
                  >
                    +{Company.ordered_users.length - 3}
                  </Button>
                )}
              </div>
            )}

            <h6 className="text-sm text-gray-600">
              {isRtl
                ? "عملاء حجزوا من قبل"
                : "Customers who have booked before"}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
