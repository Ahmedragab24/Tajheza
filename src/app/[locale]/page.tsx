import LoaderSpan from "@/components/Atoms/Loaders/LoaderSpan";
import { getUserInfo } from "@/lib/api/Auth/Profile";
import { getAuthTokenServer } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const isLogin = await getAuthTokenServer();
  const data = await getUserInfo();
  const userData = data?.data?.user;

  if (!isLogin) {
    redirect("/client/home");
  }

  //  "client" | "provider"
  if (userData?.type === "user") {
    redirect("/client/home");
  } else if (userData?.type === "provider") {
    redirect("/provider/home");
  }

  // fallback
  return <LoaderSpan />;
}
