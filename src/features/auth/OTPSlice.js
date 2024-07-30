import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;


export const requestOTP = createAsyncThunk(
    'OTPSlice/requestOTP',
    async (phoneNumber, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/otp-auth/send-otp`, { phoneNumber })
            if (response) {
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async ({ phoneNumber, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/otp-auth/verify-otp`, { phoneNumber, otp });
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
            return {
                ...state,
                loading: false,
                otpMessage: action.payload.message
            }
        })
        builder.addCase(requestOTP.rejected, (state, action) => {
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
            return {
                ...state,
                isAuthenticated: true,
                otpMessage: action.payload.message
            }
        })
        builder.addCase(verifyOTP.rejected, (state, action) => {
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