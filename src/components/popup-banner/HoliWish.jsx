import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

/* ─── HOLI COLOR PALETTE ────────────────────────────────────────── */
const C = {
  pink:   '#FF2D78',
  orange: '#FF7A00',
  yellow: '#FFE600',
  green:  '#00E676',
  teal:   '#00D4FF',
  purple: '#B94FFF',
  red:    '#FF1744',
  lime:   '#AEEA00',
};
const ALL = Object.values(C);

/* ─── CONFETTI HELPERS ──────────────────────────────────────────── */
const burst = (origin, colors, count = 80) =>
  confetti({
    particleCount: count,
    spread: 360,
    startVelocity: 55,
    origin,
    colors,
    shapes: ['circle', 'square'],
    scalar: 1.3,
    gravity: 0.6,
    ticks: 350,
  });

const sideStreams = () => {
  const end = Date.now() + 3200;
  const frame = () => {
    confetti({ particleCount: 7, angle: 60,  spread: 55, origin: { x: 0, y: 0.75 }, colors: [C.pink, C.orange, C.yellow], scalar: 1.4, ticks: 280 });
    confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1, y: 0.75 }, colors: [C.teal, C.purple, C.green], scalar: 1.4, ticks: 280 });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
};

const bigBang = () => {
  confetti({ particleCount: 200, spread: 110, origin: { x: 0.5, y: 0.55 }, colors: ALL, startVelocity: 70, scalar: 1.7, shapes: ['circle', 'square'], ticks: 450, gravity: 0.5 });
  setTimeout(() => burst({ x: 0.15, y: 0.6 }, [C.pink, C.orange, C.red], 70), 320);
  setTimeout(() => burst({ x: 0.85, y: 0.6 }, [C.teal, C.purple, C.lime], 70), 650);
  setTimeout(() => burst({ x: 0.5,  y: 0.25 }, [C.yellow, C.green, C.orange], 80), 950);
  setTimeout(() => burst({ x: 0.3,  y: 0.8 }, [C.pink, C.teal, C.yellow], 60), 1250);
  setTimeout(() => burst({ x: 0.7,  y: 0.8 }, [C.purple, C.green, C.orange], 60), 1500);
};

/* ─── SUB-COMPONENTS ───────────────────────────────────────────── */

/** Floating gulal (powder) cloud */
const GulalCloud = ({ color, x, y, size, delay, duration }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`, top: `${y}%`, width: size, height: size,
      background: `radial-gradient(circle, ${color}bb 0%, ${color}44 45%, transparent 70%)`,
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 2.2, 3, 2, 0], opacity: [0, 0.75, 0.5, 0.3, 0], x: [0, (Math.random() - 0.5) * 50], y: [0, -40 - Math.random() * 40] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
  />
);

/** Spinning pichkari (water-gun) stream dot */
const StreamDot = ({ color, angle, delay }) => {
  const rad = (angle * Math.PI) / 180;
  const dist = 70 + Math.random() * 55;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 5 + Math.random() * 9, height: 5 + Math.random() * 9,
        backgroundColor: color, left: '50%', top: '50%',
        boxShadow: `0 0 8px ${color}`,
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: [0, Math.cos(rad) * dist],
        y: [0, Math.sin(rad) * dist],
        opacity: [0, 1, 0], scale: [0, 1.6, 0],
      }}
      transition={{ duration: 1.1 + Math.random() * 0.9, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
};

/** Paint splash blob (positioned outside card edges) */
const Splash = ({ color, style, rotate, delay }) => (
  <motion.div className="absolute pointer-events-none" style={{ ...style, zIndex: 0 }}>
    <motion.div
      initial={{ scale: 0, rotate: rotate - 30, opacity: 0 }}
      animate={{ scale: [0, 1.3, 1], rotate, opacity: [0, 1, 0.9] }}
      transition={{ delay, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ filter: `drop-shadow(0 0 12px ${color}99)` }}
    >
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <path d="M50,8 C72,4 92,26 90,50 C88,70 72,88 50,92 C28,96 10,76 8,53 C5,28 26,13 50,8 Z" fill={color} opacity="0.92" />
        <path d="M50,18 C65,14 82,34 80,52 C78,67 65,80 50,82 C35,84 19,70 21,54 C23,37 36,21 50,18 Z" fill="white" opacity="0.15" />
        <circle cx="62" cy="32" r="7" fill="white" opacity="0.12" />
      </svg>
    </motion.div>
  </motion.div>
);

/** Animated rangoli ring of glowing dots */
const RangoliRing = ({ radius, numDots, colorOffset, clockwise }) => {
  const dots = Array.from({ length: numDots }, (_, i) => {
    const angle = (i / numDots) * 2 * Math.PI;
    return { x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle), color: ALL[(i + colorOffset) % ALL.length] };
  });
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ rotate: clockwise ? [0, 360] : [0, -360] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
    >
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`, top: `${d.y}%`,
            transform: 'translate(-50%, -50%)',
            width: 9, height: 9,
            backgroundColor: d.color,
            boxShadow: `0 0 10px ${d.color}, 0 0 20px ${d.color}88`,
          }}
          animate={{ scale: [1, 1.9, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, delay: i * 0.13, repeat: Infinity }}
        />
      ))}
    </motion.div>
  );
};

