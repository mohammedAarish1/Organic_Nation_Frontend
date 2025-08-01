// import React, {  useState } from 'react'
// import {  useSelector } from 'react-redux';
// import Image from '../../components/image/Image';
// // react icons 
// import { IoChevronDownOutline } from "react-icons/io5";

// import { PiSealCheckFill } from 'react-icons/pi';


// const CartDetails = () => {

//     const { checking, shippingFee } = useSelector(state => state.delivery)
//     const { cartItemsList, totalCartAmount, couponCodeApplied } = useSelector((state) => state.cart);
//     const [showSummary, setShowSummary] = useState(false);


//     const toggleInfo = () => {
//         setShowSummary(!showSummary);
//     };


//     if (checking) return <div>loading</div>


//     return (
//         <div className={`order-first lg:order-none lg:h-screen ${!showSummary && 'sticky top-[70px] z-10'}`}>
//             <div className="relative h-full">
//                 <div className="p-4 lg:overflow-auto lg:h-[calc(100vh-60px)] bg-gray-50" >
//                     <div className=' flex items-center justify-between'>

//                         <h2 className="text-2xl font-bold ">Order Summary</h2>
//                         {/* icon  */}
//                         <div className=" mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5" onClick={toggleInfo}>
//                             <IoChevronDownOutline className={`fill-primary border w-full h-full rounded-lg cursor-pointer text-xl stroke-primary duration-200 ease-in-out ${showSummary ? "rotate-180" : ""
//                                 }`} />
//                         </div>
//                         {/* icon  */}

//                     </div>
//                     <div className={` space-y-6 mt-10 ${!showSummary && 'lg:block hidden'} ${showSummary && 'block'} `}>
//                         {cartItemsList?.map((product) => (
//                             <div key={product?._id} className="grid grid-cols-2 ">
//                                 <div className="p shrink-0 ">
//                                     {/* <img
//                                         src={Array.isArray(product.img) ? product.img.filter(path => path.includes('front'))[0] : null}
//                                         className="lg:w-20 lg:h-24 w-16  object-contain rounded-2xl"
//                                     /> */}
//                                     <Image
//                                         src={{
//                                             // sm: leftImage.sm,
//                                             sm: Array.isArray(product.img) ? product.img.filter(path => path.sm.includes('front'))[0].sm : null,
//                                             md: Array.isArray(product.img) ? product.img.filter(path => path.md.includes('front'))[0].md : null,
//                                             lg: Array.isArray(product.img) ? product.img.filter(path => path.lg.includes('front'))[0].lg : null,
//                                             // md: leftImage.md,
//                                             // lg: leftImage.lg
//                                         }}
//                                         // blurSrc={leftImage.blur}
//                                         alt={product.name}
//                                         className="w-32 max-h-32 object-contain"
//                                     />
//                                 </div>
//                                 <div>
//                                     <h3 className="text-base font-bold ">{product.name}</h3>
//                                     <ul className="text-[10px]  xs:space-y-3 xs:mt-4">
//                                         <li className="flex flex-wrap gap-4">Weight <span className="ml-auto">{product.weight}</span></li>
//                                         <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{product.quantity} Pcs.</span></li>
//                                         <li className="flex flex-wrap gap-4">Total Price (including taxes) <span className="ml-auto font-bold">₹ {Math.round((product.price - (product.price * product.discount / 100)) * product.quantity)}</span></li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         ))}


//                     </div>
//                 </div>
//                 <div className="lg:absolute left-0 bottom-0 bg-[var(--bgColorPrimary)] w-full p-4">
//                     {/* <h4 className="flex flex-wrap gap-4 text-base text-white">Total taxes (+) <span className="ml-auto">₹ {totalTax}</span></h4> */}
//                     {/* <h4 className="flex flex-wrap gap-4 text-base text-white">Shipping Fee (+) <span className="ml-auto">₹ {totalCartAmount < freeShippingEligibleAmt ? shippingFee : 'FREE'}</span></h4> */}
//                     <h4 className="flex flex-wrap gap-4 text-base text-white">
//                         Shipping Fee (+)
//                         {shippingFee === 0 ? (
//                             <span className="ml-auto text-sm text-gray-400">(Enter Shipping Details)</span>
//                         ) : (
//                             <span className="ml-auto">
//                                 ₹ {totalCartAmount < freeShippingEligibleAmt ? shippingFee : "FREE"}
//                             </span>
//                         )}
//                     </h4>
//                     <h4 className="flex flex-wrap xs:gap-4 gap-1 xs:text-xl font-bold text-white"
//                     >
//                         Total{couponCodeApplied.length > 0 && <span className='flex text-sm justify-center items-center gap-1'>( Coupon Code Applied <PiSealCheckFill className='text-xl' />)</span>} <span className="ml-auto text-xl">₹{Math.round(totalCartAmount + (totalCartAmount < freeShippingEligibleAmt ? shippingFee : 0)) || 0}</span></h4>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CartDetails;
