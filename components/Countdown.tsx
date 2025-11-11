'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  type: 'og' | 'lifetime';
}

export default function Countdown({ type }: CountdownProps) {
  const [count, setCount] = useState(type === 'og' ? 120 : 10);
  const max = type === 'og' ? 120 : 35;

  useEffect(() => {
    if (count <= 0) return;

    const key = `siren_countdown_${type}`;
    const saved = localStorage.getItem(key);
    const now = Date.now();

    if (saved) {
      const { value, timestamp } = JSON.parse(saved);
      const hoursPassed = Math.floor((now - timestamp) / (1000 * 60 * 60));
      const newCount = Math.max(0, value - (type === 'og' ? hoursPassed : 0));
      setCount(newCount);
    }

    const interval = setInterval(() => {
      setCount((c) => {
        const next = c - (type === 'og' ? 1 : 0);
        const data = { value: next, timestamp: Date.now() };
        localStorage.setItem(key, JSON.stringify(data));
        return next >= 0 ? next : 0;
      });
    }, type === 'og' ? 1000 * 60 * 60 : 1000 * 60);

    return () => clearInterval(interval);
  }, [type]);

  const bg = type === 'og' 
    ? 'from-red-600 to-pink-600' 
    : 'from-amber-600 to-yellow-700';

  const label = type === 'og' 
    ? 'OG Thrones Remaining' 
    : 'Lifetime Seats Left';

  return (
    <div className={`bg-gradient-to-r ${bg} text-white font-bold py-3 px-6 rounded-full text-lg animate-pulse shadow-lg inline-block`}>
      <span>{count}</span>
      <span className="text-sm ml-2">/ {max} {label}</span>
    </div>
  );
}