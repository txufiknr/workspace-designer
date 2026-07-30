import type { Product } from './types';

const DESKS: Product[] = [
  {
    id: 'desk-modern',
    name: 'Modern Standing Desk',
    price: 120,
    category: 'desk',
    image: '/products/desk-modern.svg',
    width: 200,
    height: 80,
  },
  {
    id: 'desk-classic',
    name: 'Classic Wooden Desk',
    price: 90,
    category: 'desk',
    image: '/products/desk-classic.svg',
    width: 180,
    height: 75,
  },
];

const CHAIRS: Product[] = [
  {
    id: 'chair-ergonomic',
    name: 'Ergonomic Mesh Chair',
    price: 80,
    category: 'chair',
    image: '/products/chair-ergonomic.svg',
    width: 60,
    height: 100,
  },
  {
    id: 'chair-minimal',
    name: 'Minimal Wooden Chair',
    price: 50,
    category: 'chair',
    image: '/products/chair-minimal.svg',
    width: 50,
    height: 90,
  },
];

const ACCESSORIES: Product[] = [
  {
    id: 'monitor-27',
    name: '27" 4K Monitor',
    price: 60,
    category: 'accessory',
    image: '/products/monitor.svg',
    width: 60,
    height: 40,
  },
  {
    id: 'monitor-dual',
    name: 'Dual Monitor Setup',
    price: 100,
    category: 'accessory',
    image: '/products/monitor-dual.svg',
    width: 110,
    height: 40,
  },
  {
    id: 'lamp-desk',
    name: 'LED Desk Lamp',
    price: 20,
    category: 'accessory',
    image: '/products/lamp.svg',
    width: 20,
    height: 40,
  },
  {
    id: 'plant-snake',
    name: 'Snake Plant',
    price: 15,
    category: 'accessory',
    image: '/products/plant.svg',
    width: 30,
    height: 50,
  },
  {
    id: 'lamp-floor',
    name: 'Floor Lamp',
    price: 35,
    category: 'accessory',
    image: '/products/lamp-floor.svg',
    width: 20,
    height: 80,
  },
  {
    id: 'plant-monstera',
    name: 'Monstera',
    price: 25,
    category: 'accessory',
    image: '/products/plant-monstera.svg',
    width: 40,
    height: 60,
  },
];

export const ALL_PRODUCTS = [...DESKS, ...CHAIRS, ...ACCESSORIES];

export const PRODUCTS_BY_ID: Record<string, Product> = {};
for (const p of ALL_PRODUCTS) {
  PRODUCTS_BY_ID[p.id] = p;
}

export const PRODUCTS_BY_CATEGORY = {
  desk: DESKS,
  chair: CHAIRS,
  accessory: ACCESSORIES,
};

export function getProduct(id: string): Product | undefined {
  return PRODUCTS_BY_ID[id];
}

export function calculateTotal(
  ids: (string | null)[],
  multiplier: number,
): number {
  let total = 0;
  for (const id of ids) {
    if (id) {
      const product = getProduct(id);
      if (product) {
        total += product.price;
      }
    }
  }
  return total * multiplier;
}
