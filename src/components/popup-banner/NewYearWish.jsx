import { useState, useEffect } from 'react';
import { X, Sparkles, PartyPopper, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewYearWish = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });



      useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('newYearPopupSeen');
        if (!hasSeenPopup) {
            const timer = setTimeout(() => setIsOpen(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const diff = newYear - now;

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

//   const handleClose = () => setIsOpen(false);
    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('newYearPopupSeen', 'true');
    };
  const handleCelebrate = () => console.log('Navigate to celebration page');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="relative max-w-md w-full rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 30%, #2d1b4e 70%, #0a0a1a 100%)',
          animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)' }}
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Fireworks Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={`firework-${i}`}
              className="absolute rounded-full"
              style={{
                width: '4px',
                height: '4px',
                background: ['#ffd700', '#ff6b6b', '#4ecdc4', '#95e1d3', '#f38181'][i % 5],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `explode ${2 + Math.random() * 2}s ease-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute"
              style={{
                width: '8px',
                height: '8px',
                background: ['#ffd700', '#ff6b6b', '#4ecdc4', '#95e1d3', '#f38181', '#fff'][i % 6],
                left: `${Math.random() * 100}%`,
                top: '-10%',
                clipPath: i % 3 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                borderRadius: i % 3 === 1 ? '50%' : '0',
                animation: `confettiFall ${4 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>

        {/* Twinkling Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <Star
              key={`star-${i}`}
              size={6 + Math.random() * 8}
              className="absolute text-yellow-200"
              fill="currentColor"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Glowing Border */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            border: '2px solid rgba(255, 215, 0, 0.3)',
            animation: 'borderGlow 3s ease-in-out infinite'
          }}
        />

        {/* Main Content */}
        <div className="relative px-6 sm:px-8 py-10 sm:py-12 text-center">
          {/* 2025 Display */}
          <div
            className="mx-auto mb-6"
            style={{ animation: 'breathe 2s ease-in-out infinite' }}
          >
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold leading-none" style={{
              background: 'linear-gradient(135deg, #ffd700 0%, #ff6b6b 25%, #4ecdc4 50%, #95e1d3 75%, #ffd700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% auto',
              animation: 'shimmer 3s linear infinite',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
            }}>
              2026
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <PartyPopper className="w-5 h-5 text-yellow-300 animate-bounce" />
              <PartyPopper className="w-5 h-5 text-pink-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <PartyPopper className="w-5 h-5 text-cyan-300 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          {/* Heading */}
          <div
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease-out 0.2s'
            }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight" style={{
              background: 'linear-gradient(to right, #ffd700, #ff6b6b, #4ecdc4, #ff6b6b, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% auto',
              animation: 'shimmer 3s linear infinite',
            }}>
              Happy New Year!
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4" style={{ animation: 'scalePulse 2s ease-in-out infinite' }}>
              <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-pink-500" />
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-l from-transparent via-yellow-500 to-pink-500" />
            </div>
          </div>

          {/* Countdown */}
       

          <div
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease-out 0.4s'
            }}
          >
            <p className="text-lg sm:text-xl font-semibold mb-2 text-yellow-300">
              From Organic Nation
            </p>
            <p className="text-sm sm:text-base mb-6 leading-relaxed text-blue-100">
              Cheers to new beginnings, fresh opportunities, and a year filled with health, happiness, and organic goodness!
            </p>
          </div>

          <div
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease-out 0.6s'
            }}
            className="space-y-3"
          >
            <button
              onClick={handleCelebrate}
              className="relative w-full py-3 px-6 rounded-full font-semibold shadow-xl overflow-hidden group text-white transition-transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500" />
              <Link to='/shop/all' className="relative flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start 2026 Fresh & Healthy
              </Link>
            </button>
            <div
              className="text-xs flex items-center justify-center gap-1 text-cyan-300"
              style={{
                opacity: showContent ? 1 : 0,
                transition: 'opacity 0.5s ease-out 0.8s'
              }}
            >
              <Sparkles size={14} />
              <span>New Year, New You, New Deals!</span>
              <Sparkles size={14} />
            </div>
          </div>
        </div>

        {/* Bottom Gradient Bar */}
        <div
          className="h-2"
          style={{
            background: 'linear-gradient(90deg, #ffd700 0%, #ff6b6b 25%, #4ecdc4 50%, #95e1d3 75%, #ffd700 100%)',
            animation: 'rainbow 3s linear infinite',
            backgroundSize: '200% 100%'
          }}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.8) rotateY(-15deg);
          }
          to { 
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }
        
        @keyframes explode {
          0% {
            transform: scale(0) translate(0, 0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(20) translate(var(--x, 50px), var(--y, -50px));
            opacity: 0;
          }
        }
        
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0.5;
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.8) rotate(0deg);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }
        
        @keyframes borderGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 107, 107, 0.2);
          }
          50% { 
            box-shadow: 0 0 40px rgba(78, 205, 196, 0.5), 0 0 60px rgba(255, 215, 0, 0.3);
          }
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes scalePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
};

export default NewYearWish;