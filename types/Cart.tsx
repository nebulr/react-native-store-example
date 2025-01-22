import { ProductType } from "./Product";
import { ProductSelectedType } from "./ProductSelected";

export interface Cart {
  cart: ProductSelectedType[];
  addToCart: (product : ProductType | undefined, variation : string | undefined) => void | undefined | null,
  removeFromCart: (id : string) => void | undefined | null,  
  clearCart: () => void | undefined | null,
  isInCart: (id : string) => Boolean
}