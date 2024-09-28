import React from "react";
// react icnons
import { RiDiscountPercentLine } from "react-icons/ri";
import { applyPickleCouponCode, getAllCartItems } from "../../features/cart/cart";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const CouponList = ({ totalCartAmount ,setShowCouponCodelist,totalPickleQuantity,isCouponCodeApplied,isPickleCouponApplied}) => {

    const dispatch=useDispatch()
    const { user } = useSelector((state) => state.user);
    

    const handleCouponCodeValidation = () => {
        if(user){
          const payload = { userEmail: user.email, couponCode: "BUY4PICKLE"};
     
          dispatch(applyPickleCouponCode(payload))
            .unwrap()
            .then((result) => {
                dispatch(getAllCartItems());
                setShowCouponCodelist(false)
      
              toast.success("Coupon Code successfully applied !");
              // Handle successful validation here
            })
            .catch((error) => {
              toast.error("Coupon Code is not valid !");
              // Handle validation error here
            });
        }else{
         toast.error('Please log in to avail the offer')
        }
       };

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
        {/* first box  */}
        <section className="border rounded-md px-2 py-4 shadow-inner shadow-gray-600">
            <div className="flex-col flex gap-2">
          <div className="flex justify-between ">
            <span className="flex items-center gap-2">
              <RiDiscountPercentLine className="text-2xl text-green-500" />{" "}
              BUY4PICKLES
            </span>
            <button 
            className={`bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md ${totalPickleQuantity < 4 || isCouponCodeApplied || isPickleCouponApplied ? 'opacity-35': 'opacity-100'}`}
            onClick={handleCouponCodeValidation}
            disabled={totalPickleQuantity < 4 || isCouponCodeApplied || isPickleCouponApplied}
            >
               {isPickleCouponApplied ? 'Applied':' Apply'}
                </button>
          </div>
          <div>
            <p>Get Any Four Pickles at Flat ₹999</p>
            <p className="text-gray-500 text-xs mt-2">{totalPickleQuantity<4 && '*Please pick at least four pickles to avail this offer !'}</p>
          </div>
          </div>
        </section>
        {/* first box  */}
      </div>
    </div>
  );
};

export default CouponList;
