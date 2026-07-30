'use client';

import { useState, useEffect } from 'react';
import { animate } from 'framer-motion';

export default function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(display, value, {
      type: 'spring',
      stiffness: 200,
      damping: 30,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [value]);

  return <span className="tabular-nums">${display}</span>;
}
