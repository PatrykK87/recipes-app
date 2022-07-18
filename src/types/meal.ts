import { Comment } from "./comment";
import { Product } from "./product";

export type Meal = {
  id: number;
  title: string;
  content?: string | null;
  author: string;
  cookTime: number;
  createdAt: string | Date;
  comments?: Comment[];
  products: Product[];
};
