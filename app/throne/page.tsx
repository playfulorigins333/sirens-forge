'use client';
import { useEffect, useState } from 'react';

export default function Throne() {
  const [earnings, setEarnings] = useState(0);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    fetch('/api/earnings').then(r => r.json()).then(d => setEarnings(d.total));

    const timer = setInterval(() => {
      const now = new Date();
      const friday = new Date(now);
      friday.setDate(now.getDate() + ((5 + 7 - now.getDay()) % 7 || 7));
      friday.setHours(0, 0, 0, 0);
      const diff = friday.getTime() - now.getTime();
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      setCountdown(`${days}d ${hours}h`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a0033, #000)', 
      color: '#ff00aa', 
      fontFamily: 'monospace',
      textAlign: 'center',
      paddingTop: '10vh'
    }}>
      <h1 style={{ fontSize: '4rem', textShadow: '0 0 20px #ff00aa' }}>OG THRONE ROOM</h1>
      <p style={{ fontSize: '2rem' }}>LIVE EARNINGS: ${earnings.toFixed(2)}</p>
      <p style={{ fontSize: '3rem', color: '#00ffff' }}>PAYOUT IN: {countdown}</p>
      <p style={{ marginTop: '3rem', fontSize: '1.5rem' }}>
        <a href={`/throne?ref=${window.location.hostname.split('.')[0]}`} style={{ color: '#00ff00' }}>
          YOUR EMPIRE LINK: sirensforge.vip/throne?ref=YOURCODE
        </a>
      </p>
    </div>
  );
}