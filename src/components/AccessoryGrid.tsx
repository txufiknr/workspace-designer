'use client';

import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import ProductIcon from './ProductIcon';

export default function AccessoryGrid() {
  const { config, dispatch } = useWorkspace();
  const accessories = PRODUCTS_BY_CATEGORY.accessory;

  return (
    <section>
      <h2 className="wd-section-heading">Accessories</h2>
      <div className="grid grid-cols-2 gap-2">
        {accessories.map((item) => {
          const selected = config.accessories.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() =>
                dispatch({ type: 'TOGGLE_ACCESSORY', id: item.id })
              }
              className={
                selected ? 'wd-card-accessory--selected' : 'wd-card-accessory'
              }
            >
              <ProductIcon image={item.image} name={item.name} />
              <p className="text-sm font-medium">{item.name}</p>
              <p className="wd-price-text">${item.price}/mo</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
