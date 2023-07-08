export type emptyNumberObject = {
  [key: string]: number;
};

export type keyInfo = {
  filter: string[];
  counter: emptyNumberObject;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
