"use client";

import { useGetUserInfoQuery } from "@/store/services/Auth/Profile";
import { getAuthTokenClient } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";

export default function HomePage() {
  const isLogin = getAuthTokenClient();
  const { data } = useGetUserInfoQuery();
  const userData = data?.data?.user;

  console.log("isLogin", isLogin);
  console.log("userData", userData);

  if (isLogin && userData?.type === "provider") redirect("/provider/home");
  else redirect("/client");
}
