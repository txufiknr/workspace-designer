'use client';

import { useState } from 'react';
import { RENTAL_PERIODS, MULTIPLIERS, type RentalPeriod } from '@/lib/constants';

export default function RentalPeriodToggle({
  onChange,
}: {
  onChange: (period: RentalPeriod, multiplier: number) => void;
}) {
  const [active, setActive] = useState<RentalPeriod>('monthly');

  function select(period: RentalPeriod) {
    setActive(period);
    onChange(period, MULTIPLIERS[period]);
  }

  return (
    <div className="flex rounded-lg border border-border bg-gray-900 p-0.5">
      {RENTAL_PERIODS.map((period) => (
        <button
          key={period}
          onClick={() => select(period)}
          className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
            active === period
              ? 'bg-mint-500 text-white'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
}
