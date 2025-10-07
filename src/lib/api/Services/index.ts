import { LangType } from "@/types/globals";
import { ServicesResponseType } from "@/types/Services";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServices(lang: LangType) {
  try {
    const res = await fetch(`${API_BASE_URL}/home-services?lang=${lang}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ServicesResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}

export async function getServicesByCategory(
  lang: LangType,
  categoryId: number,
  name?: string
) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/services?name=${name}&category_id=${categoryId}&lang=${lang}`,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ServicesResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
