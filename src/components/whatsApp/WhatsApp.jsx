import React, { memo, useState } from 'react';
import { Tooltip } from 'react-tooltip';


const WhatsApp = () => {
  // const [imageLoaded, setImageLoaded] = useState(false);
  const phoneNumber = +919999532041;
  const IMAGE_WIDTH = 64; // 16 * 4 (w-16 in Tailwind)
  const IMAGE_HEIGHT = 64; // Assuming square image

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative w-16 h-16">
      {/* Placeholder div to reserve space */}
      <div 
        className="w-16 h-16  rounded-full"
        style={{ 
          // display: imageLoaded ? 'none' : 'block' 
        }}
      />
      
      <img
        src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/whatsApp.png'
        alt="Chat with us on WhatsApp"
        onClick={handleClick}
        // onLoad={() => setImageLoaded(true)}
        className={`cursor-pointer absolute top-0 left-0 w-16 h-16 transition-opacity duration-300 `}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        loading="lazy"
        data-tooltip-id="whatsapp-tooltip"
        data-tooltip-content="Click to chat with us"
        data-tooltip-place="top"
      />
      
      <Tooltip
        id="whatsapp-tooltip"
        className="!bg-[#25D366] !rounded-lg !py-2 !px-4"
        place="top"
        animation="fade"
        delayShow={200}
        delayHide={300}
      />
    </div>
  );
};

export default memo(WhatsApp);