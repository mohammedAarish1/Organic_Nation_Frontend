import { createContext, useContext, useState, useCallback } from 'react';

const CartNotificationContext = createContext();

export const CartNotificationProvider = ({ children }) => {
  const [isCartNotificationVisible, setIsCartNotificationVisible] = useState(false);
  
  // Function to show the cart notification
  const showCartNotification = useCallback(() => {
    setIsCartNotificationVisible(true);
  }, []);
  
  // Function to hide the cart notification
  const hideCartNotification = useCallback(() => {
    setIsCartNotificationVisible(false);
  }, []);
  
  const value = {
    isCartNotificationVisible,
    showCartNotification,
    hideCartNotification
  };
  
  return (
    <CartNotificationContext.Provider value={value}>
      {children}
    </CartNotificationContext.Provider>
  );
};

// Custom hook to use the cart notification context
export const useCartNotification = () => {
  const context = useContext(CartNotificationContext);
  if (!context) {
    throw new Error('useCartNotification must be used within a CartNotificationProvider');
  }
  return context;
};