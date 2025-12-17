import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  StarHalf,
  Truck,
  Shield,
  Package,
  CreditCard,
  Heart,
  CheckCircle,
  Award,
  Plus,
  Minus,
  MessageSquare, // For Reviews/FAQ
  Info,
  Wallet,
  RotateCcw,
  Smartphone, // For Additional Info/Why Us
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductQty from "../../components/productQty/ProductQty";
import AddToCartBtn from "../../components/add-to-cart-btn/AddToCartBtn";
import CheckDeliveryAvailability from "../../components/module/cart/CheckDeliveryAvailability";
import CheckoutModal from "../../components/CheckoutModal";
import BuyNowBtn from "../../components/add-to-cart-btn/BuyNowBtn";
import PeopleAlsoBought from "../../components/module/product-details/PeopleAlsoBought";
import WishListBtn from "../../components/add-to-cart-btn/WishListBtn";
import ShareBtn from "../../components/add-to-cart-btn/ShareBtn";
import ProductReviews from "./ProductReviews";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

// current product offers
const offers = [
  {
    tag: "BUNDLE",
    text: "FLAT 40% OFF on buying 2 or more items",
    code: null,
    highlight: true,
    category: "Organic Honey",
  },
  {
    tag: "BANK",
    text: "Instant 5% Off on Online Payments",
    code: null,
    highlight: false,
    category: "all",
  },
  // {
  //   tag: "COUPON",
  //   text: "Use code ORGANIC15 for extra 15% off",
  //   code: "ORGANIC15",
  //   highlight: false,
  // },
  // {
  //   tag: "FREEBIE",
  //   text: "Free sample pack on orders above ₹999",
  //   code: null,
  //   highlight: false,
  // },
];

