// import React from 'react';
// import { Tooltip } from 'react-tooltip';

// const WhatsApp = () => {
//     const phoneNumber = +919999532041

//     const handleClick = () => {
//         const whatsappUrl = `https://wa.me/${phoneNumber}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     return (
//         <div>
//             <img
//                 src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/whatsApp.png'
//                 alt="WhatsApp"
//                 onClick={handleClick}
//                 className='cursor-pointer w-16'
//                 data-tooltip-id="whatsapp-tooltip"
//                 data-tooltip-content="Click to chat with us"
//                 data-tooltip-place="top"
//             // style={{ cursor: 'pointer' }}
//             />
//             <Tooltip
//                 id="whatsapp-tooltip"
//                 style={{
//                     backgroundColor: "#25D366",
//                     color: "#ffffff",
//                     borderRadius: "10px",
//                     padding: "20px"
//                 }}
//                 place="top"
//                 animation="fade"
//                 delayShow={200} // delay before showing in ms
//                 delayHide={300} // delay before hiding in ms
//             // offset={10} // distance in pixels
//             // arrow={true}
//             // arrowColor="#25D366"
//             >

//             </Tooltip >

//         </div>

//     );
// };

// export default WhatsApp;


import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';


const WhatsApp = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
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
        className="w-16 h-16 bg-gray-100 rounded-full"
        style={{ 
          display: imageLoaded ? 'none' : 'block' 
        }}
      />
      
      <img
        src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/whatsApp.png'
        alt="Chat with us on WhatsApp"
        onClick={handleClick}
        onLoad={() => setImageLoaded(true)}
        className={`cursor-pointer absolute top-0 left-0 w-16 h-16 transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
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

export default WhatsApp;