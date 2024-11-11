import { toast } from "react-toastify";
import { deleteDocumentFromDatabase } from "../features/admin/adminData";
import { getAllCartItems, getAllOrders } from "../imports";
import { calculateShippingFee, checkDeliveryAvailability, updateShippingFee } from "../features/check-delivery/checkDelivery";
import { mergeCart } from "../features/cart/cart";


const fetchDataAfterLogin = (dispatch, navigate, cart, checkoutStatus) => {
  dispatch(getAllOrders())
  // dispatch(getAllCartItems())
  if (cart && cart.items.length > 0) {
    dispatch(mergeCart({ cart }))
      .then((result) => {
        // localStorage.removeItem('cart');
        dispatch(getAllCartItems());
        if (checkoutStatus) {
          navigate('/cart/checkout')
        } else {
          navigate('/')

        }
      }
      )
  } else {

    if (checkoutStatus) {
      navigate('/cart/checkout')
    } else {

      navigate('/');
    }
  }

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
const additionalDiscountforOnlinePayment = (totalCartAmount,totalTax) => {


      const DISCOUNT_PERCENTAGE = 5

      //calculate additional 5% discount
      const additionalDiscount = totalCartAmount * DISCOUNT_PERCENTAGE / 100
      const additionalTaxDiscount = totalTax * DISCOUNT_PERCENTAGE / 100

      return {
        discountAmount: Math.round(additionalDiscount),
        taxDiscount: Math.round(additionalTaxDiscount)
      };

}


const handleDocumentDeleteFromDatabase = (collection, id, dispatch, updateLists) => {
  dispatch(deleteDocumentFromDatabase({ collection, id }))
    .then(() => {
      toast.success("Deleted Successfully");
      dispatch(updateLists());
    })
    .catch((error) => {
      // console.log('error deleting',error)
    })
}


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
        ).then((res) => {

          if (res.meta.requestStatus === "fulfilled") {
            // localStorage.setItem("deliveryChargeToken", res?.payload?.token);
          }
        });
      } else {
        toast.error(`Delivery is not available for pin code ${pinCode}`);
        dispatch(updateShippingFee());
      }
    });
  }
};


export {
  generateTransactionID,
  // address,
  // calculateDiscountAndTaxIncluded,
  fetchDataAfterLogin,
  handleDocumentDeleteFromDatabase,
  checkDeliveryAndCalculateShippingFee,
  additionalDiscountforOnlinePayment
}