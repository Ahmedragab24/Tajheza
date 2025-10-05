import { CategoriesResponseType } from "@/types/Categories";
import { LangType } from "@/types/globals";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories(lang: LangType) {
  try {
    const res = await fetch(`${API_BASE_URL}/home-categories?lang=${lang}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: CategoriesResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب المنتجات:", error);
    return null;
  }
}