/** Animated rainbow title letter */
const TitleLetter = ({ char, color, index, show }) => (
  <AnimatePresence>
    {show && (
      <motion.span
        style={{
          color, display: 'inline-block',
          textShadow: `0 0 20px ${color}cc, 0 0 50px ${color}66, 0 0 80px ${color}33`,
        }}
        initial={{ opacity: 0, y: 70, rotate: -30, scale: 0.2 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        transition={{ delay: 0.06 * index, type: 'spring', stiffness: 480, damping: 17 }}
        whileHover={{ scale: 1.45, rotate: [0, -12, 12, 0], transition: { duration: 0.35 } }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    )}
  </AnimatePresence>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
const HoliWish = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen]     = useState(false);
  const [ready, setReady]       = useState(false);   // content reveal phase
  const intervalRef             = useRef(null);

  /* Stable random configs (computed once per mount) */
  const gulals = useRef(
    Array.from({ length: 16 }, (_, i) => ({
      color: ALL[i % ALL.length],
      x: 3 + Math.random() * 92,
      y: 3 + Math.random() * 92,
      size: 55 + Math.random() * 85,
      delay: Math.random() * 3,
      duration: 3.2 + Math.random() * 2,
    }))
  ).current;

  const streamDots = useRef(
    Array.from({ length: 36 }, (_, i) => ({
      color: ALL[i % ALL.length],
      angle: (i / 36) * 360,
      delay: Math.random() * 1.6,
    }))
  ).current;

  const splashes = useRef([
    { color: C.pink,   style: { top: -32, left: '8%',   width: 76, height: 76 }, rotate: -20, delay: 0.9  },
    { color: C.yellow, style: { top: -26, right: '12%', width: 64, height: 64 }, rotate: 18,  delay: 1.1  },
    { color: C.teal,   style: { bottom: -28, left: '15%', width: 68, height: 68 }, rotate: 42, delay: 1.25 },
    { color: C.orange, style: { bottom: -22, right: '10%', width: 58, height: 58 }, rotate: -12, delay: 1.0 },
    { color: C.purple, style: { top: '25%', left: -32, width: 64, height: 64 }, rotate: 65,  delay: 1.15 },
    { color: C.green,  style: { top: '58%', right: -28, width: 56, height: 56 }, rotate: -50, delay: 0.95 },
    { color: C.lime,   style: { top: '8%',  right: -24, width: 48, height: 48 }, rotate: 28,  delay: 1.35 },
    { color: C.red,    style: { bottom: '22%', left: -26, width: 52, height: 52 }, rotate: -35, delay: 1.1 },
  ]).current;

  /* Session guard — show once per session */
  useEffect(() => {
    if (!sessionStorage.getItem('holiPopupSeen')) {
      const t = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  /* Confetti cascade on open */
  useEffect(() => {
    if (!isOpen) return;

    setTimeout(() => bigBang(), 350);
    setTimeout(() => sideStreams(), 750);
    setTimeout(() => setReady(true), 1100);

    // Periodic random micro-bursts
    intervalRef.current = setInterval(() => {
      burst(
        { x: 0.1 + Math.random() * 0.8, y: 0.2 + Math.random() * 0.55 },
        ALL.sort(() => Math.random() - 0.5).slice(0, 4),
        45
      );
    }, 3800);

    return () => clearInterval(intervalRef.current);
  }, [isOpen]);

  const handleClose = () => {
    clearInterval(intervalRef.current);
    setIsOpen(false);
    setReady(false);
    sessionStorage.setItem('holiPopupSeen', 'true');
  };

  const handleShopNow = () => { handleClose(); navigate('/shop/all'); };

  const handleBtnHover = () =>
    confetti({ particleCount: 50, spread: 70, origin: { x: 0.5, y: 0.72 }, colors: [C.pink, C.orange, C.yellow, C.teal], startVelocity: 35, scalar: 1.2, ticks: 220 });

  const title = 'Happy Holi!'.split('');
  const titleColors = [C.pink, C.orange, C.yellow, C.green, C.pink, C.teal, C.yellow, C.purple, C.orange, C.yellow, C.green, C.teal, C.pink, 'white'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* ── ANIMATED BACKDROP ── */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(ellipse at 20% 30%, ${C.pink}40 0%, transparent 52%), radial-gradient(ellipse at 80% 70%, ${C.purple}40 0%, transparent 52%), #000000d9`,
                `radial-gradient(ellipse at 75% 20%, ${C.orange}40 0%, transparent 52%), radial-gradient(ellipse at 25% 80%, ${C.teal}40 0%, transparent 52%), #000000d9`,
                `radial-gradient(ellipse at 50% 70%, ${C.yellow}35 0%, transparent 52%), radial-gradient(ellipse at 55% 20%, ${C.green}35 0%, transparent 52%), #000000d9`,
                `radial-gradient(ellipse at 20% 30%, ${C.pink}40 0%, transparent 52%), radial-gradient(ellipse at 80% 70%, ${C.purple}40 0%, transparent 52%), #000000d9`,
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ backdropFilter: 'blur(5px)' }}
          />

          {/* ── CARD WRAPPER ── */}
          <motion.div
            className="relative max-w-[430px] w-full z-10"
            initial={{ scale: 0.35, rotate: -10, opacity: 0, y: 100 }}
            animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
            exit={{ scale: 0.45, rotate: 10, opacity: 0, y: 80 }}
            transition={{ type: 'spring', stiffness: 310, damping: 22, delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  `0 0 50px 14px ${C.pink}55, 0 0 100px 28px ${C.orange}33`,
                  `0 0 50px 14px ${C.teal}55, 0 0 100px 28px ${C.purple}33`,
                  `0 0 50px 14px ${C.yellow}55, 0 0 100px 28px ${C.green}33`,
                  `0 0 50px 14px ${C.pink}55, 0 0 100px 28px ${C.orange}33`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Paint splash blobs (outside card edges) */}
            {splashes.map((s, i) => <Splash key={i} {...s} />)}

            {/* ── CARD SURFACE ── */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(155deg, #0c0018 0%, #130030 45%, #06000e 100%)',
                border: '1.5px solid rgba(255,255,255,0.09)',
              }}
            >
              {/* Rangoli ring decorations (top area) */}
              <div className="absolute pointer-events-none opacity-45" style={{ top: -50, left: '50%', transform: 'translateX(-50%)', width: 270, height: 270 }}>
                <RangoliRing radius={42} numDots={12} colorOffset={0} clockwise />
                <RangoliRing radius={30} numDots={8}  colorOffset={4} clockwise={false} />
                <RangoliRing radius={18} numDots={6}  colorOffset={2} clockwise />
              </div>

              {/* Gulal cloud layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {gulals.map((g, i) => <GulalCloud key={i} {...g} />)}
              </div>

              {/* Pichkari stream layer (centered at top of content) */}
              <div className="absolute pointer-events-none overflow-visible" style={{ top: '16%', left: '50%' }}>
                {streamDots.map((d, i) => <StreamDot key={i} {...d} />)}
              </div>

              {/* Conic rainbow aura behind title */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  top: '5%', left: '50%', transform: 'translateX(-50%)',
                  width: 300, height: 300, borderRadius: '50%',
                  background: `conic-gradient(from 0deg, ${C.pink}44, ${C.orange}44, ${C.yellow}44, ${C.green}44, ${C.teal}44, ${C.purple}44, ${C.pink}44)`,
                  filter: 'blur(38px)',
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Noise texture overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  opacity: 0.035, mixBlendMode: 'overlay',
                }}
              />

              {/* ── TOP RAINBOW BAR ── */}
              <motion.div
                className="h-3 w-full overflow-hidden relative"
                animate={{ background: [`linear-gradient(90deg,${C.pink},${C.orange},${C.yellow},${C.green},${C.teal},${C.purple},${C.pink})`, `linear-gradient(90deg,${C.purple},${C.pink},${C.orange},${C.yellow},${C.green},${C.teal},${C.purple})`, `linear-gradient(90deg,${C.teal},${C.purple},${C.pink},${C.orange},${C.yellow},${C.green},${C.teal})`] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)', width: '45%' }}
                  animate={{ x: ['-100%', '350%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
                />
              </motion.div>

              {/* ── CONTENT ── */}
              <div className="relative px-7 sm:px-10 pt-9 pb-8 text-center">

                {/* Close button */}
                <motion.button
                  onClick={handleClose}
                  className="absolute top-3 right-4 z-30 rounded-full p-2"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-4 h-4 text-white/80" />
                </motion.button>

                {/* Central diya/sparkle icon */}
                <motion.div
                  className="text-6xl mb-2 select-none"
                  animate={{ rotate: [-6, 6, -6], y: [0, -8, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ filter: 'drop-shadow(0 0 16px #FFE60099)' }}
                >
                  🎨
                </motion.div>

                {/* ── ANIMATED TITLE ── */}
                <div
                  className="mb-1 leading-none select-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
                    fontWeight: 900,
                    fontFamily: "'Baloo 2', 'Nunito ExtraBold', 'Trebuchet MS', cursive",
                    letterSpacing: '-0.01em',
                  }}
                >
                  {title.map((ch, i) => (
                    <TitleLetter key={i} char={ch} color={titleColors[i % titleColors.length]} index={i} show={ready} />
                  ))}
                </div>

                {/* Devanagari line */}
                <AnimatePresence>
                  {ready && (
                    <motion.p
                      className="text-lg font-bold tracking-widest mb-4"
                      style={{
                        background: `linear-gradient(90deg, ${C.pink}, ${C.orange}, ${C.yellow}, ${C.teal}, ${C.purple})`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        fontFamily: "'Noto Sans Devanagari', 'Baloo 2', sans-serif",
                      }}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                    >
                      होली मुबारक हो! 🌈
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Color dot divider */}
                <AnimatePresence>
                  {ready && (
                    <motion.div
                      className="flex items-center justify-center gap-2 mb-5"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.55, duration: 0.5 }}
                    >
                      {ALL.map((col, i) => (
                        <motion.div
                          key={i}
                          className="rounded-full"
                          style={{ backgroundColor: col, boxShadow: `0 0 8px ${col}` }}
                          animate={{ width: [8, 15, 8], height: [8, 15, 8], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 1.5, delay: i * 0.13, repeat: Infinity }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message card */}
                <AnimatePresence>
                  {ready && (
                    <motion.div
                      className="relative rounded-2xl p-4 mb-6 overflow-hidden text-left"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)' }}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65, type: 'spring', stiffness: 260 }}
                    >
                      {/* Shimmer bg */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${C.pink}11, ${C.teal}11, ${C.yellow}11)` }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                      />
                      <p className="text-sm font-bold mb-1 relative" style={{ color: C.orange, fontFamily: "'Baloo 2', cursive" }}>
                        From Organic Nation 🌿
                      </p>
                      <p className="text-sm leading-relaxed relative" style={{ color: 'rgba(255,255,255,0.78)', fontFamily: "'Nunito', sans-serif" }}>
                        May every color you throw bring back joy, radiant health & pure organic love. This Holi, celebrate with nature's finest! 🌺
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── CTA BUTTON ── */}
                <AnimatePresence>
                  {ready && (
                    <motion.div
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.85, type: 'spring', stiffness: 260 }}
                    >
                      <motion.button
                        onClick={handleShopNow}
                        onHoverStart={handleBtnHover}
                        className="relative w-full py-4 rounded-2xl font-black overflow-hidden group"
                        style={{ color: '#0a0010', fontFamily: "'Baloo 2', cursive", fontSize: '1.08rem', letterSpacing: '0.03em' }}
                        whileHover={{ scale: 1.05, y: -3, boxShadow: `0 12px 40px ${C.orange}66` }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      >
                        {/* Animated rainbow bg */}
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: [
                              `linear-gradient(90deg, ${C.yellow} 0%, ${C.orange} 50%, ${C.pink} 100%)`,
                              `linear-gradient(90deg, ${C.pink} 0%, ${C.purple} 50%, ${C.teal} 100%)`,
                              `linear-gradient(90deg, ${C.teal} 0%, ${C.lime} 50%, ${C.yellow} 100%)`,
                              `linear-gradient(90deg, ${C.yellow} 0%, ${C.orange} 50%, ${C.pink} 100%)`,
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        />
                        {/* Gloss */}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 55%)' }} />
                        {/* Moving shimmer on hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.35) 50%, transparent 80%)', backgroundSize: '200% 100%' }}
                          animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                        />
                        <span className="relative z-10 flex items-center  justify-center gap-2">
                           Shop Holi Organic Picks 🌿
                        </span>
                      </motion.button>

                      <motion.p
                        className="mt-3 text-xs"
                        style={{ color: 'white', fontFamily: "'Nunito', sans-serif" }}
                        animate={{ opacity: [0.38, 0.75, 0.38] }}
                        transition={{ duration: 2.8, repeat: Infinity }}
                      >
                        🎉 Exclusive Holi deals live — splash into savings!
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── BOTTOM RAINBOW BAR ── */}
              <motion.div
                className="h-3 w-full overflow-hidden relative"
                animate={{ background: [`linear-gradient(90deg,${C.purple},${C.pink},${C.orange},${C.yellow},${C.green},${C.teal},${C.purple})`, `linear-gradient(90deg,${C.teal},${C.purple},${C.pink},${C.orange},${C.yellow},${C.green},${C.teal})`, `linear-gradient(90deg,${C.green},${C.teal},${C.purple},${C.pink},${C.orange},${C.yellow},${C.green})`] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)', width: '45%' }}
                  animate={{ x: ['-100%', '320%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HoliWish;