import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  Shield,
  Package,
  CreditCard,
  CheckCircle,
  Award,
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
import CheckoutModal from "../../components/CheckoutModal";
import BuyNowBtn from "../../components/add-to-cart-btn/BuyNowBtn";
import PeopleAlsoBought from "../../components/module/product-details/PeopleAlsoBought";
import ProductReviews from "./ProductReviews";
import SEO from "../../helper/SEO/SEO";
import ProductAdditionalInfo from "../../components/module/product-details/ProductAdditionalInfo";
import ProductFaqs from "../../components/module/product-details/ProductFaqs";
import ProductImageSection from "../../components/module/product-details/ProductImageSection";
import ProductInfo from "../../components/module/product-details/ProductInfo";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const AdditionalImages = memo(({ 
  additionalImages,
  setFullScreenImages,
  setFullScreenIndex,
  setIsFullScreen
 }) => {
  return (
    <div className="bg-white py-12 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalImages.map((image, idx) => (
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
                  setFullScreenImages(additionalImages);
                  setFullScreenIndex(idx);
                  setIsFullScreen(true);
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

const WhyUs = memo(({ whyUs }) => {
  return (
    <section>
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
      {whyUs.length > 0 && (
        <div className="bg-white rounded-2xl p-8 mt-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyUs.map((point, idx) => (
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
  );
});

const PaymentMethod = memo(() => {
  return (
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
  );
});
const FeatureIcon = memo(({ icon: Icon, title, color = "#7A2E1D" }) => (
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
));

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
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  // const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState("description");
  // const [imageLoading, setImageLoading] = useState(false);
  const actionButtonRef = useRef(null); // Ref for action buttons section (to check visibility)
  const productDetailsRef = useRef(null); // Ref for the main page body (for scroll detection)

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImages, setFullScreenImages] = useState([]); // Add this
  const [fullScreenIndex, setFullScreenIndex] = useState(0); // Add this
  // const [isSticky, setIsSticky] = useState(false);
  // const stickyRef = useRef(null);

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (stickyRef.current) {
  //       const rect = stickyRef.current.getBoundingClientRect();
  //       // Adjust this value based on your header height if any
  //       setIsSticky(rect.top <= 0);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

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

  // const faqs = useMemo(
  //   () => [
  //     {
  //       id: "q1",
  //       question: "Is this product 100% organic?",
  //       answer:
  //         "Yes, our coffee beans are certified organic and grown without synthetic pesticides or fertilizers.",
  //     },
  //     {
  //       id: "q2",
  //       question: "What is the best way to store coffee beans?",
  //       answer:
  //         "Store in an airtight container in a cool, dark place. Avoid refrigeration as it can introduce moisture.",
  //     },
  //     {
  //       id: "q3",
  //       question: "How long does shipping take?",
  //       answer:
  //         "We typically ship within 24 hours. Delivery takes 3-5 business days depending on your location.",
  //     },
  //   ],
  //   []
  // );

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
      <SEO
        title={curProductSeoData?.title || ""}
        description={curProductSeoData?.description || ""}
        keywords={curProductSeoData?.keywords || ""}
        canonicalUrl={curProductSeoData?.canonicalUrl || ""}
        ogTitle={curProductSeoData?.title || ""}
        ogDescription={curProductSeoData?.description || ""}
        ogUrl={curProductSeoData?.canonicalUrl || ""}
        ogImage={curProductSeoData?.image || ""}
        ogImageWidth="478"
        ogImageHeight="446"
        twitterTitle={curProductSeoData?.title || ""}
        twitterDescription={curProductSeoData?.description || ""}
        twitterImage={curProductSeoData?.image || ""}
        twitterSite="Organic Nation"
        twitterCreator="organicnation_"
      />
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
              {mobileTabs
                .filter((tab) => !tab.skip)
                .map((tab) => (
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image Gallery */}

            <ProductImageSection
              product={product.details}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              setIsFullScreen={setIsFullScreen}
              setFullScreenImages={setFullScreenImages}
              setFullScreenIndex={setFullScreenIndex}
              nextImage={nextImage}
              prevImage={prevImage}
            />
            {/* Right - Product Info (Optimized for ATF on desktop) */}
            <ProductInfo
              product={product}
              qty={qty}
              setQty={setQty}
              setIsCheckoutOpen={setIsCheckoutOpen}
              actionButtonRef={actionButtonRef}
            />
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
        {product?.productInfo && (
          <div
            className="mb-10"
            id="description"
            ref={sectionsRefs.description}
          >
            <ProductAdditionalInfo productInfo={product?.productInfo} />
          </div>
        )}

        {/* Additional Images section */}
        <div className="py-10">
          {product.productInfo?.additionalImages.length > 0 && (
            <AdditionalImages
              additionalImages={product.productInfo?.additionalImages}
              setFullScreenImages={setFullScreenImages}
              setFullScreenIndex={setFullScreenIndex}
              setIsFullScreen={setIsFullScreen}
            />
          )}
        </div>

        {/* reviews section  */}
        {product.reviews.length > 0 && (
          <div id="reviews" ref={sectionsRefs.reviews}>
            <ProductReviews
              reviews={product.reviews}
              otherReviews={product.productInfo?.otherReviews}
              averageRating={product.averageRating}
              totalReviews={product.reviews.length}
              productId={product?.details["name-url"]}
              categoryUrl={product?.details['category-url']}
            />
          </div>
        )}

        {/* FAQ's */}
        {product.productInfo?.faqs.length > 0 && (
          <div className="mb-10" id="faqs" ref={sectionsRefs.faqs}>
            <ProductFaqs faqs={product.productInfo?.faqs} />
          </div>
        )}

        {/* Why Us section */}
        <div
          className="mb-10 mt-20 text-center"
          id="whyus"
          ref={sectionsRefs.whyus}
        >
          <WhyUs whyUs={product.productInfo?.whyUs ||[]} />
        </div>
        {/* People Also Bought */}
        <PeopleAlsoBought
          categoryUrl={product.details["category-url"].toLowerCase()}
        />

        {/* Additional Info */}
        {product.productInfo &&
          product.productInfo?.additionalInfo?.brand !== "" && (
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
        <PaymentMethod />
      </div>

      {/* sticky buttons  */}
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
                // src={product.details.img[selectedImage].lg}
                src={fullScreenImages[fullScreenIndex]}
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
                // onClick={prevImage}
                onClick={() =>
                  setFullScreenIndex(
                    (prev) =>
                      (prev - 1 + fullScreenImages.length) %
                      fullScreenImages.length
                  )
                }
                className="absolute left-1 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white shadow-lg"
                style={{ backgroundColor: "rgba(122, 46, 29, 0.8)" }}
                // whileHover={{ scale: 1.1, backgroundColor: '#7A2E1D' }}
                // whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                // onClick={nextImage}
                onClick={() =>
                  setFullScreenIndex(
                    (prev) => (prev + 1) % fullScreenImages.length
                  )
                }
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
                {fullScreenIndex + 1} / {fullScreenImages.length}
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
