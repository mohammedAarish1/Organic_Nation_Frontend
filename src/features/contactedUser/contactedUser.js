import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for submitting the contact form
export const submitContactForm = createAsyncThunk(
    'contactedUser/submitContactForm',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:4000/api/user-query/submit-contact-details', formData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    loading: false,
    success: false,
    error: null,
};

const contactedUser = createSlice({
    name: 'contactedUser',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContactForm.pending, (state) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(submitContactForm.fulfilled, (state) => {
                return {
                    ...state,
                    loading: false,
                    success: true,

                }
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    success: false,
                    error: action.payload.message || 'An error occurred'
                }

            });
    },
});


export default contactedUser.reducer;