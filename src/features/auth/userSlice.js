import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// thunk for signing up 
export const userSignup = createAsyncThunk(
    'auth/userSignup',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:4000/api/auth/signup', userData);
            console.log("response", response.data)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
);
// thunk for google signing up 
export const userGoogleSignup = createAsyncThunk(
    'auth/userGoogleSignup',
    async ({ userData, token }, { rejectWithValue }) => {
        console.log(userData, token);
        try {
            if (token) {
                const response = await axios.post('http://localhost:4000/api/auth/google/phone', userData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }, { withCredentials: true },
                );
                console.log("response-google-signup", response.data)
                return response.data;
            }
        } catch (error) {
            console.log(error)
        }
    }
);

// thunk for log in 
export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', userData);
            console.log('log in data', response.data)

            if (response.data) {
                // const localCart = JSON.parse(localStorage.getItem('cart') || []);
                // if (localCart.length > 0) {
                return response.data;
                // }
                // sessionStorage.setItem("token", JSON.stringify(response.data.token));
                // return { user, hasLocalCart: false };
            }
        } catch (error) {
            console.log('error', error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// fetch user data 

export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (token, { rejectWithValue }) => {
        // console.log('inside fetch data', email)
        try {
            const response = await axios.get(`http://localhost:4000/api/auth/user`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            // console.log(response.data, 'response')
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
                console.log('usersignup', action.payload)
                return {
                    ...state,
                    user_loading: false,
                    user: action.payload,

                }
            })
            .addCase(userSignup.rejected, (state, action) => {
                console.log('usersignup rejected', action.payload)
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
                console.log('usergooglesignup', action.payload)
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
                console.log('log in dataaaaaaaaa', action.payload)

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
                console.log('userdata', action.payload)
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

export const { userLogout, clearLocalCartFlag } = userSlice.actions;

export default userSlice.reducer;