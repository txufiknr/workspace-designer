'use client';

import { useWorkspace } from '@/context/workspace-context';
import { PRODUCTS_BY_CATEGORY } from '@/lib/products';
import ProductIcon from './ProductIcon';

export default function ChairSelector() {
  const { config, dispatch } = useWorkspace();
  const chairs = PRODUCTS_BY_CATEGORY.chair;

  return (
    <section>
      <h2 className="wd-section-heading">Chair</h2>
      <div className="space-y-2">
        {chairs.map((chair) => {
          const selected = config.chair === chair.id;
          return (
            <button
              key={chair.id}
              onClick={() => dispatch({ type: 'SELECT_CHAIR', id: chair.id })}
              className={selected ? 'wd-card-selected' : 'wd-card-default'}
            >
              <ProductIcon image={chair.image} name={chair.name} />
              <p className="font-medium">{chair.name}</p>
              <p className="wd-price-text">${chair.price}/mo</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
