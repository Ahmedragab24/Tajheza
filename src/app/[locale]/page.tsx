"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import LoaderSpan from "@/components/Atoms/Loaders/LoaderSpan";

export default function HomePage() {
  const router = useRouter();
  const isLogin = getAuthTokenClient();
  const { data, isLoading, isFetching } = useGetUserInfoQuery(undefined, {
    skip: !isLogin,
  });
  const userData = data?.data?.user;
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isLoading || isFetching || redirecting) return;

    if (isLogin) {
      setRedirecting(true);
      if (userData?.type === "provider") {
        router.replace("/provider/home");
      } else {
        router.replace("/client");
      }
    } else {
      setRedirecting(true);
      router.replace("/client");
    }
  }, [isLogin, userData, isLoading, isFetching, redirecting, router]);

  if (isLoading || isFetching || redirecting) {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <LoaderSpan />
      </div>
    );
  }

  return null;
}
