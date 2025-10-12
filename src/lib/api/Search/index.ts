import { ProductFilteringType } from "@/app/[locale]/client/services/page";
import { MainSearchProductType } from "@/types/Search";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSearchProducts(Filter: ProductFilteringType) {
  try {
    const params = new URLSearchParams();

    const filterParams = {
      category_id: Filter.categoryId,
      date: Filter.date,
      city: Filter.city,
      min_price: Filter.min_price,
      max_price: Filter.max_price,
      name: Filter.name,
    };

    for (const key in filterParams) {
      const value = filterParams[key as keyof typeof filterParams];

      if (value !== null && value !== undefined && value !== "") {
        if (value instanceof Date) {
          params.append(key, value.toISOString());
        } else {
          params.append(key, String(value));
        }
      }
    }

    const res = await fetch(
      `${API_BASE_URL}/search-products?${params.toString()}`,
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
