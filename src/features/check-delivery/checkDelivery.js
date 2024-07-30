import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;


export const checkDeliveryAvailability = createAsyncThunk(
    'delivery/checkDeliveryAvailability',
    async (pincode, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/api/delivery/check-availability/${pincode}`);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status
            });
        }
    }
)

export const calculateShippingFee = createAsyncThunk(
    'delivery/calculateShippingFee',
    async ({ pinCode, weight }, { rejectWithValue }) => {
        try {
            let deliveryChargeToken = localStorage.getItem('deliveryChargeToken')
            const response = await axios.post(`${apiUrl}/api/delivery-charges/calculate`, { pinCode, weight },
                {
                    headers: deliveryChargeToken ? {
                        'Authorization': `Bearer ${deliveryChargeToken}`,
                        'Content-Type': 'application/json'
                    } : {}
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status
            });
        }
    }
)


const initialState = {
    isAvailable: null,
    message: '',
    checking: false,
    error: null,
    shippingFee: 50
}

const checkDelivery = createSlice({
    name: "delivery",
    initialState,
    reducers: {
        setIsAvailable: (state) => {
            return {
                ...state,
                isAvailable: null,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkDeliveryAvailability.pending, (state) => {
            return {
                ...state,
                checking: true,
            }
        })
        builder.addCase(checkDeliveryAvailability.fulfilled, (state, action) => {
            return {
                ...state,
                isAvailable: action.payload?.available,
                message: action.payload.message,
                checking: false,
            }
        })
        builder.addCase(checkDeliveryAvailability.rejected, (state, action) => {
            return {
                ...state,
                isAvailable: action.payload.available,
                message: action.payload.message,
                checking: false,
                error: action.payload.message,
            }
        })
        // calculate shipping fee 
        builder.addCase(calculateShippingFee.pending, (state) => {
            return {
                ...state,
                checking: true,
            }
        })
        builder.addCase(calculateShippingFee.fulfilled, (state, action) => {

            if (action.payload) {
                return {
                    ...state,
                    checking: false,
                    shippingFee: action.payload.deliveryCharge
                }
            }

        })
        builder.addCase(calculateShippingFee.rejected, (state, action) => {
            return {
                ...state,
                checking: false,
                error: action.payload,
            }
        })
    }
})

export const { setIsAvailable } = checkDelivery.actions;

export default checkDelivery.reducer;