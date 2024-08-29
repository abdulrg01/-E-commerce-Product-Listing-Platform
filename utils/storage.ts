import { Product } from "@/types/page";

const STORAGE_KEY = "products";

export const getProductsFromStorage = (): Product[] => {
  if (typeof window !== 'undefined') {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    return storedProducts ? JSON.parse(storedProducts) : [];
  }
  return [];
};

export const saveProductsToStorage = (products: Product[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }
};