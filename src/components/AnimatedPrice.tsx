'use client';

import { useState, useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

export default function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const prev = prevValueRef.current;
    prevValueRef.current = value;
    if (prev === value) return;

    const controls = animate(prev, value, {
      type: 'spring',
      stiffness: 200,
      damping: 30,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [value]);

  return <span className="tabular-nums">${display}</span>;
}
