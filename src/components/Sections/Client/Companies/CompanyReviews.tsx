"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { ReviewType } from "@/types/Companies";
import { LangType } from "@/types/globals";

interface CompanyReviewsProps {
  reviews: ReviewType[];
  rating: number;
  reviewsCount: number;
  onAddReview: () => void;
  lang: LangType;
}

export function CompanyReviews({
  reviews,
  rating,
  reviewsCount,
  onAddReview,
  lang,
}: CompanyReviewsProps) {
  const isArabic = lang === "ar";

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

  return (
    <section className={`py-10 bg-warm-bg `}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className={`flex flex-col gap-4 items-center justify-center mb-12`}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t.title}
              </h2>
              <div className={`flex items-center gap-3 `}>
                <div className="flex items-center gap-1">
                  {renderStars(Math.round(rating))}
                </div>
                <span className="text-2xl font-bold text-foreground">
                  {rating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({reviewsCount} {t.reviewsLabel})
                </span>
              </div>
            </div>
            <Button
              onClick={onAddReview}
              size="lg"
              className="rounded-full gap-2"
            >
              <Plus className="h-5 w-5" />
              {t.addReview}
            </Button>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="p-6 hover:shadow-lg transition-shadow border-2"
              >
                <div className={`flex gap-4 `}>
                  <Avatar className="h-12 w-12 border-2 border-muted">
                    <AvatarImage src={review.user.image || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className={`flex items-start justify-between mb-2`}>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">
                          {review.user.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(review.created_at), {
                            addSuffix: true,
                            locale: isArabic ? ar : enUS,
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed text-pretty">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

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
