import React from 'react';
import { useSelector } from 'react-redux';
import ReferralOfferCard from './ReferralOfferCard';
import CouponCard from './CouponCard';


const UserCoupons = () => {
    const { user } = useSelector(state => state.auth)


    return (
        <div>
           
            <section className='flex flex-col gap-3'>
                {user?.referralCoupons?.length === 0 && (
                    <div className=' min-h-16 flex  items-center'>
                        <h2 className="txs:ext-lg text-gray-500  mb-4 font-serif px-2">🎉 Unlock Your First Coupon! 🎉</h2>
                    </div>

                )}
                {user.referralCoupons?.map(coupon => (
                    <CouponCard key={coupon._id} coupon={coupon} />
                ))}
            </section>
            <section>
                <ReferralOfferCard />
            </section>
        </div>
    )
}

export default UserCoupons;
