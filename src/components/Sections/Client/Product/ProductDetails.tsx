import { LangType } from "@/types/globals";
import { ProductDetailsType } from "@/types/Products";
import React from "react";

interface Props {
  product: ProductDetailsType;
  lang: LangType;
}

const ProductDetails = ({ lang, product }: Props) => {
  return <div></div>;
};

export default ProductDetails;
