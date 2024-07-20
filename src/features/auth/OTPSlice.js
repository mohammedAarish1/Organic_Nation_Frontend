import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const requestOTP = createAsyncThunk(
    'OTPSlice/requestOTP',
    async (phoneNumber, { rejectWithValue }) => {
        try {
            console.log('phonenumber thunk', typeof phoneNumber, phoneNumber)
            const response = await axios.post('http://localhost:4000/api/otp-auth/send-otp', { phoneNumber })
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.error('Error requesting OTP:', error);
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async ({ phoneNumber, otp }, { rejectWithValue }) => {
        try {
            // console.log(phoneNumber, 'otp', otp)
            const response = await axios.post('http://localhost:4000/api/otp-auth/verify-otp', { phoneNumber, otp });
            console.log('resss', response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);

        }
    }
);



const initialState = {
    isAuthenticated: false,
    loading: false,
    otpMessage: null,
    error: null,
}

const OTPSlice = createSlice({
    name: 'OTPSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(requestOTP.pending, (state) => {
            return {
                ...state,
                loading: true,
            }
        })
        builder.addCase(requestOTP.fulfilled, (state, action) => {
            // console.log('otp response', action.payload)
            return {
                ...state,
                loading: false,
                otpMessage: action.payload.message
            }
        })
        builder.addCase(requestOTP.rejected, (state, action) => {
            // console.log('otp response', action.payload)
            return {
                ...state,
                loading: false,
                otpMessage: action.payload.message,
                error: action.payload
            }
        })
        // ============ otp verification
        builder.addCase(verifyOTP.pending, (state) => {
            return {
                ...state,
                loading: true
            }
        })
        builder.addCase(verifyOTP.fulfilled, (state, action) => {
            // console.log('otp response', action.payload)
            return {
                ...state,
                isAuthenticated: true,
                otpMessage: action.payload.message
            }
        })
        builder.addCase(verifyOTP.rejected, (state, action) => {
            // console.log('otp response', action.payload)
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                otpMessage: action.payload.message,
                error: action.payload
            }
        })
    }
})


export default OTPSlice.reducer;