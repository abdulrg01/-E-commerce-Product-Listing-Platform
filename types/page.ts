export interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  category: string;
  imageUrl: string;
}

export enum Category {
  Headphones = "Headphones",
  Earphone = "Earphone",
  Watch = "Watch",
}
