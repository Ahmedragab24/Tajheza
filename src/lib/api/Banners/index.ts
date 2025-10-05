import { BannerResponseType } from "@/types/Banners";
import { LangType } from "@/types/globals";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBanners(lang: LangType) {
  try {
    const res = await fetch(`${API_BASE_URL}/home?lang=${lang}`, {
      cache: "no-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: BannerResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
