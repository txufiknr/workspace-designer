export type WorkspaceConfig = {
  desk: string | null;
  chair: string | null;
  accessories: string[];
};

export type ProductCategory = 'desk' | 'chair' | 'accessory';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  width?: number;
  height?: number;
};
