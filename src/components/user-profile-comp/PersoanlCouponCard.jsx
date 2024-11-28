import React, { useEffect,  useState } from "react";
// react icnons
import { RiDiscountPercentLine } from "react-icons/ri";
import { getCouponDetails } from "../../helper/helperFunctions";
import { FaCheck, FaCheckCircle,  FaTimesCircle } from "react-icons/fa";


const PersoanlCouponCard = ({ coupon, handleAction }) => {

  const [couponDetails, setCouponDetails] = useState({});
  const couponId = coupon.couponId;

  useEffect(() => {
    getCouponDetails(couponId)
      .then(result => {
        setCouponDetails(result)
      })
  }, [couponId])


  return (
    <section className="border rounded-md px-2 py-4 shadow-inner shadow-gray-600">
      <div className="flex-col flex gap-2">
        <div className="flex justify-between ">
          <span className="flex items-center gap-2 font-bold">
            <RiDiscountPercentLine className="text-2xl text-green-500" />{" "}
            <span className="">{couponDetails?.code}</span>
          </span>
          <button
            className={`bg-green-500  xs:px-6 px-3 xs:py-2 py-1 ${couponDetails?.status !== 'active' ? 'opacity-50' : 'hover:bg-green-600'}`}
            onClick={handleAction}
            disabled={couponDetails?.status !== 'active'}
          >
            {/* {isAdditionalDiscountCodeApplied ? "Applied" : " Apply"} */}
            {couponDetails.status === 'used' ? 'Applied' : 'Apply'}
          </button>
        </div>
        <div>
          <p>{couponDetails.name}</p>
          <p className="text-gray-500 xs:text-xs mt-2">
            *{couponDetails.description}
          </p>
        </div>
        {/* Status */}
        <div className="flex items-center">
          {couponDetails?.status === 'active' ? (
            <FaCheckCircle className="text-green-500 text-lg mr-2" />
          ) : couponDetails?.status === 'used' ? (
            <FaCheck className="text-blue-500 text-lg mr-2" />
          ) : couponDetails?.status === 'expired' ? (
            <FaTimesCircle className="text-red-500 text-lg mr-2" />
          ) : null}
          <span
            className={couponDetails?.status === 'active' ? 'text-green-600' :
              couponDetails?.status === 'used' ? 'text-blue-600' :
                couponDetails?.status === 'expired' ? 'text-red-600' : 'text-gray-600'}
          >
            {couponDetails?.status}
          </span>
        </div>

      </div>
    </section>
  )
}


export default PersoanlCouponCard;