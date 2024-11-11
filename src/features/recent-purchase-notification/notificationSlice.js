// store/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';


const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        isVisible: true,
        recentOrders: [],
        currentOrderIndex: 0,
        hasUserDismissed: false, // Track if user has dismissed notifications
        isInitialized: false // Track if initial data is loaded
    },
    reducers: {
        setOrders: (state, action) => {
            state.recentOrders = action.payload;
            state.isInitialized = true;
        },
        nextOrder: (state) => {
            if (state.recentOrders.length > 0) {
                state.currentOrderIndex = 
                    (state.currentOrderIndex + 1) % state.recentOrders.length;
            }
        },
        dismissNotifications: (state) => {
            state.isVisible = false;
            state.hasUserDismissed = true;
        }
    }
});

export const { setOrders, nextOrder, dismissNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;

// Selector for memoizing current order
export const selectCurrentOrder = (state) => {
    const { recentOrders, currentOrderIndex } = state.notification;
    return recentOrders[currentOrderIndex];
};