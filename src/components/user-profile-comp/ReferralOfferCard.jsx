import React, {  useState } from 'react';
import { FaClipboard } from 'react-icons/fa';  // Importing icons
import { useSelector } from 'react-redux';
import { FaShareAlt, FaGift } from 'react-icons/fa';  // Importing share and gift icons


const ReferralOfferCard = () => {
    const { user,user_loading } = useSelector(state => state.auth) || {};

    const [copied, setCopied] = useState(false);

    const referralCode = user ? user.referralCode : ''; // Replace with dynamic referral link if needed
    const couponDetails = "Earn ₹100 on your next purchase by using this coupon!";

    // Handle Copy Button
    const handleCopy = () => {
        // Copy the referral link and coupon details to clipboard
        // const textToCopy = `${referralCode}\n${couponDetails}`;
        const textToCopy = `${referralCode}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    // Handle Share Button (WhatsApp)
    const handleShare = () => {
        const message = `Hey! I found this awesome referral offer for you: \n\n${referralCode}\n${couponDetails}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");  // Open WhatsApp in a new tab
    };

if(user_loading){
    return <div>Loading...</div>;
}

    return (
        <div className="max-w-4xl w-full  rounded-lg shadow-xl bg-custom-gradient text-white overflow-hidden p-6">
            <div className="flex items-center justify-between mb-4">
                {/* Title Section */}
                <h2 className="xs:text-2xl font-semibold">
                    Earn a coupon worth ₹100 on Referrals!
                </h2>
                <FaGift className="text-green-600 text-3xl" />
            </div>

            {/* Description */}
            <p className="text-gray-200 xs:text-base text-sm mb-4">
                Refer a friend to our platform, and if they place an order, you'll earn a ₹100 coupon!
                It's a win-win!
            </p>

            {/* Instructions */}
            <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="text-sm text-gray-700">
                    <strong>How it works:</strong>
                </p>
                <ul className="list-inside list-disc text-sm text-gray-600">
                    <li>Share your referral code with your friends.</li>
                    <li>Your friend places their first order.</li>
                    <li>Minimum order value must be ₹499 .</li>
                    <li>You and your friend both will get a ₹100 coupon once the order completed.</li>
                </ul>
            </div>

            {/* Referral Link Section */}
            <div className="flex  flex-wrap items-center xs:justify-normal justify-center xs:gap-2 gap-3 mb-4">
                <input
                    type="text"
                    value={user && !user_loading && user.referralCode}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50 focus:outline-none"
                />
                <button
                    // onClick={() => navigator.clipboard.writeText('https://example.com/referral-link')}
                    onClick={handleCopy}
                    className=" px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none transition duration-200 w-full xs:w-max"
                >
                    {copied ? 'Copied!' : <span className='flex justify-center items-center xs:text-[16px] text-sm'><FaClipboard className="mr-2" /> Copy Code</span>}
                </button>
            </div>

            {/* Share Button */}
            <div className="text-center text-sm xs:text-base">
                <button
                    // onClick={() => alert("Share your referral link with your friends!")}
                    onClick={handleShare}
                    className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none transition duration-200 flex items-center justify-center"
                >
                    <FaShareAlt className="mr-2" /> Share Your Referral Code
                </button>
            </div>
        </div>
    );
};

export default ReferralOfferCard;