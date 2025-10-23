"use client";

import RateBadge from "@/components/Atoms/badges/RateBadge";
import FavoriteBtn from "@/components/Atoms/buttons/FavoriteBtn";
import RiyalIcon from "@/components/Atoms/Icons/RiyalIcon";
import { Card, CardContent } from "@/components/ui/card";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import { ProductType } from "@/types/Products";
import Image from "next/image";
import React from "react";
import ActionProviderBtns from "../BtnsGroup/ActionProviderBtns";
import { useRouter } from "next/navigation";
import { LangType } from "@/types/globals";
import { useLocale } from "next-intl";
import { getAuthTokenClient } from "@/lib/auth/auth-client";

interface Props {
  product: ProductType;
}

const ProductCard = ({ product }: Props) => {
  const lang = useLocale() as LangType;
  const isLogin = getAuthTokenClient();
  const { data } = useGetUserInfoQuery(undefined, { skip: !isLogin });
  const userInfo = data?.data?.user;
  const router = useRouter();

  const handleCardClick = () => {
    if (!isLogin || userInfo?.type === "user") {
      router.push(`/client/services/${product.id}`);
    }
  };

  return (
    <div onClick={handleCardClick}>
      <Card className="p-0 overflow-hidden gap-0 group duration-300 transition-all cursor-pointer hover:shadow-xl">
        <div className="relative w-full h-30 md:h-50 overflow-hidden">
          <Image
            src={product.main_image}
            alt={product.title}
            fill
            loading="lazy"
            quality={100}
            className="object-cover group-hover:scale-105 duration-300"
          />

          <div className="w-full px-2 absolute top-2 flex justify-between">
            <RateBadge number={product.rating} />

            {userInfo?.type === "provider" ? (
              <ActionProviderBtns productId={product.id} />
            ) : (
              <FavoriteBtn
                productId={product.id}
                type="card"
                variant="secondary"
              />
            )}
          </div>
        </div>

        <CardContent className="relative p-4 flex flex-col gap-4">
          <h3 className="text-sm">{product.title}</h3>

          <div className="flex items-center gap-1">
            <h5 className="text-primary text-lg font-bold">{product.price}</h5>
            <RiyalIcon />
          </div>

          {product.discount && (
            <div
              className={`absolute ${
                lang === "ar" ? "left-0 rounded-tr-lg" : "right-0 rounded-tl-lg"
              } bottom-4 bg-primary px-4`}
            >
              <div className="text-white">{product.discount}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
