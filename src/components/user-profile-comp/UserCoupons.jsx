// import React, { lazy, Suspense } from 'react';
// import { useSelector } from 'react-redux';
// // import ReferralOfferCard from './ReferralOfferCard';
// import CouponCard from './CouponCard';
// import Loader from '../common/Loader';

// const ReferralOfferCard=lazy(()=>import('./ReferralOfferCard'))

// const UserCoupons = () => {
//     const { user } = useSelector(state => state.auth)


//     return (
//         <div>
           
//             <section className='flex flex-col gap-3'>
//                 {user?.referralCoupons?.length === 0 && (
//                     <div className=' min-h-16 flex  items-center'>
//                         <h2 className="txs:ext-lg text-gray-500  mb-4 font-serif px-2">🎉 Unlock Your First Coupon! 🎉</h2>
//                     </div>

//                 )}
//                 {user.referralCoupons?.map(coupon => (
//                     <CouponCard key={coupon._id} coupon={coupon} />
//                 ))}
//             </section>
//             <section>
//                 <Suspense fallback={<Loader height='100px' />}>

//                 <ReferralOfferCard />
//                 </Suspense>
//             </section>
//         </div>
//     )
// }

// export default UserCoupons;
