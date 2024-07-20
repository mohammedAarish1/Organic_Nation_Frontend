import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const checkDeliveryAvailability = createAsyncThunk(
    'delivery/checkDeliveryAvailability',
    async (pincode, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/delivery/check-availability/${pincode}`);
            console.log(response.data)
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
            console.log('dfasdfasd', deliveryChargeToken)
            // console.log('dataaaaaaa', typeof pinCode, typeof weight)
            const response = await axios.post(`http://localhost:4000/api/delivery-charges/calculate`, { pinCode, weight },
                {
                    headers: deliveryChargeToken ? {
                        'Authorization': `Bearer ${deliveryChargeToken}`,
                        'Content-Type': 'application/json'
                    } : {}
                }
            );
            console.log('calcu', response.data)
            return response.data;
        } catch (error) {
            console.log('error', error)
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
                isAvailable: action.payload.available,
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


export default checkDelivery.reducer;