import { useState } from 'react';
import { toast } from 'react-toastify';

export const useShare = () => {
  const [isSharing, setIsSharing] = useState(false);

  const shareProduct = async (product) => {
    setIsSharing(true);
    
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} - ₹${Math.round(product.price - (product.price * product.discount) / 100)}`,
      url: window.location.href
    };

    try {
      // Check if Web Share API is supported (mobile devices)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // User cancelled share, do nothing
      } else {
        console.error('Share error:', error);
        toast.error('Failed to share');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return { shareProduct, isSharing };
};