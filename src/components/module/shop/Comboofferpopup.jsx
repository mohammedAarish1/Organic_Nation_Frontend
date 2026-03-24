import { X } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartBtn from "../../add-to-cart-btn/AddToCartBtn";



// ─── Main Component ────────────────────────────────────────────────────────
export default function ComboOfferPopup({ combos = [] }) {
  const [visible, setVisible] = useState(false);
  const sliderRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    sessionStorage.removeItem("offerPopup"); // ← reset on every page load/refresh
  }, []);
  // Show strip after user scrolls ~120 px
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) {
        const isCLosed = sessionStorage.getItem("offerPopup");
        if (!isCLosed) {
          setVisible(true);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePopupClose = () => {
    setVisible(false);
    sessionStorage.setItem("offerPopup", true);
  };

  return (
    <>
      {/* sentinel so layout isn't affected */}
      <div ref={sentinelRef}  />

      {/* ── Sticky bottom strip ─────────────────────────────────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out will-change-transform
          ${visible ? "translate-y-0" : "translate-y-full"}`}
        style={{ filter: "drop-shadow(0 -4px 24px rgba(0,0,0,.18))" }}
      >
        {/* Glass header bar */}
        <div
          className="flex items-center justify-between px-4 py-1 bg-orange-600"
        >
          <div className="flex items-center  gap-2">
            <span className="text-white text-lg">🎁</span>
            <span className="text-white font-bold text-xs tracking-wide uppercase">
              Combo Offer
            </span>
            <span className="bg-white text-green-500 text-xs font-semibold px-2 py-0.5 rounded-full animate-pulse">
              Limited time deals
            </span>
          </div>
          <button onClick={handlePopupClose} className="text-white/80 text-xs ">
            <X size={18} />
          </button>
        </div>

        {/* Slider */}
        <div
          style={{
            background: "linear-gradient(180deg,#fff8f0 0%,#ffffff 100%)",
            borderTop: "1px solid #ffe0c0",
          }}
        >
          <div
            ref={sliderRef}
            className="flex gap-3  sm:justify-center ml-2 sm:ml-0 overflow-x-auto px-3 py-1 cursor-grab select-none"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {combos.map((combo) => {
              return (
                <ComboCard
                  key={combo._id}
                  combo={combo}
                />
              );
            })}
            {/* Spacer so last card isn't clipped */}
            <div className="min-w-[8px] flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Bottom padding so page content isn't hidden behind strip */}
      {visible && <div className="h-[168px] sm:h-[160px]" />}
    </>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────
function ComboCard({ combo, }) {
  const navigate=useNavigate()
  const frontImage = combo?.img?.find((img) =>
    Object.values(img).some(
      (path) =>
        typeof path === "string" && path.toLowerCase().includes("front"),
    ),
  );

  const handleCardClick = useCallback(
    () => navigate(`/shop/${combo['category-url'].toLowerCase()}/${combo['name-url']}`),
    [navigate],
  );

  return (
    <div
      onClick={handleCardClick}
      className="relative flex-shrink-0 rounded-2xl overflow-hidden border border-orange-100
        active:scale-95 transition-transform duration-150 cursor-pointer"
      style={{
        width: "clamp(140px, 30vw, 180px)",
        scrollSnapAlign: "start",
        background: "#fff",
        boxShadow: "0 2px 12px rgba(255,107,53,.12)",
      }}
    >
      {/* Discount badge */}
      <span
        className="absolute top-2 left-2 z-10 text-white text-[10px] font-bold
          px-1.5 py-0.5 rounded-full"
        style={{ background: "linear-gradient(135deg,#ff6b35,#f7931e)" }}
      >
        -{combo.discount}%
      </span>

      {/* Tag badge */}
      <span
        className="absolute top-2 right-2 z-10 bg-white/90 text-[9px] font-semibold
          text-orange-600 px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap"
      >
       🔥 Best Seller
      </span>

      {/* Image */}
      <div className="w-full overflow-hidden" style={{ height: "90px" }}>
        <img
          src={frontImage.lg}
          alt={combo.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
          draggable={false}
          
        />
      </div>

      {/* Body */}
      <div className="px-2.5 pt-2 pb-2.5">
        <p className="font-bold text-gray-800 text-xs leading-tight truncate">
          {combo.name}
        </p>
        <p className="text-gray-400 text-[10px] truncate mt-0.5">
          {combo.description}
        </p>

        {/* Price row */}
        <div className="flex items-center gap-1 mt-1.5">
          <span className="text-orange-500 font-extrabold text-sm">
            ₹{Math.round(combo.price - (combo.price * combo.discount) / 100)}
          </span>
          <span className="text-gray-800 line-through text-[10px]">
            ₹{combo.price}
          </span>
        </div>

        {/* Add to cart */}
        <AddToCartBtn
          item={combo}
          qty={1}
          extraClasses="flex gap-1 px-2 py-2 sm:text-base text-xs w-full items-center justify-center z-30"
        />
      </div>
    </div>
  );
}
