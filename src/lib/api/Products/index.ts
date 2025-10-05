import { LangType } from "@/types/globals";
import {
  ProductDetailsResponseType,
  ProductsResponseType,
} from "@/types/Products";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsForFastDelivery(lang: LangType) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/home-products/fast-delivery?lang=${lang}`,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ProductsResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}

export async function getLatestProducts(lang: LangType) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/home-products/latest?lang=${lang}`,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ProductsResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}

export async function getProductsByService(serviceId: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/services/${serviceId}/products`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ProductsResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}

export async function getProductDetails(productId: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/company-products/${productId}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ProductDetailsResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
