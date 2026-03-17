import { useEffect, useState, useCallback, useRef } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddToCartBtn from "../../add-to-cart-btn/AddToCartBtn";
// import BuyNowBtn from "../../add-to-cart-btn/BuyNowBtn";
import CheckoutModal from "../../CheckoutModal";
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../features/cart/cartSlice';

const SLIDE_INTERVAL = 4000;

const ComboOfferPopup = ({ combos = [] }) => {
  //   const { products } = useSelector((state) => state.filterData)

  // const dispatch = useDispatch();
  const navigate = useNavigate();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  

  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  // const [addedId, setAddedId] = useState(null);
  const [contentReady, setContentReady] = useState(false);

  // Progress bar driven purely by ref + direct DOM write — zero re-renders
  const progressBarRef = useRef(null);

  // All timer state in refs — never touches React render cycle
  const rafRef = useRef(null);
  const startRef = useRef(null); // timestamp when current slide started
  const pausedRef = useRef(false);
  const visibleRef = useRef(false);
  const activeIdxRef = useRef(0);
  const combosRef = useRef(combos);

  // Keep refs in sync
  useEffect(() => {
    combosRef.current = combos;
  }, [combos]);
  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  /* ── Single persistent rAF loop — NEVER restarted on slide change ── */
  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const runLoop = useCallback(() => {
    stopLoop();
    startRef.current = performance.now();

    const tick = (now) => {
      // Paused — just wait, re-schedule next frame
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / SLIDE_INTERVAL) * 100, 100);

      // Write directly to DOM — no setState, no re-render, no shake
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Advance slide — single setState, no loop restart
        const next = (activeIdxRef.current + 1) % combosRef.current.length;
        setActiveIdx(next);
        // Reset timer for next slide in same loop tick
        startRef.current = now;
        if (progressBarRef.current) progressBarRef.current.style.width = "0%";
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [stopLoop]);

  /* ── Scroll trigger ── */
  const handleScroll = useCallback(() => {
    if (dismissed) return;
    const shouldShow = window.scrollY > 200;
    if (shouldShow === visibleRef.current) return;
    visibleRef.current = shouldShow;
    setVisible(shouldShow);
  }, [dismissed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Start/stop loop when visibility changes ── */
  useEffect(() => {
    if (visible) {
      runLoop();
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setContentReady(true)),
      );
      return () => cancelAnimationFrame(id);
    } else {
      stopLoop();
      setContentReady(false);
      if (progressBarRef.current) progressBarRef.current.style.width = "0%";
    }
    return stopLoop;
  }, [visible, runLoop, stopLoop]);

  /* ── Hover: pause/resume by flag only — loop keeps running ── */
  const handleMouseEnter = () => {
    pausedRef.current = true;
  };
  const handleMouseLeave = () => {
    if (pausedRef.current) {
      pausedRef.current = false;
      // Reset slide timer so current slide gets a fresh interval after hover
      startRef.current = performance.now();
      if (progressBarRef.current) progressBarRef.current.style.width = "0%";
    }
  };

  /* ── Manual dot navigation ── */
  const goTo = (i) => {
    setActiveIdx(i);
    startRef.current = performance.now();
    if (progressBarRef.current) progressBarRef.current.style.width = "0%";
  };

  const combo = combos[activeIdx];
  const frontImage = combo?.img?.find((img) =>
    Object.values(img).some(
      (path) =>
        typeof path === "string" && path.toLowerCase().includes("front"),
    ),
  );

  // const handleAddToCart = (e) => {
  //   e.stopPropagation();
  //   // dispatch(addToCart({ id: combo.id, qty: 1 }));
  //   setAddedId(combo.id);
  //   setTimeout(() => setAddedId(null), 1800);
  // };

  // const handleBuyNow = (e) => {
  //   e.stopPropagation();
  //   navigate("/checkout");
  // };
  const handleCardClick = () => navigate(`/shop/${combo['category-url'].toLowerCase()}/${combo['name-url']}`);
  const handleDismiss = (e) => {
    e.stopPropagation();
    stopLoop();
    setVisible(false);
    setDismissed(true);
    visibleRef.current = false;
  };

  return (
    <>
      {/* <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Nunito:wght@400;500;600&display=swap');`}</style> */}

      <div className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center pointer-events-none">
        <div
          className="pointer-events-auto w-[min(96vw,660px)]"
          style={{
            transform: visible ? "translateY(0%)" : "translateY(110%)",
            transition: "transform 0.4s ease-out",
            willChange: "transform",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
            aria-label={`View ${combo.title} details`}
            className="relative cursor-pointer overflow-hidden rounded-t-2xl border border-b-0 border-emerald-500/20 px-4 pt-3 pb-4"
            style={{
              background:
                "linear-gradient(135deg, #091a08 0%, #112810 55%, #071507 100%)",
              boxShadow:
                "0 -20px 60px rgba(0,0,0,0.65), inset 0 -1px 0 rgba(134,239,172,0.06)",
            }}
          >
            {/* Glow blob */}
            <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full bg-emerald-400/10 blur-3xl" />

            {/* Close */}
            <button
              onClick={handleDismiss}
              aria-label="Close"
              className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/50 hover:text-white text-[10px] font-bold transition-all duration-200"
            >
              ✕
            </button>

            {/* Content */}
            <div
              style={{
                opacity: contentReady ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            >
              {/* Dots */}
              <div className="flex justify-center items-center gap-1.5 mb-2.5">
                {combos.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      goTo(i);
                    }}
                    aria-label={`Combo ${i + 1}`}
                    className={`border-none rounded-full cursor-pointer p-0 transition-all duration-300 ${
                      i === activeIdx
                        ? "w-5 h-[5px] bg-emerald-400"
                        : "w-[5px] h-[5px] bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Content row */}
              <div className="flex items-center gap-3">
                {/* Thumbnail */}
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 opacity-40 blur-[3px]" />
                  <div className="relative w-[66px] h-[66px] rounded-2xl bg-black/40 border border-emerald-400/20 overflow-hidden flex items-center justify-center">
                    <img
                      src={frontImage.lg}
                      alt={combo.title}
                      className="w-full h-full object-contain p-1 transition-transform duration-300 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <span
                    className={`absolute -top-2 -left-2 z-10 bg-gradient-to-r ${combo.badgeClass} text-white text-[8px] font-black tracking-wider uppercase px-1.5 py-[3px] rounded-md shadow-md`}
                  >
                    {/* {combo.badge} */}
                    Super Combo
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span
                    className="block text-[10px] font-semibold text-red-500 tracking-wide mb-0.5"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {/* {combo.tag} */}
                    Limited Time Deal
                  </span>
                  <h3
                    className="text-white text-[14px] leading-tight truncate mb-0.5"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                    }}
                  >
                    {combo.title}
                  </h3>
                  {/* <p className="text-white/40 text-[10px] truncate mb-1.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    {combo.subtitle}
                  </p> */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className="text-emerald-300 text-[17px] leading-none"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                      }}
                    >
                      ₹
                      {Math.round(
                        combo.price - (combo.price * combo.discount) / 100,
                      )}
                    </span>
                    <span className="text-white/30 text-[11px] line-through">
                      ₹{combo.price}
                    </span>
                    <span className="bg-emerald-950/80 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded-md tracking-wide border border-emerald-700/30">
                      {combo.discount}% OFF
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                 
                  <AddToCartBtn
                    item={combo}
                    qty={1}
                    extraClasses="flex gap-1 px-2 py-2 sm:text-base text-xs w-full items-center justify-center z-30"
                    action={()=>setVisible(false)}
                  />
                   {/* <BuyNowBtn
                    item={combo}
                    qty={1}
                    setIsCheckoutOpen={setIsCheckoutOpen}
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 font-extrabold px-6 py-1"
                    action={()=>setVisible(false)}
                  /> */}
                 
                </div>
              </div>

              {/* Hint */}
              <p className="text-center text-white/15 text-[9px] mt-2 tracking-[0.15em] uppercase select-none">
                tap to view full details
              </p>
            </div>

            {/* Progress bar — ref-driven, zero re-renders */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>
        <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
              />
      </div>
    </>
  );
};

export default ComboOfferPopup;
