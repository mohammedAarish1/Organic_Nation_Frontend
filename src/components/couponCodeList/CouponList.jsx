import React, { useEffect, useState } from "react";
// react icnons
import { RiDiscountPercentLine } from "react-icons/ri";
import {
  applyAdditionalCouponDiscount,
  applyPickleCouponCode,
  getAllCartItems,
} from "../../features/cart/cart";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CouponList = ({
  totalCartAmount,
  totalTax,
  setShowCouponCodelist,
  totalPickleQuantity,
  couponCodeApplied,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isPickleCodeApplied, setPickleCodeApplied ] = useState(false);
  const [isAdditionalDiscountCodeApplied, setAdditionalDiscountCodeApplied ] = useState(false);
  const {cartItems}=useSelector(state=>state.cart)

// pickle coupon code
  const handleCouponCodeValidation = () => {
    let payload;
    if (user) {
      const cart = {
        items: cartItems,
        totalCartAmount,
        totalTaxes: totalTax,
        couponCodeApplied,
      };
      payload = { cart, phoneNumber: user.phoneNumber, couponCode: "BUY4PICKLE" };
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart"));
      if (localCart.length > 0) {
        const cart = {
          items: localCart,
          totalCartAmount,
          totalTaxes: totalTax,
          couponCodeApplied,
        };
        payload = { cart, phoneNumber: null, couponCode: "BUY4PICKLE" };
      }
    }

    dispatch(applyPickleCouponCode(payload))
      .unwrap()
      .then((result) => {
        if(user){

          dispatch(getAllCartItems());
        }
        setShowCouponCodelist(false);

        toast.success("Coupon Code successfully applied !");
        // Handle successful validation here
      })
      .catch((error) => {
        toast.error("Coupon Code is not valid !");
        // Handle validation error here
      });

    

  
  };


  // additional 10% off coupon handler function
  const handleAdditionalDiscountCoupon = () => {
    let payload;
    if (user) {
      const cart = {
        // items: cartItems,
        totalCartAmount,
        totalTaxes: totalTax,
        couponCodeApplied,
      };
      payload = { cart, phoneNumber: user.phoneNumber, couponCode: "FOODSBAY5YEARS" };
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart"));
      if (localCart.length > 0) {
        const cart = {
          // items: localCart,
          totalCartAmount,
          totalTaxes: totalTax,
          couponCodeApplied,
        };
        payload = { cart, phoneNumber: null, couponCode: "FOODSBAY5YEARS" };
      }
    }

    dispatch(applyAdditionalCouponDiscount(payload))
      .unwrap()
      .then((result) => {
        if(user){

          dispatch(getAllCartItems());
        }
        setShowCouponCodelist(false);

        toast.success("Coupon Code successfully applied !");
        // Handle successful validation here
      })
      .catch((error) => {
        toast.error("Not Eligible");
        // Handle validation error here
      });

    

  
  };

  useEffect(() => {
    if (couponCodeApplied?.length > 0) {
      const hasPickleCoupon = couponCodeApplied?.some((coupon) => coupon.name === "PickleCoupon") || false;
      setPickleCodeApplied(hasPickleCoupon);
      const hasAdditionalCoupon = couponCodeApplied?.some((coupon) => coupon.name === "Additinal_10%_Discount") || false;
      setAdditionalDiscountCodeApplied(hasAdditionalCoupon);
    }
  }, [couponCodeApplied,dispatch]);


  return (
    <div className="capitalize flex flex-col gap-4 font-serif">
      <div>
        <h3 className="tex">Coupons</h3>
        <span className="text-xs text-gray-600">
          Cart Value: ₹{totalCartAmount}
        </span>
      </div>

      <div>
        <p className="pb-2">Available Coupons:</p>
        <div className="flex flex-col gap-6">
        {/* pickle coupon */}
        <section className="border rounded-md px-2 py-4 shadow-inner shadow-gray-600">
          <div className="flex-col flex gap-2">
            <div className="flex justify-between ">
              <span className="flex items-center gap-2">
                <RiDiscountPercentLine className="text-2xl text-green-500" />{" "}
                BUY4PICKLES
              </span>
              <button
                className={`bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md ${
                  totalPickleQuantity < 4 ||
                  isPickleCodeApplied ||
                  isAdditionalDiscountCodeApplied
                    ? "opacity-35"
                    : "opacity-100"
                }`}
                onClick={handleCouponCodeValidation}
                disabled={
                  totalPickleQuantity < 4 ||
                  isPickleCodeApplied ||
                  isAdditionalDiscountCodeApplied
                }
              >
                {isPickleCodeApplied ? "Applied" : " Apply"}
              </button>
            </div>
            <div>
              <p>Get Any Four Pickles at Flat ₹999</p>
              <p className="text-gray-500 text-xs mt-2">
                {totalPickleQuantity < 4 &&
                  "*Please pick at least four pickles to avail this offer !"}
              </p>
            </div>
          </div>
        </section>
        {/* pickle coupon */}


        {/* extra 10% coupon box  */}
        <section className="border rounded-md px-2 py-4 shadow-inner shadow-gray-600">
          <div className="flex-col flex gap-2">
            <div className="flex justify-between ">
              <span className="flex items-center gap-2">
                <RiDiscountPercentLine className="text-2xl text-green-500" />{" "}
                FOODSBAY5YEARS
              </span>
              <button
                className={`bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md ${
                  totalCartAmount <1299 ||
                  isAdditionalDiscountCodeApplied ||
                  isPickleCodeApplied
                    ? "opacity-35"
                    : "opacity-100"
                }
                  
                `}
                onClick={handleAdditionalDiscountCoupon}
                disabled={
                  totalCartAmount < 1299 ||
                  isAdditionalDiscountCodeApplied ||
                  isPickleCodeApplied
                }
              >
                {isAdditionalDiscountCodeApplied ? "Applied" : " Apply"}
              </button>
            </div>
            <div>
              <p>Get additional 10% off on all orders above ₹ 1299</p>
              <p className="text-gray-500 text-xs mt-2">
                {totalCartAmount < 1299 &&
                  "*Please add products worth ₹ 1299 or more"}
              </p>
            </div>
          </div>
        </section>
        {/* extra 10% coupon */}
        </div>
      </div>
    </div>
  );
};

export default CouponList;
