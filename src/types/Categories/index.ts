export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

export interface CategoriesResponseType {
  data: CategoryType[];
}
