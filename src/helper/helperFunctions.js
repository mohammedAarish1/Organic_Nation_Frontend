import { toast } from "react-toastify";
import { calculateShippingFee, checkDeliveryAvailability, updateShippingFee } from "../features/check-delivery/checkDelivery";
import api from "../config/axiosConfig";


// extracting the wwight since weight is in different formats like 900 gm, 1 Ltr, 20 bags *1.8g=36g
// function extractWeight(description) {
//     // Remove all spaces from the description
//     const cleanDesc = description.replace(/\s/g, '');

//     // Regular expression to match the last number followed by 'g', 'kg', 'l', or 'ltr'
//     const match = cleanDesc.match(/(\d+(?:\.\d+)?)(g|kg|l|ltr|gm)$/i);
//     if (match) {
//         const value = parseFloat(match[1]);
//         const unit = match[2].toLowerCase();

//         switch (unit) {
//             case 'kg':
//                 return value * 1000; // Convert kg to g
//             case 'g':
//                 return value;
//             case 'gm':
//                 return value;
//             case 'l':
//             case 'ltr':
//                 return value * 1000; // Assume 1 liter = 1000g (for water-based products)
//             default:
//                 return null;
//         }
//     }

//     return null; // Return null if no match is found
// }


const getCatogoriesWithImages = (categoryList) => {
 
  const categoriesImages = [
    { 'Organic-Honey': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/honey.webp' },
    { 'Homestyle-Pickles': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/pickle.webp' },
    { 'Chutney-&-Dip': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/chutney.webp' },
    { 'Fruit-Preserves': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/fruit_preserves.webp' },
    { 'Seasonings-&-Herbs': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/seasonings.webp' },
    { 'Organic-Tea': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/tea.webp' },
    { 'Organic-Oils': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/oils.webp' },
    { Salt: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/salt.webp' },
    { Sweeteners: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/sweeteners.webp' },
    { Oats: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/oats.webp' },
    { Vegan: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/vegan.webp' },
    { 'Breakfast-Cereals': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/breakfast.webp' },
    { 'Gifts-&-Combos': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/combo.webp' },
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



// Helper function for button styles used in manage-order page
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
  checkDeliveryAndCalculateShippingFee,
  additionalDiscountforOnlinePayment,
  getCouponDetails,
  scrollToSlide,
  getButtonStyles,
  formatPrice
}