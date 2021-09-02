import { Product } from "./products";

export interface Purchase {
  product: Product;
  buyer: string;
  date: Date;
  key: string;
}
