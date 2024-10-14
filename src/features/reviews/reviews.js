import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../config/axiosConfig";

const apiUrl = import.meta.env.VITE_BACKEND_URL;


// for adding reviews 
export const addReviews = createAsyncThunk(
    'reviews/addReviews',
    async (reviews, { rejectWithValue,getState }) => {
        const {auth}=getState()
        try {
            // const token = JSON.parse(sessionStorage.getItem('token'));
            if (auth.user) {
                const response = await api.post(`/api/reviews`, reviews,
                    // {
                    //     headers: {
                    //         // 'Authorization': `Bearer ${token}`,
                    //         'Content-Type': 'application/json'
                    //     }
                    // }
                );
                // return response.data;
            }


        } catch (error) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status
            });
        }
    }
)

//  for getting all reviews 
export const getAllReviews = createAsyncThunk(
    'reviews/getAllReviews',
    async (nameUrl, { rejectWithValue }) => {
        try {

            const response = await axios.get(`${apiUrl}/api/reviews/${nameUrl}`);
            if (response.data) {
                return response.data;
            }

        } catch (error) {
            return rejectWithValue({
                message: err.message,
                status: err.response?.status
            });
        }
    }
)


// for getting the average rating of the product

export const getAverageRating = createAsyncThunk(
    'reviews/getAverageRating',
    async (nameUrl, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/api/reviews/average/${nameUrl}`);
            return response.data.averageRating;

        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status
            });
        }
    }
)

// for delivery feedback 
export const addDeliveryFeedback = createAsyncThunk(
    'reviews/addDeliveryFeedback',
    async (payload, { rejectWithValue,getState }) => {
        const {auth}=getState()
        try {
            if (auth.user) {
                const response = await api.post(`/api/delivery/feedback`, payload,
                    // {
                    //     headers: {
                    //         'Authorization': `Bearer ${token}`,
                    //         'Content-Type': 'application/json'
                    //     }
                    // }
                );
                // return response.data;
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
    allReviews: [],
    averageRating: '',
    loading: false,
    error: null,
    reviewStatus: false,
}

const reviews = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        setReviewStatus: (state, action) => {
            return {
                ...state,
                reviewStatus: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addReviews.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(addReviews.fulfilled, (state) => {
                return {
                    ...state,
                    loading: false,
                }
            })
            .addCase(addReviews.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            })
            // ============= get reviews ==========
            .addCase(getAllReviews.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAllReviews.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    allReviews: action.payload
                }
            })
            .addCase(getAllReviews.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                    allReviews: []

                }
            })
            // ============= get average ratings ==========
            .addCase(getAverageRating.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(getAverageRating.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    averageRating: action.payload
                }
            })
            .addCase(getAverageRating.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                    averageRating: '',
                }
            })
    }
})


export const { setReviewStatus } = reviews.actions;

export default reviews.reducer;

