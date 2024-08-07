import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;


// for adding reviews 
export const initiatePayment = createAsyncThunk(
    'payment/initiatePayment',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/phonepe/payment`, { ...data })

            console.log('response', response)
            if (response.status === 200 && response.data.data.instrumentResponse.redirectInfo.url) {
                window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
            } else {
                console.log('error')
            }


        } catch (error) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status
            });
        }
    }
)





const initialState = {
    loading: false,
    success: false,
    error: null,
}

const payment = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(addReviews.pending, (state) => {
    //             return {
    //                 ...state,
    //                 loading: true,
    //             }
    //         })
    //         .addCase(addReviews.fulfilled, (state) => {
    //             return {
    //                 ...state,
    //                 loading: false,
    //             }
    //         })
    //         .addCase(addReviews.rejected, (state, action) => {
    //             return {
    //                 ...state,
    //                 loading: false,
    //                 error: action.payload
    //             }
    //         })


    // }
})


// export const { setReviewStatus } = reviews.actions;

export default payment.reducer;

