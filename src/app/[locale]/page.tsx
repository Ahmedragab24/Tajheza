"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import { getAuthTokenClient } from "@/lib/auth/auth-client";

export default function HomePage() {
  const router = useRouter();
  const isLogin = getAuthTokenClient();
  const { data, isLoading } = useGetUserInfoQuery(undefined, {
    skip: !isLogin,
  });
  const userData = data?.data?.user;

  useEffect(() => {
    if (isLoading) return;

    if (isLogin) {
      if (userData?.type === "provider") {
        router.replace("/provider/home");
      } else {
        router.replace("/client");
      }
    } else {
      router.replace("/client");
    }
  }, [isLogin, userData, isLoading, router]);

  return null;
}
