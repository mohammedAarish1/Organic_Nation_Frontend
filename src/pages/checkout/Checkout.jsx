import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// react icons 
import { IoChevronDownOutline } from "react-icons/io5";

import { calculateShippingFee } from '../../features/check-delivery/checkDelivery';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';



const Checkout = () => {


    const dispatch = useDispatch()
    const { checking, shippingFee } = useSelector(state => state.delivery)
    const { cartItemsList, totalCartAmount, totalWeight } = useSelector((state) => state.cart);
    const [showSummary, setShowSummary] = useState(false);

    const toggleInfo = () => {
        setShowSummary(!showSummary);
    };



    useEffect(() => {
        dispatch(calculateShippingFee({ pinCode: '', weight: totalWeight }));
    }, [totalWeight])


    if (checking) return <div>loading</div>


    return (
        <div className='xs:px-10 px-3 py-5'>
            <div className="font-[sans-serif]">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap- h-full">
                    {/* left side  */}
                    <div className="bg-gradient-to-r from-[#6D613B] to-[#D3BB71] lg:h-screen lg:sticky lg:top-0">
                        <div className="relative h-full">
                            <div className="xs:p-8 p-4 lg:overflow-auto lg:h-[calc(100vh-60px)]" >
                                <div className=' flex items-center justify-between'>

                                    <h2 className="text-2xl font-bold text-white ">Order Summary</h2>
                                    {/* icon  */}
                                    <div className=" mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5" onClick={toggleInfo}>
                                        <IoChevronDownOutline className={`fill-primary text-xl stroke-primary duration-200 ease-in-out ${showSummary ? "rotate-180" : ""
                                            }`} />
                                    </div>
                                    {/* icon  */}

                                </div>
                                <div className={` space-y-6 mt-10 ${!showSummary && 'lg:block hidden'} ${showSummary && 'block'} `}>
                                    {cartItemsList?.map((product) => (
                                        <div key={product?._id} className="grid grid-cols-2 items-center xs:gap-4">
                                            <div className="px-4 shrink-0  ">
                                                <img src={Array.isArray(product.img) ? product.img.filter(path => path.includes('front'))[0] : null} className="lg:w-20 lg:h-24 w-16  object-contain rounded-2xl" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-white">{product.name}</h3>
                                                <ul className="text-xs text-white xs:space-y-3 xs:mt-4">
                                                    <li className="flex flex-wrap gap-4">Weight <span className="ml-auto">{product.weight}</span></li>
                                                    <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{product.quantity} Pcs.</span></li>
                                                    <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto font-bold">₹ {Math.round((product.price - (product.price * product.discount / 100)) * product.quantity)}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </div>
                            <div className="lg:absolute left-0 bottom-0 bg-[var(--bgColorPrimary)] w-full p-4">
                                {/* <h4 className="flex flex-wrap gap-4 text-base text-white">Total taxes (+) <span className="ml-auto">₹ {totalTax}</span></h4> */}
                                <h4 className="flex flex-wrap gap-4 text-base text-white">Shipping Fee (+) <span className="ml-auto">₹ {shippingFee}</span></h4>
                                <h4 className="flex flex-wrap gap-4 text-xl font-bold text-white">Total <span className="ml-auto text-xl">₹{Math.round(totalCartAmount + shippingFee ) || 0}</span></h4>
                            </div>
                        </div>
                    </div>
                    {/* right side  */}
                    <CheckoutForm />
                </div>
            </div>


        </div>
    )
}

export default Checkout;


