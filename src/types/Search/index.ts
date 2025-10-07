import { ProductType } from "../Products";

export type SortByType =
  | "Newest"
  | "Lowest price"
  | "Highest price"
  | "Most liked"
  | "Tajheeza_Picks";

export interface MainSearchProductType {
  data: ProductType[];
}
