// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const apiUrl = import.meta.env.VITE_BACKEND_URL;


// export const verifyEmail = createAsyncThunk(
//     'forgotPassword/verifyEmail',
//     async (email, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`${apiUrl}/api/forgot-password/verify-email`, { email });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// export const resetPassword = createAsyncThunk(
//     'forgotPassword/resetPassword',
//     async ({ token, newPassword }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`${apiUrl}/api/forgot-password/reset-password`, { token, newPassword });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// const forgotPassword = createSlice({
//     name: 'forgotPassword',
//     initialState: {
//         loading: false,
//         message: null,
//         error: null,
//     },
//     reducers: {
//         // ... other reducers
//     },
//     extraReducers: (builder) => {
//         builder
//             // ========= verifying email ===========
//             .addCase(verifyEmail.pending, (state) => {

//                 return {
//                     ...state,
//                     loading: true,
//                 }
//             })
//             .addCase(verifyEmail.fulfilled, (state, action) => {
//                 return {
//                     ...state,
//                     loading: false,
//                     message: action.payload.message
//                 }
//             })
//             .addCase(verifyEmail.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload.message;
//             })
//             //============= reset password =========
//             .addCase(resetPassword.pending, (state) => {
//                 return {
//                     ...state,
//                     loading: true,
//                 }
//             })
//             .addCase(resetPassword.fulfilled, (state, action) => {
//                 return {
//                     ...state,
//                     loading: false,
//                     message: action.payload.message,
//                 }
//             })
//             .addCase(resetPassword.rejected, (state, action) => {

//                 return {
//                     ...state,
//                     loading: false,
//                     message: action.payload.message
//                 }
//             });
//     },
// });

// export default forgotPassword.reducer;