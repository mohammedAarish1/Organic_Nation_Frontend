import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { X } from 'lucide-react';
import { RxCross2 } from "react-icons/rx";
import { setOrders, nextOrder, dismissNotifications, selectCurrentOrder } from '../../features/recent-purchase-notification/notificationSlice';
// import { fetchRecentOrders } from './utils/ordersApi';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;


// utils/ordersApi.js
const fetchRecentOrders = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/orders/recent/purchases`);

        if(response.data.length>0){
            return response.data
        }else{
            return []
        }


    } catch (error) {
        return [];
    }
};


const INITIAL_DELAY = 10000; // 10 seconds
const ROTATION_INTERVAL = 10000; // 20 seconds

const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
};

const RecentOrderNotification = () => {
    const dispatch = useDispatch();
    const rotationTimerRef = useRef(null);
    const currentOrder = useSelector(selectCurrentOrder);
    const { isVisible, hasUserDismissed, isInitialized } = useSelector(
        state => state.notification
    );

    // Initialize data with proper cleanup
    useEffect(() => {
        let isSubscribed = true;
        let initialTimer = null;

        const initializeData = async () => {
            if (!isInitialized && !hasUserDismissed) {
                initialTimer = setTimeout(async () => {
                    const orders = await fetchRecentOrders();
                    if (isSubscribed && orders.length > 0) {
                        dispatch(setOrders(orders));
                    }
                }, INITIAL_DELAY);
            }
        };

        initializeData();

        // Cleanup function
        return () => {
            isSubscribed = false;
            if (initialTimer) clearTimeout(initialTimer);
        };
    }, [dispatch, isInitialized, hasUserDismissed]);

    // Handle rotation timer with cleanup
    useEffect(() => {
        if (isInitialized && isVisible && !hasUserDismissed) {
            rotationTimerRef.current = setInterval(() => {
                dispatch(nextOrder());
            }, ROTATION_INTERVAL);
        }

        return () => {
            if (rotationTimerRef.current) {
                clearInterval(rotationTimerRef.current);
                rotationTimerRef.current = null;
            }
        };
    }, [dispatch, isInitialized, isVisible, hasUserDismissed]);

    // Early return conditions
    if (!isVisible || hasUserDismissed || !currentOrder) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 xs:right-0 right-4 animate-slide-in font-sans z-20 max-w-96">
            <div className="bg-[var(--bgColorPrimary)]  rounded-lg shadow-lg p-4 pt-2 ">
                <div className='text-end'>
                <button
                        onClick={() => dispatch(dismissNotifications())}
                        className="text-gray-200 hover:text-gray-500 transition-colors"
                        aria-label="Dismiss notification"
                    >
                        <RxCross2 className='text-2xl ' />
                    </button>
                </div>
                <div className="flex justify-between items-start">
                    <div className="flex-1 ">
                        <div className="flex items-center gap-2">
                            <div className="w-20  h-20  rounded-full flex items-center justify-center">
                                {currentOrder.itemImage ? (
                                    <img 
                                    src={currentOrder.itemImage} 
                                    alt="item_image"
                                    className='max-w-full max-h-full'
                                     />
                                ) : (
                                    <span className="text-gray-500 text-xs">
                                        {currentOrder.itemName.charAt(0).toUpperCase()}
                                    </span>
                                )}


                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="xs:text-sm text-[10px] font-medium text-white ">
                                    {currentOrder.userName} from {currentOrder.state}
                                </p>
                                <p className=" text-white">
                                  recently  purchased '{currentOrder.itemName}'
                                    {/* {currentOrder.quantity > 1 &&
                                        ` (${currentOrder.quantity} ${currentOrder.weight})`
                                    } */}
                                </p>
                                {/* <p className="text-xs text-gray-400">
                                    {formatTimeAgo(currentOrder.createdAt)}
                                </p> */}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default RecentOrderNotification;