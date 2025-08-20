import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../config/axiosConfig";

const apiUrl = import.meta.env.VITE_BACKEND_URL;


export const checkDeliveryAvailability = createAsyncThunk(
    'delivery/checkDeliveryAvailability',
    async (pincode, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/api/delivery/check-availability/${pincode}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
)

export const calculateShippingFee = createAsyncThunk(
    'delivery/calculateShippingFee',
    async ({ pinCode }, { rejectWithValue }) => {
        try {
            // let deliveryChargeToken = localStorage.getItem('deliveryChargeToken')
            const response = await api.post(`/api/delivery-charges/calculate`, { pinCode },
                // {
                //     headers: deliveryChargeToken ? {
                //         'Authorization': `Bearer ${deliveryChargeToken}`,
                //         'Content-Type': 'application/json'
                //     } : {}
                // }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status
            });
        }
    }
)


export const calculateCODCharges = createAsyncThunk(
    'delivery/calculateCODCharges',
    async (cartItemsList, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/delivery-charges/calculate/cod-charges`, { cartItemsList });
            if (response.status === 200) {
                const CODCharge = response.data.codCharge
                return CODCharge;
            }

        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status
            });
        }
    }
)


const initialState = {
    isAvailable: null,
    message: '',
    userCity: '',
    userPincode: '',
    userState: '',
    checking: false,
    error: null,
    shippingFee: 0,
    CODCharge: 0,
}

const checkDelivery = createSlice({
    name: "delivery",
    initialState,
    reducers: {
        setIsAvailable: (state) => {
            state.isAvailable = true;
        },
        updateShippingFee: (state) => {
            state.shippingFee = 0;
        },
        // handleSavingLocalAdd:(state,action)=>{

        //     if(action.payload.mainAdd){
        //         return{
        //             ...state,
        //             locallySavedAddress:{
        //                 ...state.locallySavedAddress,
        //                 add1:action.payload.mainAdd ||'',
        //             }
        //         }
        //     }else{
        //         return{
        //             ...state,
        //             locallySavedAddress:{
        //                 ...state.locallySavedAddress,
        //                 add2:action.payload.optionalAdd||''
        //             }
        //         }
        //     }

        // }
    },
    extraReducers: (builder) => {
        builder.addCase(checkDeliveryAvailability.pending, (state) => {
            state.checking = true;
        })
        builder.addCase(checkDeliveryAvailability.fulfilled, (state, action) => {

            state.isAvailable = action.payload?.available;
            state.message = action.payload.message;
            state.checking = false;
            state.error = null;
            state.userCity = action.payload?.data?.city;
            state.userState = action.payload?.data?.state;
            state.userPincode = action.payload?.data?.pinCode;

            // return {
            //     ...state,
            //     isAvailable: action.payload?.available,
            //     message: action.payload.message,
            //     checking: false,
            //     error: null,
            //     userCity: action.payload?.data?.city,
            //     userState: action.payload?.data?.state,
            //     userPincode: action.payload?.data?.pinCode
            // }
        })
        builder.addCase(checkDeliveryAvailability.rejected, (state, action) => {
            state.isAvailable = action.payload.available;
            state.checking = false;
            state.error = action.payload?.message;
            // return {
            //     ...state,
            //     isAvailable: action.payload.available,
            //     checking: false,
            //     error: action.payload?.message,
            // }
        })
        // calculate shipping fee 
        builder.addCase(calculateShippingFee.pending, (state) => {
            state.checking = true
            // return {
            //     ...state,
            //     checking: true,
            // }
        })
        builder.addCase(calculateShippingFee.fulfilled, (state, action) => {

            if (action.payload) {
                state.checking = false;
                state.shippingFee = action.payload.deliveryCharge;
                // return {
                //     ...state,
                //     checking: false,
                //     shippingFee: action.payload.deliveryCharge
                // }
            }

        })
        builder.addCase(calculateShippingFee.rejected, (state, action) => {
            state.checking = false;
            state.error = action.payload;
            // return {
            //     ...state,
            //     checking: false,
            //     error: action.payload,
            // }
        })
        // calculate COD charge
        builder.addCase(calculateCODCharges.pending, (state) => {
            state.checking = true
        })
        builder.addCase(calculateCODCharges.fulfilled, (state, action) => {
            if (action.payload) {
                state.checking = false;
                state.CODCharge = action.payload
            }

        })
        builder.addCase(calculateCODCharges.rejected, (state, action) => {
            state.checking = false;
            state.error = action.payload;
        })
    }
})

export const { setIsAvailable, updateShippingFee } = checkDelivery.actions;

export default checkDelivery.reducer;