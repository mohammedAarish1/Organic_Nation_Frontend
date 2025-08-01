import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import api from "../../config/axiosConfig";

// const apiUrl = import.meta.env.VITE_BACKEND_URL;


// add orders 
export const addOrders = createAsyncThunk(
    'manageOrders/addOrders',
    async (checkoutData, { rejectWithValue,getState }) => {
        // const token = JSON.parse(sessionStorage.getItem('token'));
        const { auth } = getState();
        try {
if(auth.user){
    const response = await api.post(`/api/orders`, checkoutData, {
        // headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json'
        // }
    });
    return response.data;
}
           
           
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);



// get all orders of the user 
export const getAllOrders = createAsyncThunk(
    'manageOrders/getAllOrders',
    async (_, { rejectWithValue,getState }) => {
        const { auth } = getState();
        try {
            if(auth.user){
                const response = await api.get(`/api/orders/all`,
                    // {
                    //     headers: {
                    //         // 'Authorization': `Bearer ${token}`,
                    //         'Content-Type': 'application/json'
                    //     }
                    // }
                );
                return response.data;
            }
         
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);




export const cancelOrder = createAsyncThunk(
    'manageOrders/cancelOrder',
    async (id, { rejectWithValue ,getState}) => {
        const { auth } = getState();
        try {
            if (auth.user) {
                const response = await api.delete(`/api/orders/${id}`,
                    // {
                    //     headers: {
                    //         'Authorization': `Bearer ${token}`,
                    //         'Content-Type': 'application/json'
                    //     }
                    // }
                )
                return response.data.msg;
            }

        } catch (error) {
            return rejectWithValue(err.response.data);
        }
    }
)


const initialState = {
    orders: [],
    singleOrder: {},
    loading: false,
    addingNewOrder: false,
    addingReturnedItems: false,
    error: null,
    ordersByStatus: {
        orderData: [],
        orderStatusTab: "total"
    },
    checkoutStatus: false,

}

const manageOrders = createSlice({
    name: "orders",
    initialState,
    reducers: {
        getOrdersByStatus: (state, action) => {
            if (action.payload === "total") {
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: state.orders,
                        orderStatusTab: action.payload
                    }
                }
            } else if (action.payload === "active") {
                let activeOrders = state.orders?.filter(order => order.orderStatus === action.payload);
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: activeOrders,
                        orderStatusTab: action.payload
                    }
                }
            } else if (action.payload === "dispatched") {
                let activeOrders = state.orders?.filter(order => order.orderStatus === action.payload);
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: activeOrders,
                        orderStatusTab: action.payload
                    }
                }
            } else if (action.payload === "completed") {
                let activeOrders = state.orders?.filter(order => order.orderStatus === action.payload);
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: activeOrders,
                        orderStatusTab: action.payload
                    }
                }
            } else if (action.payload === "cancelled") {
                let activeOrders = state.orders?.filter(order => order.orderStatus === action.payload);
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: activeOrders,
                        orderStatusTab: action.payload
                    }
                }
            } else {
                return {
                    ...state,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: state.orders,
                    }
                }
            }
        },
        clearUserOrders: (state, action) => {
            return {
                ...state,
                orders: [],
                ordersByStatus: {
                    ...state.ordersByStatus,
                    orderData: [],
                }
            }
        },
        resetCheckoutStatus: (state, action) => {
            return {
                ...state,
                checkoutStatus: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // add orders
            .addCase(addOrders.pending, (state) => {
                return {
                    ...state,
                    addingNewOrder: true,
                }
            })
            .addCase(addOrders.fulfilled, (state) => {
                return {
                    ...state,
                    addingNewOrder: false,
                    error: null,
                }
            })
            .addCase(addOrders.rejected, (state, action) => {
                return {
                    ...state,
                    addingNewOrder: false,
                    error: action.payload || 'Something went wrong',
                }
            })
            // get all orders
            .addCase(getAllOrders.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {

                return {
                    ...state,
                    loading: false,
                    orders: action.payload,
                    error: null,
                    ordersByStatus: {
                        ...state.ordersByStatus,
                        orderData: action.payload || [],
                    }
                }
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload || 'Something went wrong'
                }
            })

    }

})

export const { getOrdersByStatus, clearUserOrders, resetCheckoutStatus } = manageOrders.actions;


export default manageOrders.reducer;