const OfferBox = ({ offer }) => {
  return (
    <motion.div
      // key={idx}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className={`flex flex-col items-center p-1 min-w-32 w-32 h-24 rounded-lg cursor-pointer transition-all ${
        offer.highlight
          ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-300 shadow-md"
          : "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
      }`}
    >
      <motion.span
        animate={offer.highlight ? { scale: [1, 1.1, 1] } : {}}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className={`px-2 py-0.5 text-white text-xs font-bold rounded-full flex-shrink-0 ${
          offer.highlight ? "bg-orange-500" : "bg-green-600"
        }`}
      >
        {offer.tag}
      </motion.span>

      <div className="mt-2 flex-1 text-center">
        <p
          className={`text-xs font-medium ${
            offer.highlight ? "text-orange-800" : "text-gray-800"
          }`}
        >
          {offer.text}
          {offer.highlight && (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2 text-xs text-red-600 font-bold"
            >
              🔥 Most Popular
            </motion.span>
          )}
        </p>
        {offer.code && (
          <div className="mt-1">
            <span className="text-xs text-gray-600">Code:</span>
            <motion.span
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(34, 197, 94, 0)",
                  "0 0 0 4px rgba(34, 197, 94, 0.3)",
                  "0 0 0 0 rgba(34, 197, 94, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-2 py-0.5 bg-white border border-dashed border-green-500 text-green-700 text-xs font-bold rounded"
            >
              {offer.code}
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const StarRating = ({ rating, size = 20 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 !== 0;
        return (
          <div key={i}>
            {filled ? (
              <Star size={size} fill="#F59E0B" color="#F59E0B" />
            ) : half ? (
              <StarHalf size={size} fill="#F59E0B" color="#F59E0B" />
            ) : (
              <Star size={size} color="#D1D5DB" />
            )}
          </div>
        );
      })}
    </div>
  );
};

const FeatureIcon = ({ icon: Icon, title, color = "#7A2E1D" }) => (
  <motion.div
    className="flex flex-col items-center gap-2 xs:p-4 bg-white rounded-xl shadow-sm"
    whileHover={{ y: -4, shadow: "0 8px 16px rgba(0,0,0,0.1)" }}
  >
    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
      <Icon size={24} style={{ color }} />
    </div>
    <span className="text-xs font-medium text-gray-700 text-center">
      {title}
    </span>
  </motion.div>
);
const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <motion.div
    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
    initial={false}
  >
    <button
      onClick={onClick}
      className="w-full px-5 py-3.5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
    >
      <span className="font-semibold text-left text-gray-800 text-lg">
        {title}
      </span>
      {isOpen ? (
        <ChevronUp size={20} className="text-orange-500" />
      ) : (
        <ChevronDown size={20} className="text-gray-500" />
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50"
        >
          <p className="px-5 py-4 text-gray-700 leading-relaxed">{content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const AccordionListItem = ({ title, content, isOpen, onClick }) => (
  <motion.div
    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
    initial={false}
  >
    <button
      onClick={onClick}
      className="w-full px-5 py-3.5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
    >
      <span className="font-semibold text-left text-gray-800 text-lg">
        {title}
      </span>
      {isOpen ? (
        <ChevronUp size={20} className="text-orange-500" />
      ) : (
        <ChevronDown size={20} className="text-gray-500" />
      )}
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50"
        >
          <div className="px-5 py-4 text-gray-700 leading-relaxed">
            {Array.isArray(content)
              ? content.map((item, index) => (
                  <p key={index} className="mb-2 last:mb-0">
                    {item}
                  </p>
                ))
              : content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// --- Main Component ---

// Custom hook to detect when an element is out of view
const useStickyDetector = (ref, actionButtonRef) => {
  const [isSticky, setIsSticky] = useState(false);
  const [showMobileTabs, setShowMobileTabs] = useState(false);

  useEffect(() => {
    const checkSticky = () => {
      if (actionButtonRef.current) {
        // Check if the Buy Now/Add to Cart section is above the viewport top (i.e., scrolled past)
        const rect = actionButtonRef.current.getBoundingClientRect();
        setIsSticky(rect.top < -50); // Be sticky if scrolled 50px past the button section

        // Mobile Tabs logic: Check if the whole main body (ref) is above the viewport top.
        // We'll use a simplified check for this, checking if the scroll position has passed a certain threshold.
        // A more robust implementation would use IntersectionObserver.
        if (window.innerWidth < 768) {
          // Only for mobile (sm breakpoint)
          const bodyRect = ref.current?.getBoundingClientRect();
          if (bodyRect) {
            // Show tabs when the main image/info section is scrolled past the top
            setShowMobileTabs(bodyRect.top < -300);
          }
        } else {
          setShowMobileTabs(false);
        }
      }
    };

    window.addEventListener("scroll", checkSticky);
    return () => window.removeEventListener("scroll", checkSticky);
  }, [actionButtonRef, ref]);

  return { isSticky, showMobileTabs };
};

const ProductDetails = () => {
  const { nameUrl } = useParams();
  const [product, setProduct] = useState(null);
  const [curProductSeoData, setProductSeoData] = useState({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  // const product = mockProduct;
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(0); // For dropdowns
  const [activeMobileTab, setActiveMobileTab] = useState("description");
  // const [imageLoading, setImageLoading] = useState(false);

  const actionButtonRef = useRef(null); // Ref for action buttons section (to check visibility)
  const productDetailsRef = useRef(null); // Ref for the main page body (for scroll detection)

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  // const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);


  const getProductDetail = async (nameUrl) => {
    try {
      const response = await axios.get(
        `${apiUrl}/products/product/details/${nameUrl}`
      );
      if (response.status === 200) {
        setProductSeoData(response.data.seoData);
        setProduct(response.data);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        // Adjust this value based on your header height if any
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getProductDetail(nameUrl);
  }, [nameUrl]);

  // Refs for jump links
  const sectionsRefs = {
    description: useRef(null),
    faqs: useRef(null),
    reviews: useRef(null),
    whyus: useRef(null),
    additionalinfo: useRef(null),
  };

  const { isSticky, showMobileTabs } = useStickyDetector(
    productDetailsRef,
    actionButtonRef
  );
  const finalPrice = useMemo(
    () =>
      Math.round(
        product?.details?.price -
          (product?.details?.price * product?.details?.discount) / 100
      ),
    [product?.details.price, product?.details.discount]
  );

  const pricePerGram = useMemo(() => {
    const weightMatch = product?.details.weight.match(/(\d+)/);
    const weightInGrams = weightMatch ? parseInt(weightMatch[1]) : 1;
    return (finalPrice / weightInGrams).toFixed(2);
  }, [finalPrice, product?.details.weight]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const faqs = useMemo(
    () => [
      {
        id: "q1",
        question: "Is this product 100% organic?",
        answer:
          "Yes, our coffee beans are certified organic and grown without synthetic pesticides or fertilizers.",
      },
      {
        id: "q2",
        question: "What is the best way to store coffee beans?",
        answer:
          "Store in an airtight container in a cool, dark place. Avoid refrigeration as it can introduce moisture.",
      },
      {
        id: "q3",
        question: "How long does shipping take?",
        answer:
          "We typically ship within 24 hours. Delivery takes 3-5 business days depending on your location.",
      },
    ],
    []
  );

  const productDescriptionSections = useMemo(() => {
    const sections = [
      {
        id: 1,
        title: "Product Description",
        content: product?.productInfo?.description,
      },
      {
        id: 2,
        title: "Health Benefits",
        content: product?.productInfo?.healthBenefits,
      },
      {
        id: 3,
        title: "Taste & Texture",
        content: product?.productInfo?.tasteTexture,
      },
      {
        id: 4,
        title: "How to Use",
        content: product?.productInfo?.howToUse,
      },
      {
        id: 5,
        title: "Storage Guidelines",
        content: product?.productInfo?.storageGuidelines,
      },
    ];

    // Filter out sections where content is empty, null, or undefined
    return sections.filter((section) => section.content);
  }, [product?.productInfo]);


  const mobileTabs = useMemo(
    () => [
      {
        id: "description",
        label: "Description",
        icon: Info,
        ref: sectionsRefs.description,
        skip: false,
      },
      {
        id: "reviews",
        label: "Reviews",
        icon: Star,
        ref: sectionsRefs.reviews,
        skip: false,
      },
      {
        id: "faqs",
        label: `FAQ's`,
        icon: MessageSquare,
        ref: sectionsRefs.faqs,
        // skip: product?.productInfo?.faqs.length === 0 ? true : false,
        skip: (product?.productInfo?.faqs?.length ?? 0) === 0 ? true : false,
      },
      {
        id: "whyus",
        label: "Why Us",
        icon: Award,
        ref: sectionsRefs.whyus,
        skip: false,
      },
      {
        id: "additionalinfo",
        label: "Info",
        icon: Package,
        ref: sectionsRefs.additionalinfo,
        skip: false,
      },
    ],
    [sectionsRefs]
  );

  const scrollToSection = useCallback(
    (id) => {
      const element = sectionsRefs[id].current;
      if (element) {
        // Scroll to element with an offset for the sticky mobile tab bar
        const offset = window.innerWidth < 768 && showMobileTabs ? 60 : 0;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setActiveMobileTab(id);
      }
    },
    [showMobileTabs, sectionsRefs]
  );

  const nextImage = useCallback(
    () => setSelectedImage((prev) => (prev + 1) % product.details.img.length),
    [product?.details.img.length]
  );

  const prevImage = useCallback(
    () =>
      setSelectedImage(
        (prev) =>
          (prev - 1 + product.details.img.length) % product.details.img.length
      ),
    [product?.details.img.length]
  );

  // Set the theme color as a CSS variable for buttons
  // useEffect(() => {
  //   document.documentElement.style.setProperty("--themeColor", "#F97316"); // Orange-500
  // }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" ref={productDetailsRef}>
      {/* Mobile Sticky Tabs */}
      <AnimatePresence>
        {showMobileTabs && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 overflow-x-auto"
          >
            <div className="flex justify-between py-2 px-4 gap-2">
              {mobileTabs.filter((tab) => !tab.skip).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`flex-1 flex flex-col items-center p-2 rounded-lg text-sm font-medium transition-colors ${
                    activeMobileTab === tab.id
                      ? "text-orange-600 bg-orange-50 border-b-2 border-orange-500"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image Gallery */}

            <motion.div variants={itemVariants} className="space-y-6">
              {/* Main Image */}
              <div className="relative">
                <motion.div
                  className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                  style={{ backgroundColor: "#FFFFFF" }}
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  onClick={() => setIsFullScreen(true)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      src={product.details.img[selectedImage].lg}
                      alt={product.details.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  {/* Navigation Arrows */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: "#F5EFE6", color: "#7A2E1D" }}
                  >
                    <ChevronLeft />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: "#F5EFE6", color: "#7A2E1D" }}
                  >
                    <ChevronRight />
                  </motion.button>

                  {/* Image Counter */}
                  <div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm font-semibold"
                    style={{ backgroundColor: "rgba(122, 46, 29, 0.8)" }}
                  >
                    {selectedImage + 1} / {product.details.img.length}
                  </div>
                </motion.div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-4 overflow-x-auto p-2 scrollbar-hide">
                {product.details.img.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      // setImageLoading(true);
                      setSelectedImage(index);
                      // setTimeout(() => setImageLoading(false), 100);
                    }}
                    className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
                      selectedImage === index
                        ? "ring-4 shadow-xl transform scale-105"
                        : "hover:scale-110 shadow-md"
                    }`}
                    style={{
                      borderColor:
                        selectedImage === index ? "#9B7A2F" : "#DCD2C0",
                      ringColor:
                        selectedImage === index ? "#9B7A2F" : "transparent",
                    }}
                  >
                    <img
                      src={image.lg}
                      alt={`${product.details.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right - Product Info (Optimized for ATF on desktop) */}
            <div className="flex flex-col">
              <div className="flex-1">
                {/* Title and Ratings */}
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1">
                  {product?.details.name}
                </h1>
                {/* USPs */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {product?.productInfo?.usps?.map((usp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium flex items-center gap-1"
                    >
                      <CheckCircle size={16} />
                      {usp}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mb-1 pb-2 border-b border-gray-100">
                  <StarRating rating={product.averageRating} size={16} />
                  <span className="font-semibold text-gray-900">
                    {product.averageRating}
                  </span>
                  <a
                    href="#reviews"
                    onClick={() => scrollToSection("reviews")}
                    className="text-orange-600 hover:text-orange-700 font-medium underline-offset-4 hover:underline transition-colors"
                  >
                    ({product.reviews.length} reviews)
                  </a>
                </div>

                {/* Net Content & Price per Gram */}

                <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                  <p className="text-center">
                    <span className=" text-xs font-medium">Net Content</span>{" "}
                    <span className="font-semibold text-gray-900">
                      ({product.details.weight})
                    </span>
                  </p>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="text-center">
                    <span className=" text-xs font-medium">Price per Gram</span>{" "}
                    <span className="font-semibold text-gray-900">
                      (₹{pricePerGram}/g)
                    </span>
                  </div>
                </div>

                {/* Pricing Block */}
                <div className="bg-orange-50 rounded-xl px-4 py-2 mb-4 shadow-inner">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-extrabold text-gray-900">
                      ₹{finalPrice}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.details.price}
                    </span>
                    <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold shadow-md">
                      {product.details.discount}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    Inclusive of all taxes
                  </p>

                  {/* Shipping & COD Info */}
                  <div className="flex flex-wrap gap-2 mb-1">
                    <div className="flex items-center gap-2 text-xs text-green-700 bg-green-100 px-2 py-1 rounded-lg font-semibold">
                      <Truck size={14} />
                      Free Shipping (Above ₹399)
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-lg font-semibold">
                      <Wallet size={14} />
                      COD Available
                    </div>
                  </div>
                </div>

                {/* Available Offers */}
                <div className="mb-2">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-orange-500"
                      >
                        <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" />
                        <path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" />
                      </svg>
                    </motion.div>
                    Available Offers
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full"
                    >
                      HOT
                    </motion.span>
                  </h3>

                  <div className="flex gap-4 overflow-x-auto scrollbar-hide  py-1">
                    {product.details.category === "Organic Honey" && (
                      <OfferBox offer={offers[0]} />
                    )}
                    <OfferBox offer={offers[1]} />
                  </div>
                  {/* Limited Time Banner */}
                  {/* <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg overflow-hidden relative"
                  >
                    <motion.div
                      animate={{ x: ["100%", "-100%"] }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="whitespace-nowrap text-white text-xs font-semibold"
                    >
                      ⏰ Limited Time Offer! • Sale ends in 24 hours • Don't
                      miss out! • ⏰ Limited Time Offer! • Sale ends in 24 hours
                      • Don't miss out!
                    </motion.div>
                  </motion.div> */}
                </div>

                {/* Action Buttons & Quantity (non-sticky desktop view) */}
                <div
                  ref={actionButtonRef}
                  className="pb-6 border-b lg:border-none lg:pb-0"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-semibold text-gray-700">
                      Quantity:
                    </span>
                    <ProductQty qty={qty} setQty={setQty} />
                  </div>

                  <div className="w-full space-y-3 sm:space-y-0">
                    {/* Mobile: Stacked layout */}
                    <div className="flex flex-col gap-3 sm:hidden">
                      <AddToCartBtn
                        item={product.details}
                        qty={qty}
                        extraClasses="flex py-4 gap-1 w-full items-center justify-center z-30"
                      />
                      <BuyNowBtn
                        item={product.details}
                        qty={qty}
                        setIsCheckoutOpen={setIsCheckoutOpen}
                        className="flex-1 font-bold text-lg py-4 touch-manipulation"
                      />
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsWishlisted(!isWishlisted)}
                          className="flex-1 p-4 sm:h-full max-h-10 border-2 border-gray-300 rounded-xl hover:border-red-500 active:border-red-600 transition-all flex items-center justify-center gap-2 touch-manipulation"
                          // className="flex items-center justify-center border-2 max-h-min"
                          aria-label={
                            isWishlisted
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                        >
                          <Heart
                            size={22}
                            className="flex-shrink-0"
                            fill={isWishlisted ? "#EF4444" : "none"}
                            color={isWishlisted ? "#EF4444" : "#6B7280"}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Wishlist
                          </span>
                        </motion.button>
                        <ShareBtn product={product} className="flex-1" />
                      </div>
                    </div>

                    {/* Tablet+: All in one line */}
                    <div className="hidden sm:flex gap-3">
                      <AddToCartBtn
                        item={product.details}
                        qty={qty}
                        extraClasses="flex flex-1 gap-1 w-full items-center justify-center z-30"
                      />
                      <BuyNowBtn
                        item={product.details}
                        qty={qty}
                        setIsCheckoutOpen={setIsCheckoutOpen}
                        className="flex-1 font-bold text-lg py-4 touch-manipulation"
                      />
                      <WishListBtn productId={product?.details["name-url"]} />
                      <ShareBtn product={product} />
                    </div>
                  </div>

                  {/* Trust Line & Guarantee */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-1 text-xs sm:text-sm">
                    <div className="flex items-center sm:gap-4 gap-2 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Shield size={16} className="text-green-600" />
                        Secure payment
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Truck size={16} className="text-blue-600" />
                        Fast delivery
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <RotateCcw size={16} className="text-purple-600" />
                        Easy returns
                      </span>
                    </div>
                    <button className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
                      <CheckCircle size={16} />
                      7-Day Return Policy
                    </button>
                  </div>
                </div>

                {/* Pincode Checker */}
                <CheckDeliveryAvailability />

                {/* Trust Badges - Optimized Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 ">
                  {/* <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
                    <Shield size={18} className="text-green-600" />
                    <span className="text-xs font-semibold text-gray-700">
                      FSSAI
                    </span>
                    <span className="text-xs text-gray-500">Lic: 12345</span>
                  </div> */}
                  <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
                    <CheckCircle size={18} className="text-green-600" />
                    <span className="text-xs font-semibold text-gray-700">
                      Lab Tested
                    </span>
                    <span className="text-xs text-gray-500">Certified</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
                    <Award size={18} className="text-green-600" />
                    <span className="text-xs font-semibold text-gray-700">
                      Pure
                    </span>
                    <span className="text-xs text-gray-500">Verified</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
                    <CreditCard size={18} className="text-blue-600" />
                    <span className="text-xs font-semibold text-gray-700">
                      Secure
                    </span>
                    <span className="text-xs text-gray-500">Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {product.productInfo?.video && (
        <div className="bg-white mt-8 py-12 scroll-smooth">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              See It In Action
            </h2>
            <div className=" bg-gray-900 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-center">
                {/* Video player with auto-fit */}
                <video
                  src={product.productInfo?.video}
                  className="w-full h-[400px] object-center rounded-lg border"
                  controls
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <hr className="border-t border-gray-200" />

      {/* Product Description, FAQs, Reviews, etc. Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Product Description, Health Benefits, etc. */}
        {productDescriptionSections.length > 0 && (
          <section
            className="mb-10"
            id="description"
            ref={sectionsRefs.description}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
              Product Information
            </h2>
            <div className="space-y-4">
              {productDescriptionSections.map((section, index) => {
                if (section.content !== "")
                  return (
                    <AccordionListItem
                      key={section.id}
                      title={section.title}
                      content={section.content}
                      isOpen={openAccordion === section.id}
                      onClick={() =>
                        setOpenAccordion(
                          openAccordion === section.id ? null : section.id
                        )
                      }
                    />
                  );
              })}
            </div>
          </section>
        )}

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-start flex-wrap sm:flex-nowrap justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Lab Tested & Certified
                </h3>
                <p className="text-gray-700 mb-3 sm:text-base text-sm">
                  Our products undergo rigorous third-party laboratory testing
                  to ensure purity, quality, and safety. Each batch is tested
                  for contaminants, pesticides, and heavy metals.
                </p>
                <div className="flex flex-wrap gap-2 sm:text-sm text-xs">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full  font-medium">
                    Pesticide Free
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full  font-medium">
                    Heavy Metal Tested
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full  font-medium">
                    Microbiological Safe
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-max">
              <button className="px-4 py-2 w-full bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
                View Report
              </button>
            </div>
          </div>
        </motion.div> */}

        {/* Product Gallery (Re-added Section) */}
        <div className="py-10">
          {/* <h2 className="text-3xl font-bold border-b text-gray-900 mb-6 pb-3 text-center">
            Product Gallery
          </h2> */}
          {product.productInfo?.additionalImages.length > 0 && (
            <div className="bg-white py-12 rounded-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.productInfo.additionalImages.map((image, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl overflow-hidden shadow-lg cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onClick={() => {
                          setSelectedImage(idx);
                          setIsFullScreen(true);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {product.reviews.length > 0 && (
          <div id="reviews" ref={sectionsRefs.reviews}>
            <ProductReviews
              reviews={product.reviews}
              otherReviews={product.productInfo?.otherReviews}
              averageRating={product.averageRating}
              totalReviews={product.reviews.length}
              productId={product?.details["name-url"]}
            />
          </div>
        )}

        {/* FAQ's */}
        {product.productInfo?.faqs.length > 0 && (
          <section className="mb-10" id="faqs" ref={sectionsRefs.faqs}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  title={faq.question}
                  content={faq.answer}
                  isOpen={openAccordion === faq.id}
                  onClick={() =>
                    setOpenAccordion(openAccordion === faq.id ? null : faq.id)
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* Why Us / USPs */}
        <section
          className="mb-10 mt-20 text-center"
          id="whyus"
          ref={sectionsRefs.whyus}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 mt-10">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                desc: "Hand-picked and quality tested for the finest experience.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Quick and reliable shipping across all major locations in India.",
              },
              {
                icon: Shield,
                title: "100% Authentic",
                desc: "Genuine organic products sourced directly from trusted farmers.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 text-center shadow-xl transition-all"
              >
                <item.icon size={40} className="text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Points */}
          {product.productInfo?.whyUs.length > 0 && (
            <div className="bg-white rounded-2xl p-8 mt-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.productInfo?.whyUs.map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-green-50 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    <CheckCircle
                      size={20}
                      className="text-green-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700 font-medium text-left">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* People Also Bought */}
        <PeopleAlsoBought
          categoryUrl={product.details["category-url"].toLowerCase()}
        />

        {/* Additional Info */}
        {product.productInfo && product.productInfo?.additionalInfo?.brand !== "" && (
          <section
            className="mb-10 mt-10"
            id="additionalinfo"
            ref={sectionsRefs.additionalinfo}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
              Additional Details
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 sm:grid-cols-3 gap-6">
              {product.productInfo &&
                Object.entries(product.productInfo.additionalInfo).map(
                  ([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </dt>
                      <dd className="text-base font-semibold text-gray-900">
                        {value}
                      </dd>
                    </div>
                  )
                )}
            </div>
          </section>
        )}

        {/* Service Highlights */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid  grid-cols-3 gap-8 text-center">
              <FeatureIcon icon={Truck} title="Fast Delivery" color="#3B82F6" />
              <FeatureIcon
                icon={RotateCcw}
                title="Easy Returns"
                color="#9333EA"
              />
              <FeatureIcon
                icon={Shield}
                title="Secure Checkout"
                color="#10B981"
              />
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-200" />

        {/* Payment Methods */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              {" "}
              We Accept{" "}
            </h3>
            <div className="bg-white rounded-xl w-full xs:p-4 py-2 shadow-sm">
              <div className="flex flex-wrap justify-center items-center gap-4">
                {[
                  { icon: CreditCard, label: "Cards" },
                  { icon: Smartphone, label: "UPI" },
                  { icon: Wallet, label: "Wallets" },
                  { icon: Package, label: "COD" },
                ].map((payment, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    <payment.icon size={20} color="#6B7280" />
                    <span className="text-sm font-medium text-gray-700">
                      {" "}
                      {payment.label}{" "}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-orange-500 shadow-2xl z-20"
          >
            <div className="max-w-7xl mx-auto px-3 py-3 sm:px-4 sm:py-4">
              {/* Mobile Layout (< md) */}
              <div className="md:hidden space-y-3">
                {/* Product Info Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">
                      {product.details.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold text-orange-600">
                        ₹{finalPrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.details.price}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Control - Compact */}
                  <ProductQty qty={qty} setQty={setQty} />
                </div>

                {/* Action Buttons Row */}
                <div className="flex gap-2">
                  <AddToCartBtn
                    item={product.details}
                    qty={qty}
                    extraClasses="flex flex-1 gap-1 w-full items-center justify-center z-30"
                  />

                  <BuyNowBtn
                    item={product.details}
                    qty={qty}
                    setIsCheckoutOpen={setIsCheckoutOpen}
                    className="flex-1 font-bold text-lg py-4 touch-manipulation"
                  />
                </div>
              </div>

              {/* Tablet Layout (md to lg) */}
              <div className="hidden md:flex lg:hidden items-center justify-between gap-4">
                {/* Left: Product Info */}
                <div className="flex flex-col gap-1 min-w-0 flex-shrink">
                  <h4 className="text-base font-bold text-gray-900 line-clamp-1">
                    {product.details.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-orange-600">
                      ₹{finalPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.details.price}
                    </span>
                  </div>
                </div>

                {/* Middle: Quantity */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-semibold text-gray-700 text-sm">
                    Qty:
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <motion.button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-3 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
                      whileTap={{ scale: 0.95 }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={18} />
                    </motion.button>
                    <span className="px-4 py-2 font-bold border-x border-gray-300 min-w-[50px] text-center">
                      {qty}
                    </span>
                    <motion.button
                      onClick={() => setQty(qty + 1)}
                      className="px-3 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
                      whileTap={{ scale: 0.95 }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex gap-3 flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[var(--themeColor)] hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg transition-all touch-manipulation whitespace-nowrap"
                  >
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg transition-all touch-manipulation"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </div>

              {/* Desktop Layout (lg+) */}
              <div className="hidden lg:flex items-center justify-between gap-6">
                {/* Left: Product Info */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-bold text-gray-900 line-clamp-1">
                      {product.details.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-extrabold text-orange-600">
                        ₹{finalPrice}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.details.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle: Quantity */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-semibold text-gray-700">Quantity:</span>
                  <ProductQty qty={qty} setQty={setQty} />
                </div>

                {/* Right: Actions */}
                <div className="flex gap-3 flex-shrink-0">
                  <AddToCartBtn
                    item={product.details}
                    qty={qty}
                    extraClasses="flex gap-1 hover:bg-orange-600 font-extrabold px-6 py-3"
                  />
                  <BuyNowBtn
                    item={product.details}
                    qty={qty}
                    setIsCheckoutOpen={setIsCheckoutOpen}
                    className="font-extrabold px-6 py-3"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(62, 44, 27, 0.95)" }}
            onClick={() => setIsFullScreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-2xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.details.img[selectedImage].lg}
                alt={product.details.name}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />

              {/* Close Button */}
              <motion.button
                onClick={() => setIsFullScreen(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-white shadow-lg"
                style={{ backgroundColor: "rgba(122, 46, 29, 0.8)" }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#7A2E1D",
                  rotate: 90,
                }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>

              {/* Navigation */}
              <motion.button
                onClick={prevImage}
                className="absolute left-1 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white shadow-lg"
                style={{ backgroundColor: "rgba(122, 46, 29, 0.8)" }}
                // whileHover={{ scale: 1.1, backgroundColor: '#7A2E1D' }}
                // whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white shadow-lg"
                style={{ backgroundColor: "rgba(122, 46, 29, 0.8)" }}
                // whileHover={{ scale: 1.1, backgroundColor: '#7A2E1D' }}
                // whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={16} />
              </motion.button>

              {/* Image Counter */}
              <div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white font-bold"
                style={{ backgroundColor: "rgba(122, 46, 29, 0.9)" }}
              >
                {selectedImage + 1} / {product.details.img.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Write a Review
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star size={32} color="#F59E0B" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Summarize your experience"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Share your thoughts about the product..."
                  />
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors">
                  Submit Review
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default ProductDetails;
