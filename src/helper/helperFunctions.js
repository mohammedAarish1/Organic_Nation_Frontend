import { toast } from "react-toastify";
// import { deleteDocumentFromDatabase } from "../features/admin/adminData";
// import { getAllCartItems, getAllOrders } from "../imports";
import { calculateShippingFee, checkDeliveryAvailability, updateShippingFee } from "../features/check-delivery/checkDelivery";
// import { mergeCart } from "../features/cart/cart";
import api from "../config/axiosConfig";
// const apiUrl = import.meta.env.VITE_BACKEND_URL;

const getCatogoriesWithImages = (categoryList) => {
  // const categoriesImages = [
  //   { 'Organic-Honey': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Honey.png' },
  //   { 'Homestyle-Pickles': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Authentic-Pickles.png' },
  //   { 'Chutney-&-Dip': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Chutney%26Dip.png' },
  //   { 'Fruit-Preserves': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Fruit-Preserves.png' },
  //   { 'Seasonings-&-Herbs': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Seasonings%26Herbs.png' },
  //   { 'Organic-Tea': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Tea.png' },
  //   { Salt: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Salt.png' },
  //   { Sweeteners: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Sweetners.png' },
  //   { 'Organic-Oils': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Oils.png' },
  //   { Oats: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Oats.png' },
  //   { Vegan: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Vegan.png' },
  //   { 'Breakfast-Cereals': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Breakfast-Cereals.png' },
  //   { Combo: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Combo.png' },
  // ]




  const categoriesImages = [
    { 'Organic-Honey': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/honey.webp' },
    { 'Homestyle-Pickles': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/pickles.webp' },
    { 'Chutney-&-Dip': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/chutney.webp' },
    { 'Fruit-Preserves': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/fruit_preserves.webp' },
    { 'Seasonings-&-Herbs': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/seasonings.webp' },
    { 'Organic-Tea': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/tea.webp' },
    { 'Organic-Oils': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/oils.webp' },
    { Salt: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/salt.webp' },
    { Sweeteners: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/sweeteners.webp' },
    { Oats: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/oats.webp' },
    { Vegan: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/vegan.webp' },
    { 'Breakfast-Cereals': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/breakfast.webp' },
    { 'Gifts-&-Combos': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/combo.webp' },
  ]
  const imageLookup = categoriesImages.reduce((acc, obj) => {
    const [key, value] = Object.entries(obj)[0];
    acc[key] = value;
    return acc;
  }, {});
  const categoriesWithImages = categoryList?.filter(item => item.category !== 'All')
    .map(item => ({
      ...item,
      image: imageLookup[item.categoryUrl] || null,
    }));

  return categoriesWithImages
}



// const fetchDataAfterLogin = (dispatch, navigate, cart, checkoutStatus) => {
//   dispatch(getAllOrders())
//   // dispatch(getAllCartItems())
//   if (cart && cart.items.length > 0) {
//     dispatch(mergeCart({ cart }))
//       .then((result) => {
//         // localStorage.removeItem('cart');
//         dispatch(getAllCartItems());
//         if (checkoutStatus) {
//           navigate('/cart/checkout')
//         } else {
//           navigate('/')

//         }
//       }
//       )
//   } else {

//     if (checkoutStatus) {
//       navigate('/cart/checkout')
//     } else {

//       navigate('/');
//     }
//   }

// }

// generate random Transaction Id
const generateTransactionID = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  const merchantPrefix = 'T';
  const transactionID = `${merchantPrefix}${timestamp}${randomNum}`;
  return transactionID;
}


// // to convert the address object into plain string 
// const address = (obj) => {
//   let result = '';
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       const value = obj[key];
//       if (Array.isArray(value)) {
//         result += value.flat().join(' ') + ' ';
//       } else {
//         result += value + ' ';
//       }
//     }
//   }
//   return result.trim();
// }


// for calculating additional 5% discount on MRP and tax include in that discount
// const calculateDiscountAndTaxIncluded = (cart) => {
//   const totalCartValue = cart.reduce((total, item) => {
//     const subtotal = item.price * item.quantity;
//     return total + subtotal;
//   }, 0);

//   const discountAmount = totalCartValue * 0.05;

//   const totalCartValueExcludingTax = cart.reduce((total, item) => {
//     const priceExcludingTax = item.price / (1 + item.tax / 100);
//     const subtotalExcludingTax = priceExcludingTax * item.quantity;
//     return total + subtotalExcludingTax;
//   }, 0);

//   const discountAmountExcludingTax = totalCartValueExcludingTax * 0.05;

//   const taxIncludedInDiscountAmount = discountAmount - discountAmountExcludingTax;

//   return {
//     discountAmount: Math.round(discountAmount),
//     taxIncludedInDiscountAmount: Math.round(taxIncludedInDiscountAmount)
//   };
// }

// for calculating additional 5% discount on MRP and tax include in that discount
const additionalDiscountforOnlinePayment = (totalCartAmount, totalTax) => {


  const DISCOUNT_PERCENTAGE = 5

  //calculate additional 5% discount
  const additionalDiscount = totalCartAmount * DISCOUNT_PERCENTAGE / 100
  const additionalTaxDiscount = totalTax * DISCOUNT_PERCENTAGE / 100

  return {
    discountAmount: Math.round(additionalDiscount),
    taxDiscount: Math.round(additionalTaxDiscount)
  };

}


// const handleDocumentDeleteFromDatabase = (collection, id, dispatch, updateLists) => {
//   dispatch(deleteDocumentFromDatabase({ collection, id }))
//     .then(() => {
//       toast.success("Deleted Successfully");
//       dispatch(updateLists());
//     })
// }


// for checking delivery availability and calculating shipping fee
const checkDeliveryAndCalculateShippingFee = (
  pinCode,
  dispatch
) => {
  if (pinCode) {
    if (localStorage.getItem("deliveryChargeToken")) {
      localStorage.removeItem("deliveryChargeToken");
    }
    dispatch(checkDeliveryAvailability(pinCode)).then((res) => {
      if (res.payload.available) {
        dispatch(
          calculateShippingFee({ pinCode: res.meta.arg })
        )
      } else {
        toast.error(`Delivery is not available for pin code ${pinCode}`);
        dispatch(updateShippingFee());
      }
    });
  }
};



// to convert the address object into plain string 
const address = (obj) => {
  let result = '';
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key !== '_id') {  // Skip _id field
      const value = obj[key];
      if (Array.isArray(value)) {
        result += value.flat().join(' ') + ' ';
      } else {
        result += value + ' ';
      }
    }
  }
  return result.trim();
}


const getCouponDetails = async (couponId) => {
  try {
    const response = await api.get(`/api/validate/${couponId}`);
    if (response.status === 200) {
      // setCouponDetails(response.data);
      return response.data
    }
  } catch (error) {
    throw error;
  }
};



// Carousel controls
const scrollToSlide = (ref, direction) => {
  const container = ref.current;
  if (!container) return;

  const cardWidth = 280;
  const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;

  container.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
};



// Helper function for button styles
const getButtonStyles = (variant, disabled) => {
  const baseStyles = "border shadow-sm hover:shadow-md";

  if (disabled) {
    return `${baseStyles} bg-[var(--neutral-color)]/50 text-[var(--text-color)]/40 cursor-not-allowed border-[var(--neutral-color)]`;
  }

  switch (variant) {
    case 'primary':
      return `${baseStyles} bg-[var(--themeColor)] hover:bg-[var(--themeColor)]/90 text-[var(--text-light-color)] border-[var(--themeColor)]`;
    case 'secondary':
      return `${baseStyles} bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-[var(--text-light-color)] border-[var(--accent-color)]`;
    case 'accent':
      return `${baseStyles} bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-[var(--text-light-color)] border-[var(--secondary-color)]`;
    case 'return':
      return `${baseStyles} bg-[var(--alert-color)] hover:bg-[var(--alert-color)]/90 text-[var(--text-light-color)] border-[var(--alert-color)]`;
    default:
      return `${baseStyles} bg-[var(--background-color)] hover:bg-[var(--neutral-color)]/20 text-[var(--text-color)] border-[var(--neutral-color)]`;
  }
};


// Format price with comma separators
const formatPrice = (price) => {
  return price?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


export {
  getCatogoriesWithImages,
  generateTransactionID,
  address,
  // calculateDiscountAndTaxIncluded,
  // fetchDataAfterLogin,
  // handleDocumentDeleteFromDatabase,
  checkDeliveryAndCalculateShippingFee,
  additionalDiscountforOnlinePayment,
  getCouponDetails,
  scrollToSlide,
  getButtonStyles,
  formatPrice
}