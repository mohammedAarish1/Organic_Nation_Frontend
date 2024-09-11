import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// thunk for signing up 
export const userSignup = createAsyncThunk(
    'auth/userSignup',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/signup`, userData);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);
// thunk for google signing up 
export const userGoogleSignup = createAsyncThunk(
    'auth/userGoogleSignup',
    async ({ userData, token }, { rejectWithValue }) => {
        try {
            if (token) {
                const response = await axios.post(`${apiUrl}/api/auth/google/phone`, userData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }, { withCredentials: true },
                );
                return response.data;
            }
        } catch (error) {
            throw error
        }
    }
);

// thunk for log in 
export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, userData);

            if (response.data) {
                // const localCart = JSON.parse(localStorage.getItem('cart') || []);
                // if (localCart.length > 0) {
                return response.data;
                // }
                // sessionStorage.setItem("token", JSON.stringify(response.data.token));
                // return { user, hasLocalCart: false };
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// fetch user data 

export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/api/auth/user`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


const initialState = {
    user: null,
    userRegistered: true,  // need this varibale to show UI of log in and sign up 
    user_loading: false,
    error: null,
    token: JSON.parse(sessionStorage.getItem('token')) || '',
    // hasLocalCart: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout(state) {
            return {
                ...state,
                user: null,
                token: ''
            }
        },
        updateUserRegisterStatus(state, action) {
            return {
                ...state,
                userRegistered: action.payload
            }
        }

    },
    extraReducers: (builder) => {
        builder
            // ========= signing up ==========
            .addCase(userSignup.pending, (state) => {
                return {
                    ...state,
                    user_loading: true,
                    error: null,
                }
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                return {
                    ...state,
                    user_loading: false,
                    user: action.payload,

                }
            })
            .addCase(userSignup.rejected, (state, action) => {
                return {
                    ...state,
                    user_loading: false,
                    error: action.payload,
                }
            })

            // =========google signing up ==========
            .addCase(userGoogleSignup.pending, (state) => {
                return {
                    ...state,
                    user_loading: true,
                    error: null,
                }
            })
            .addCase(userGoogleSignup.fulfilled, (state, action) => {
                return {
                    ...state,
                    user_loading: false,
                    user: action.payload,

                }
            })
            .addCase(userGoogleSignup.rejected, (state, action) => {
                return {
                    ...state,
                    user_loading: false,
                    error: action.payload,
                }
            })

            // ============ logging in ===========
            .addCase(userLogin.pending, (state) => {
                return {
                    ...state,
                    user_loading: true,
                    error: null,
                }
            })
            .addCase(userLogin.fulfilled, (state, action) => {

                state.user_loading = false
                state.token = action.payload.token

            })
            .addCase(userLogin.rejected, (state, action) => {
                return {
                    ...state,
                    user_loading: false,
                    error: action.payload
                }
            })
            // ============ fetch user data ===========
            .addCase(fetchUserData.pending, (state) => {
                return {
                    ...state,
                    user_loading: true,
                    error: null,
                }
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                return {
                    ...state,
                    user_loading: false,
                    user: action.payload
                }
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                return {
                    ...state,
                    user_loading: false,
                    error: action.payload
                }
            })
    }


})

export const { userLogout, clearLocalCartFlag, updateUserRegisterStatus } = userSlice.actions;

export default userSlice.reducer;