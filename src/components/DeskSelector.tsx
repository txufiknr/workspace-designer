'use client';

import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import ProductIcon from './ProductIcon';

export default function DeskSelector() {
  const { config, dispatch } = useWorkspace();
  const desks = PRODUCTS_BY_CATEGORY.desk;

  return (
    <section>
      <h2 className="wd-section-heading">Desk</h2>
      <div className="space-y-2">
        {desks.map((desk) => {
          const selected = config.desk === desk.id;
          return (
            <button
              key={desk.id}
              onClick={() => dispatch({ type: 'SELECT_DESK', id: desk.id })}
              className={selected ? 'wd-card-selected' : 'wd-card-default'}
            >
              <ProductIcon image={desk.image} name={desk.name} />
              <p className="font-medium">{desk.name}</p>
              <p className="wd-price-text">${desk.price}/mo</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
