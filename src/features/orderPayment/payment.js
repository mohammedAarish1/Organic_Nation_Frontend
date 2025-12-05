import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// for adding reviews
export const initiatePayment = createAsyncThunk(
  "payment/initiatePayment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/phonepe/payment`, {
        ...data,
      });

      if (
        response.status === 200 &&
        response.data.data.instrumentResponse.redirectInfo.url
      ) {
        window.location.href =
          response.data.data.instrumentResponse.redirectInfo.url;
      }
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// for adding reviews
export const updateMerchantTransId = createAsyncThunk(
  "payment/updateMerchantTransId",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/phonepe/update/transaction-id/${payload.id}`,
        { newMerchantTransactionId: payload.newMerchantTransactionId }
      );
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

const initialState = {
  loading: false,
  error: null,
};

const payment = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(initiatePayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { setReviewStatus } = reviews.actions;

export default payment.reducer;
