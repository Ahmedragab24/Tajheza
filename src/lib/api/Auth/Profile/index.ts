import { getAuthTokenServer } from "@/lib/auth/auth-server";
import { ProfileResponseType } from "@/types/Auth/Profile";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserInfo() {
  const token = await getAuthTokenServer();

  try {
    const res = await fetch(`${API_BASE_URL}/user-info`, {
      cache: "no-cache",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ProfileResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
