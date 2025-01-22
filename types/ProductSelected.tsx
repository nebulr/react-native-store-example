
export interface ProductSelectedType {
  id?: string | undefined; 
  sku: string;
  name?: string | undefined;
  image?: string | undefined;
  type?: string | undefined;
  variations?: string[] | undefined;
  variation: string;
  details?: string | undefined;
}