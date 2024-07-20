import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// for adding reviews 
export const addReviews = createAsyncThunk(
    'reviews/addReviews',
    async (reviews, { rejectWithValue }) => {
        try {
            const token = JSON.parse(sessionStorage.getItem('token'));
            if (token) {
                const response = await axios.post('http://localhost:4000/api/reviews', reviews,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response);
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

            console.log('nameUrllllllllllll', nameUrl);
            const response = await axios.get(`http://localhost:4000/api/reviews/${nameUrl}`);
            console.log('responseeeeeeeeeeee', response.data);
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
            console.log('averageRating url', nameUrl)
            const response = await axios.get(`http://localhost:4000/api/reviews/average/${nameUrl}`);
            console.log('averagerating', response.data.averageRating);
            return response.data.averageRating;

        } catch (error) {
            console.log(error, 'ccccccccccccccccccccccccccccccccc')
            return rejectWithValue({
                message: error.message,
                status: error.response?.status
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
                console.log('averageRating', action.payload)
                return {
                    ...state,
                    loading: false,
                    averageRating: action.payload
                }
            })
            .addCase(getAverageRating.rejected, (state, action) => {
                console.log('avratingerror', action.payload)
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

