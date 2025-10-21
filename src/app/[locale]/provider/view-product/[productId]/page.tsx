import NotFound from "@/app/[locale]/not-found";
import ProductDetails from "@/components/Sections/Client/Product/ProductDetails";
import ProductGallery from "@/components/Sections/Client/Product/ProductGallery";
import RelatedProducts from "@/components/Sections/Client/Product/RelatedProducts";
import { getProductDetails } from "@/lib/api/Products";
import { LangType } from "@/types/globals";
import { getLocale } from "next-intl/server";
import React from "react";

const ViewProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const data = await getProductDetails(+productId);
  const Product = data?.data;
  const lang = (await getLocale()) as LangType;

  console.log("Product", Product);

  if (!Product) {
    return <NotFound />;
  }

  return (
    <section className="Container mt-10 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ProductGallery
          productImage={Product?.main_image}
          productImages={Product?.images}
          productName={Product.title}
          lang={lang}
        />

        <ProductDetails product={Product} lang={lang} />
      </div>

      {Product.related_products && Product.related_products.length > 0 && (
        <RelatedProducts
          RelatedProducts={Product.related_products}
          lang={lang}
        />
      )}
    </section>
  );
};

export default ViewProductPage;
