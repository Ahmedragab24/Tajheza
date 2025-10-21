"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { formatDistanceToNow, isValid } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { LangType } from "@/types/globals";
import { useGetCompanyReviewsQuery } from "@/store/services/Provider/Company";

interface CompanyReviewsProps {
  lang: LangType;
}

export function CompanyReviews({ lang }: CompanyReviewsProps) {
  const isArabic = lang === "ar";
  const { data } = useGetCompanyReviewsQuery();
  const reviews = data?.data || [];

  const t = {
    title: isArabic ? "آراء العملاء" : "Customer Reviews",
    addReview: isArabic ? "أضف تقييمك" : "Add Review",
    noReviews: isArabic
      ? "لا توجد تقييمات بعد، كن أول من يشارك تجربته!"
      : "No reviews yet. Be the first to share your experience!",
    reviewsLabel: isArabic ? "تقييم" : "reviews",
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  const formatDate = (dateString: string) => {
    try {
      // نضيف T علشان الصيغة تبقى ISO سليمة
      const safeDate = new Date(
        dateString.includes("T") ? dateString : dateString.replace(" ", "T")
      );
      if (!isValid(safeDate))
        return isArabic ? "تاريخ غير معروف" : "Unknown date";

      return formatDistanceToNow(safeDate, {
        addSuffix: true,
        locale: isArabic ? ar : enUS,
      });
    } catch {
      return isArabic ? "تاريخ غير معروف" : "Unknown date";
    }
  };

  return (
    <section className="py-10 bg-warm-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center justify-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              {t.title}
            </h2>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card
                key={review?.id}
                className="bg-secondary/30 p-6 hover:shadow-lg transition-shadow border-2"
              >
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12 border-2 border-muted">
                    <AvatarImage src={review?.user?.image || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">
                          {review?.user?.name ||
                            (isArabic ? "مستخدم مجهول" : "Anonymous")}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(review?.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(Number(review?.rating) || 0)}
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed text-pretty">
                      {review?.comment || ""}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* No Reviews */}
          {reviews.length === 0 && (
            <Card className="p-12 text-center border-2 border-dashed">
              <p className="text-muted-foreground text-lg">{t.noReviews}</p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
