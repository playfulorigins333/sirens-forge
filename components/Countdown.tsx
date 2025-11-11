'use client';

import { useState, useEffect } from 'react';

export default function Countdown() {
  const [slots, setSlots] = useState(120);
  const max = 120;

  useEffect(() => {
    if (slots <= 0) return;

    const timer = setInterval(() => {
      setSlots((s) => {
        const next = s - 1;
        return next >= 0 ? next : 0;
      });
    }, 1000 * 60 * 60); // 1 slot per hour

    return () => clearInterval(timer);
  }, [slots]);

  return (
    <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-4 px-8 rounded-full text-2xl animate-pulse shadow-lg">
      <span>{slots}</span>
      <span className="text-lg ml-2">/ {max} OG Thrones Remaining</span>
    </div>
  );
}
