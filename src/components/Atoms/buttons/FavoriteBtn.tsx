"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} from "@/store/services/Favorites";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { LangType } from "@/types/globals";
import { ErrorType } from "@/types/Errors";
import { getAuthTokenClient } from "@/lib/auth/auth-client";

interface Props {
  productId: number;
  type: "page" | "card";
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
}

const FavoriteBtn = ({ productId, variant = "ghost", type }: Props) => {
  const lang = useLocale() as LangType;
  const isArabic = lang === "ar";
  const isLogin = getAuthTokenClient();

  const { data: favoritesData, isLoading: favoritesLoading } =
    useGetFavoritesQuery(lang);

  const [toggleFavorite, { isLoading: toggleLoading }] =
    useToggleFavoriteMutation();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoritesData?.data) {
      const found = favoritesData.data.some(
        (favProduct) => favProduct.id === productId
      );
      setIsFavorite(found);
    }
  }, [favoritesData, productId]);

  const handleToggle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLogin) {
      toast.success(
        isArabic ? "يرجى تسجيل الدخول أولاً" : "Please log in first"
      );

      return;
    }

    try {
      const res = await toggleFavorite(productId).unwrap();
      setIsFavorite(res.is_favorite);

      if (res.is_favorite) {
        toast.success(
          isArabic
            ? "تمت إضافة المنتج إلى المفضلة ❤️"
            : "Product added to favorites ❤️"
        );
      } else {
        toast.info(
          isArabic
            ? "تمت إزالة المنتج من المفضلة 💔"
            : "Product removed from favorites 💔"
        );
      }
    } catch (err) {
      const error = err as ErrorType;
      console.error(error);
      toast.error(
        isArabic
          ? "حدث خطأ أثناء تحديث المفضلة 😞"
          : "Something went wrong while updating favorites 😞"
      );
    }
  };

  const loading = favoritesLoading || toggleLoading;

  return (
    <Button
      onClick={handleToggle}
      disabled={loading}
      variant={variant || "ghost"}
      size="icon"
      className={`transition-all ${
        type === "page" ? "!w-8 !h-8 md:!w-10 md:!h-10" : "!w-8 !h-8"
      } ${isFavorite ? "bg-red-100" : ""}`}
    >
      <Heart
        className={`transition-all ${
          isFavorite ? "text-primary fill-primary" : "text-primary"
        } ${type === "page" ? "!w-4 !h-4 md:!w-6 md:!h-6" : "!w-4 !h-4"}`}
      />
    </Button>
  );
};

export default FavoriteBtn;
