import React, { useEffect, useState } from 'react';
import { FaClipboard } from 'react-icons/fa';  // Importing icons
import { getCouponDetails } from '../../helper/helperFunctions';
import { FaCheckCircle, FaCheck, FaTimesCircle } from 'react-icons/fa';


const CouponCard = ({ coupon }) => {
    const [copied, setCopied] = useState(false);
    const [couponDetails, setCouponDetails] = useState(null);

    const couponId = coupon.couponId

    // const getCouponDetails = async (couponId) => {
    //     try {
    //         const response = await api.get(`${apiUrl}/api/validate/${couponId}`);
    //         if (response.status === 200) {
    //             setCouponDetails(response.data);
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // };


    const handleCopy = () => {
        navigator.clipboard.writeText(couponDetails.code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copy state after 2 seconds
        });
    };



    useEffect(() => {
        getCouponDetails(couponId)
            .then(result => {
                setCouponDetails(result)
            })
    }, [couponId])

    return (
        <div className="max-w-4xl w-full  rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
                <div className='flex justify-between items-center mb-2'>
                    {/* Coupon Code */}
                    <h2 className="xs:text-xl  text-gray-600 ">
                        Coupon Code: <span className="text-green-600 font-bold">{couponDetails?.code}</span>
                    </h2>

                    {/* Copy Button */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleCopy}
                            className={`flex items-center text-green-600 bg-green-100 min-w-max  py-2 xs:px-4 px-2 rounded-lg shadow-sm focus:outline-none transition duration-200 ${couponDetails?.status!=='active' ?'opacity-50':'hover:bg-green-200'}`}
                            disabled={couponDetails?.status!=='active'}
                        >
                            <FaClipboard className="mr-2" />
                            {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600  mb-4">{couponDetails?.description}</p>

                {/* Note */}
                {/* {couponDetails?.note && (
                    <div className="mb-4 p-2 bg-gray-100 rounded text-sm text-gray-700">
                        <strong>Note:</strong> {couponDetails?.note}
                    </div>
                )} */}

                {/* Status */}
                <div className="flex items-center mb-4">
                    {/* {couponDetails?.status === 'active' ? (
                        <FaCheckCircle className="text-green-500 text-lg mr-2" />
                    ) : (
                        <FaTimesCircle className="text-red-500 text-lg mr-2" />
                    )} */}
                    {couponDetails?.status === 'active' ? (
                        <FaCheckCircle className="text-green-500 text-lg mr-2" />
                    ) : couponDetails?.status === 'used' ? (
                        <FaCheck className="text-blue-500 text-lg mr-2" />
                    ) : couponDetails?.status === 'expired' ? (
                        <FaTimesCircle className="text-red-500 text-lg mr-2" />
                    ) : null}
                    {/* <span className={couponDetails?.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                        {couponDetails?.status}
                    </span> */}
                    <span
                        className={couponDetails?.status === 'active' ? 'text-green-600' :
                            couponDetails?.status === 'used' ? 'text-blue-600' :
                                couponDetails?.status === 'expired' ? 'text-red-600' : 'text-gray-600'}
                    >
                        {couponDetails?.status}
                    </span>
                </div>


            </div>
        </div>
    );
};

export default CouponCard;