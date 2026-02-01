'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import FloatingHearts from '@/components/FloatingHearts';

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState<{ top: string; left: string } | null>(null);

  const handleNoInteraction = () => {
    // Get viewport dimensions
    // Subtract button dimensions (approx 150x60) and some safety margin
    const maxWidth = window.innerWidth - 180;
    const maxHeight = window.innerHeight - 80;

    // Random position with safety padding (50px from edges)
    const randomX = Math.max(50, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(50, Math.floor(Math.random() * maxHeight));

    setNoBtnPosition({
      top: `${randomY}px`,
      left: `${randomX}px`,
    });
  };

  const handleYesClick = () => {
    setAccepted(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <main className="container">
      <FloatingHearts />

      <div className="glass-card">
        {accepted ? (
          <div className="success-content">
            <h1 style={{ marginBottom: '1rem' }}>
              Yaaaaay ! 💖
            </h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
              Je savais que tu dirais OUI !
            </p>
            <div className="animate-bounce" style={{ color: 'var(--color-accent-primary)' }}>
              <Heart size={64} fill="currentColor" />
            </div>
          </div>
        ) : (
          <>
            <h1>Veux-tu être ma Valentine ?</h1>

            <div className="actions">
              <button
                className="btn btn-yes"
                onClick={handleYesClick}
              >
                <Heart style={{ marginRight: '0.5rem' }} size={24} fill="currentColor" />
                OUI
              </button>

              <button
                className={`btn btn-no ${noBtnPosition ? 'moving' : ''}`}
                style={noBtnPosition ? { top: noBtnPosition.top, left: noBtnPosition.left } : {}}
                onMouseEnter={handleNoInteraction}
                onTouchStart={handleNoInteraction}
                onClick={handleNoInteraction}
              >
                NON
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
