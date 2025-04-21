// ClearanceSaleText.jsx
import React from 'react';

const ClearanceSaleText = () => {
  return (
    <div className="relative overflow-hidden w-full py-2 px-4 flex items-center justify-center">
      <div className="scrolling-text whitespace-nowrap text-base sm:text-lg md:text-xl font-semibold text-red-600">
        🎉 CLEARANCE SALE! Get 40% OFF on Pickles 🥒 & 35% OFF on Jamun Honey 🍯 – Limited Time Only!
      </div>

      <style>{`
        /* First-time animation: center to left */
        @keyframes first-run {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        /* Looping animation: right to left */
        @keyframes marquee-loop {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .scrolling-text {
          animation:
            first-run 5s linear 1,
            marquee-loop 15s linear infinite;
          animation-delay: 0s, 5s;
          will-change: transform;
        }

        .scrolling-text:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ClearanceSaleText;
