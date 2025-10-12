import ClientHomepage from "./client/page";
import ProviderHomepage from "./provider/page";
import { getAuthTokenServer } from "@/lib/auth/auth-server";
import { getUserInfo } from "@/lib/api/Auth/Profile";

export default async function HomePage() {
  const isLogin = await getAuthTokenServer();
  const data = await getUserInfo();
  const userData = data?.data?.user;

  if (isLogin && userData?.type === "provider") return <ProviderHomepage />;

  return <ClientHomepage />;
}
