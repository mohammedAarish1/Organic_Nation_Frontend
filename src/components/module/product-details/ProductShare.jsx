import React, { useState } from 'react';
import { FaFacebook,  FaLinkedin, FaWhatsapp, FaLink } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
const sharePlatforms = [
  {
    name: 'facebook',
    icon: <FaFacebook className="text-xl" />,
    colorClass: 'bg-blue-600 hover:bg-blue-700',
    label: 'Facebook',
  },
  {
    name: 'twitter',
    icon: <FaXTwitter  className="text-xl" />,
    colorClass: 'bg-sky-500 hover:bg-sky-600',
    label: 'Twitter',
  },
  {
    name: 'linkedin',
    icon: <FaLinkedin className="text-xl" />,
    colorClass: 'bg-blue-800 hover:bg-blue-900',
    label: 'LinkedIn',
  },
  {
    name: 'whatsapp',
    icon: <FaWhatsapp className="text-xl" />,
    colorClass: 'bg-green-600 hover:bg-green-700',
    label: 'WhatsApp',
  },
];


const ProductShare = ({
  url = window.location.href,
  title = '',
  description = ''
}) => {
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`
  };



  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopyTooltip(true);
      setTimeout(() => setShowCopyTooltip(false), 2000);
    } catch (err) {
      throw err
    }
  };

  return (

    <div className="flex flex-col justify-center items-center gap-4 p-4">
      <h3 className="text-lg font-semibold">Share this product:</h3>

      <div className="flex flex-wrap gap-3">

        {sharePlatforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform.name)}
            className={`flex items-center gap-2 px-4 py-2 text-white ${platform.colorClass} rounded-lg transition-colors`}
            aria-label={`Share on ${platform.label}`}
          >
            {platform.icon}
            {/* <span className="hidden sm:inline">{platform.label}</span> */}
          </button>
        ))}


        {/* Copy Link */}
        <div className="relative">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            aria-label="Copy link"
          >
            <FaLink className="text-xl" />
            <span className="hidden sm:inline">Copy Link</span>
          </button>

          {showCopyTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-sm rounded">
              Link copied!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default ProductShare;
