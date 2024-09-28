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
    userCity:'',
    userPincode:'',
    locallySavedAddress:{
        add1:'',
        add2:''
    },
    userState:'',
    checking: false,
    error: null,
    shippingFee: 0
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
        },
        updateShippingFee:(state)=>{
            return {
                ...state,
                shippingFee:0
            }
        },
        handleSavingLocalAdd:(state,action)=>{

            if(action.payload.mainAdd){
                return{
                    ...state,
                    locallySavedAddress:{
                        ...state.locallySavedAddress,
                        add1:action.payload.mainAdd ||'',
                    }
                }
            }else{
                return{
                    ...state,
                    locallySavedAddress:{
                        ...state.locallySavedAddress,
                        add2:action.payload.optionalAdd||''
                    }
                }
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
                userCity:action.payload?.data?.city,
                userState:action.payload?.data?.state,
                userPincode:action.payload?.data?.pinCode
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

export const { setIsAvailable,updateShippingFee,handleSavingLocalAdd } = checkDelivery.actions;

export default checkDelivery.reducer;