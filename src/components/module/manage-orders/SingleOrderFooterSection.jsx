import { PiSealCheckFill } from "react-icons/pi";
import { BsCartX } from "react-icons/bs";

const SingleOrderFooterSection = ({ order, onCancelOrder, isActive }) => {
    const calculateTotal = () => order?.orderDetails.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  
    const total = calculateTotal();
    const discount = total - order.subTotal;
  
    return (
      <div className="">
        <div className="xs:px-5 px-1 py-3 xs:text-[16px] text-[12px]">
          <div className="flex justify-between">
            <p className="text-end">Grand Total:</p>
            <p className="font-semibold">₹ {total}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-end">Discount (-):</p>
            <p className="font-semibold">(₹ {discount})</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-end">Shipping Fee (+):</p>
            <p>₹ {order?.shippingFee}</p>
          </div>
          <div className="flex justify-between items-center xs:text-[20px] font-semibold">
            <div className="flex items-center gap-2">
              <p>Total Amount Payable:</p>
              {order.couponCodeApplied.length > 0 && (
                <div className="text-green-500 font-bold text-xs sm:block hidden">
                  <p className="flex items-center">
                    (Coupon Code Applied) <PiSealCheckFill className="text-xl" />
                  </p>
                </div>
              )}
            </div>
            <p>₹ {order?.subTotal + order?.shippingFee}</p>
          </div>
          {order.couponCodeApplied.length > 0 && (
            <div className="text-green-200 font-bold text-xs sm:hidden block">
              <p className="flex items-center">
                (Coupon Code Applied) <PiSealCheckFill className="text-xl" />
              </p>
            </div>
          )}
        </div>
  
        <div className={`${isActive ? "bg-[#D3BB71] hover:bg-[#e0cf9c]" : "bg-gray-200"}`}>
          <button
            className="flex w-full h-full justify-center py-3 gap-1 items-center"
            onClick={onCancelOrder}
            disabled={!isActive}
          >
            <BsCartX className={`${isActive ? "text-red-500" : "text-red-400"} text-xl`} />
            <span className={!isActive ? "text-gray-400" : ""}>
              Cancel order
            </span>
          </button>
        </div>
      </div>
    );
  };

  export default SingleOrderFooterSection;