import { MainSearchProductType } from "@/types/Search";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSearchProducts(
  name?: string,
  categoryId?: number,
  date?: Date,
  city?: string,
  min_price?: number,
  max_price?: number
) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/search-products?category_id=${categoryId}&date=${date}&city=${city}&min_price=${min_price}&max_price=${max_price}&name=${name}`,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: MainSearchProductType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب المنتجات:", error);
    return null;
  }
}
