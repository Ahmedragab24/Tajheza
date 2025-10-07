"use client";

import type React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { LangType } from "@/types/globals";
import { useStoreCompanyReviewMutation } from "@/store/services/Companies";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import { toast } from "sonner";
import { getAuthTokenClient } from "@/lib/auth/auth-client";

interface AddReviewFormProps {
  companyId: number;
  onClose: () => void;
  lang: LangType;
}

export function AddReviewForm({
  companyId,
  onClose,
  lang,
}: AddReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [storeReview, { isLoading }] = useStoreCompanyReviewMutation();
  const { data } = useGetUserInfoQuery();
  const userData = data?.data?.user;
  const token = getAuthTokenClient();

  const isArabic = lang === "ar";

  const t = {
    addTitle: isArabic ? "أضف تقييمك" : "Add Your Review",
    addDesc: isArabic
      ? "شاركنا تجربتك مع هذه الشركة"
      : "Share your experience with this company",
    ratingLabel: isArabic ? "تقييمك" : "Your Rating",
    commentLabel: isArabic ? "مراجعتك" : "Your Review",
    placeholder: isArabic
      ? "حدثنا عن تجربتك..."
      : "Tell us about your experience...",
    submit: isArabic ? "إرسال التقييم" : "Submit Review",
    cancel: isArabic ? "إلغاء" : "Cancel",
    success: isArabic
      ? "تم إضافة تقييمك بنجاح!"
      : "Your review has been added successfully!",
    failed: isArabic ? "فشل في إضافة تقييمك." : "Failed to add your review.",
    noToken: isArabic ? "الرجاء تسجيل الدخول أولاً." : "Please log in first.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error(t.noToken);
      return;
    }

    const formData = new FormData();
    formData.append("name", userData?.name || "user");
    formData.append("company_id", String(companyId));
    formData.append("rating", String(rating));
    formData.append("comment", comment);

    try {
      await storeReview(formData).unwrap();
      toast.success(t.success);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(t.failed);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
        isArabic ? "text-right" : "text-left"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Card className="w-full max-w-2xl p-8 relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 ${
            isArabic ? "left-4" : "right-4"
          } rounded-full`}
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-2 justify-center items-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {t.addTitle}
          </h2>
          <p className="text-muted-foreground">{t.addDesc}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="flex flex-col gap-2 justify-center items-center">
            <Label className="text-base font-semibold">{t.ratingLabel}</Label>
            <div className={`flex gap-2 `}>
              {Array.from({ length: 5 }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  onMouseEnter={() => setHoveredRating(index + 1)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 ${
                      index < (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-3">
            <Label htmlFor="comment" className="text-base font-semibold">
              {t.commentLabel}
            </Label>
            <Textarea
              id="comment"
              placeholder={t.placeholder}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              className="resize-none"
              required
            />
          </div>

          {/* Submit + Cancel */}
          <div
            className={`flex gap-3 pt-4 ${isArabic ? "flex-row-reverse" : ""}`}
          >
            <Button
              type="submit"
              size="lg"
              className="flex-1 rounded-full"
              disabled={rating === 0 || !comment.trim() || isLoading}
            >
              {t.submit}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-full bg-transparent"
              onClick={onClose}
            >
              {t.cancel}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
