import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;


export const getAllBlogs = createAsyncThunk(
    'blog/getAllBlogs',
    async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/blogs`);
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
)

export const getAllRecipes = createAsyncThunk(
    'blog/getAllRecipes',
    async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/recipes`);
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
)



const initialState = {
    loading: false,
    blogs: [],
    recentBlogs: [],
    recipes: [],
    error: null,
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBlogs.pending, (state, action) => {
            return {
                ...state,
                loading: true,
            }
        })
        builder.addCase(getAllBlogs.fulfilled, (state, action) => {

            if (action.payload) {
                const recentBlogs = action.payload?.filter(blog => blog.recent)

                return {
                    ...state,
                    loading: false,
                    blogs: action.payload,
                    recentBlogs,
                }
            }


        })
        builder.addCase(getAllBlogs.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        })
        // get all recipes
        builder.addCase(getAllRecipes.pending, (state, action) => {
            return {
                ...state,
                loading: true,
            }
        })
        builder.addCase(getAllRecipes.fulfilled, (state, action) => {

            if (action.payload) {
                // const recentBlogs = action.payload.filter(blog => blog.recent)

                return {
                    ...state,
                    loading: false,
                    recipes: action.payload,
                }
            }


        })
        builder.addCase(getAllRecipes.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        })
    }
})



export default blogSlice.reducer;