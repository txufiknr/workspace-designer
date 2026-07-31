import type { Product } from './types';

const DESKS: Product[] = [
  {
    id: 'desk-electrical',
    name: 'Electrical Adjustable Desk',
    price: 120,
    category: 'desk',
    image: '/products/desk-modern.jpg',
    description:
      'Electric sit-stand desk with smooth motorized height adjustment from 70 to 118 cm.',
    width: 160,
    height: 80,
  },
  {
    id: 'desk-mechanical',
    name: 'Mechanical Adjustable Desk',
    price: 90,
    category: 'desk',
    image: '/products/desk-mechanical.jpg',
    description:
      'Height-adjustable wooden desk from 70 to 120 cm, no electricity needed.',
    width: 160,
    height: 75,
  },
];

const CHAIRS: Product[] = [
  {
    id: 'chair-ergonomic',
    name: 'Ergonomic Office Chair',
    price: 80,
    category: 'chair',
    image: '/products/chair-ergonomic.jpg',
    description:
      'Breathable mesh back, 4D armrests, adjustable headrest and lumbar support.',
    width: 60,
    height: 100,
  },
];

const ACCESSORIES: Product[] = [
  {
    id: 'monitor-27',
    name: '27" 4K Multimedia Monitor',
    price: 60,
    category: 'accessory',
    image: '/products/monitor-27.jpg',
    description:
      '27" 4K IPS display with USB-C or HDMI, 100% sRGB and HDR support.',
    width: 60,
    height: 40,
  },
  {
    id: 'monitor-gaming',
    name: '34" 4K Gaming Monitor',
    price: 100,
    category: 'accessory',
    image: '/products/monitor-dual.jpg',
    description:
      '34" curved WQHD gaming monitor at 180 Hz with 1 ms response time.',
    width: 110,
    height: 40,
  },
  {
    id: 'lamp-led',
    name: 'Smart LED Desk Lamp',
    price: 20,
    category: 'accessory',
    image: '/products/lamp-desk.jpg',
    description:
      'Smart LED lamp with 520 lm, dimmable 2600–5000 K and voice control.',
    width: 20,
    height: 40,
  },
  {
    id: 'lamp-hue',
    name: 'Hue Signe Gradient Lamp',
    price: 35,
    category: 'accessory',
    image: '/products/lamp-floor.jpg',
    description:
      'Multicolour gradient smart light with app and voice control.',
    width: 20,
    height: 80,
  },
  {
    id: 'whiteboard-magnetic',
    name: 'Magnetic Whiteboard',
    price: 15,
    category: 'accessory',
    image: '/products/whiteboard-magnetic.jpg',
    description:
      'Magnetic flip chart whiteboard in 60x90 cm with markers and magnets.',
    width: 60,
    height: 90,
  },
  {
    id: 'whiteboard-standing',
    name: 'Standing Whiteboard',
    price: 25,
    category: 'accessory',
    image: '/products/whiteboard-standing.jpg',
    description:
      'Large standing whiteboard in 120x180 cm, perfect for a planning wall.',
    width: 120,
    height: 180,
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
