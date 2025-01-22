import { ProductType } from '@/types/Product';
import { createContext, PropsWithChildren, useState, useContext, useEffect } from 'react';
import { ProductSelectedType } from '../types/ProductSelected';
import { Cart } from '@/types/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialContext : Cart = {
  cart: [],
  addToCart: (product : ProductType | undefined, variation : string) => { return undefined; },
  removeFromCart: (sku : string) => { return undefined; },
  clearCart: () => { return undefined; },
  isInCart: (sku : string) => { return false; },
};

export const CartContext = createContext<Cart>(initialContext);

export const useCartContext = () => useContext(CartContext);

export function CartProvider({ children } : PropsWithChildren) {
  const [cart, setCart] = useState<ProductSelectedType[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('cart').then((value) =>  {
      if (value != null) {
        setCart(JSON.parse(value))
      }
    })
  }, [])

  const addToCart = (product: ProductType | undefined, variation: string) => {
    const selectedProduct : ProductSelectedType = { ...product, variation, sku: String(Math.random() * 100000) };
    const newCart = [...cart, selectedProduct];
    setCart(newCart);
    AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (sku: string) => {
    const copy = [...cart];
    copy.splice(copy.findIndex((item) => item.sku === sku), 1)
    setCart(copy);
    AsyncStorage.setItem('cart', JSON.stringify(copy));
  };

  const clearCart = () => {
    setCart([]);
    AsyncStorage.setItem('cart', JSON.stringify([]));
  }

  const isInCart = (sku: string) => cart.findIndex((item) => item.sku === sku) > -1;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  )
}