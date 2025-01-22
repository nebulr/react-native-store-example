import {
  Query,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import { ProductType } from '@/types/Product';

import products from '@/data/products.json'

export async function getProducts() : Promise<ProductType[] | undefined> {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => products,
  });

  return data;
}

export async function getProduct(id : string) : Promise<ProductType | undefined> {
  const { data } = useQuery({
    queryKey: [`products_${id}`],
    queryFn: () => products.filter((item) => item.id === id)
  });
  
  return (data != null) ? data[0] : data;
}