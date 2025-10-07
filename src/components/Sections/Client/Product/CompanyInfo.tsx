import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LangType } from "@/types/globals";
import { CompanyInfoType } from "@/types/Products";
import { Star } from "lucide-react";
import Link from "next/link";

interface Props {
  lang: LangType;
  companyInfo: CompanyInfoType;
}

const CompanyInfo = ({ lang, companyInfo }: Props) => {
  const isRtl = lang === "ar";
  const maxStars = 5;
  const rating = companyInfo.rating_average || 0;

  const renderStars = () => {
    return Array.from({ length: maxStars }, (_, index) => {
      const starNumber = index + 1;

      const isFilled = starNumber <= rating;
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
        <Link href={`/client/home/companies/${companyInfo.company_id}`}>
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex flex-col gap-1">
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
              <Image src="/Icons/Chat.svg" alt="chat" width={50} height={50} />
              <Image src="/Icons/Phone.svg" alt="chat" width={50} height={50} />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex -space-x-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button className="!w-8 !h-8 rounded-full text-xs" size="icon">
                +3
              </Button>
            </div>
            <h6 className="text-sm text-gray-600">
              {isRtl ? "عملاء حجزو من قبل" : "Customers who have booked before"}
            </h6>
            <h4 className="text-primary font-semibold">
              {isRtl ? "عرض الجميع / دعوة" : "View All / Invite"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
