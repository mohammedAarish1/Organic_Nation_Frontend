import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/axiosConfig";
// import axios from "axios";

// const apiUrl = import.meta.env.VITE_BACKEND_URL;

// thunk for signing up
// export const signup = createAsyncThunk(
//   "auth/signup",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/api/auth/user/signup", userData);
//       const { accessToken, user } = response.data;

//       // Set access token in axios headers
//       api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//       return { user, accessToken };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// thunk for google signing up
// export const handleGoogleSignup = createAsyncThunk(
//   "auth/handleGoogleSignup",
//   async ({ userData }, { rejectWithValue }) => {
//     try {
//       if (userData) {
//         const response = await api.post(`/api/auth/google/phone`, userData, { withCredentials: true });

//         const { accessToken, user } = response.data;
//         // Set access token in axios headers
//         api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//         // return response.data;
//         return { user, accessToken };
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
// );


// thunk for log in with google
// export const handleGoogleLogin = createAsyncThunk(
//   'auth/handleGoogleLogin',
//   async (searchParams, { rejectWithValue }) => {
//     try {
//       const encodedData = new URLSearchParams(searchParams).get('data');
//       if (!encodedData) return null;

//       const decodedData = JSON.parse(decodeURIComponent(encodedData));
//       return decodedData;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// thunk for log in
// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/api/auth/user/login", credentials);
//       const { accessToken, user } = response.data;
//       // Set access token in axios headers
//       api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

//       return { user, accessToken };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

//  thunk to check auth status on app load
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/user/refresh");
      const { accessToken, user } = response.data;

      // Update axios headers
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return { user, accessToken };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/user/logout");

      // Remove access token from axios headers
      delete api.defaults.headers.common["Authorization"];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const requestOTP = createAsyncThunk(
  "auth/requestOTP",
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/otp-auth/send-otp`, {
        phoneNumber,
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ phoneNumber, referralCode, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/otp-auth/verify-otp`, {
        phoneNumber,
        referralCode,
        otp,
      });

      if (response.data.accessToken) {
        // Set access token in axios headers
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);



export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/auth/user`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  user: null,
  // localUserInfo: {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phoneNumber: '',
  // }, // the localUserInfo is needed to maintain when user is not logged in and fill the data on checkoutform
  userRegistered: true, // need this varibale to show UI of log in and sign up
  user_loading: false,
  isUserAuthenticated: false,
  sendingOTP: false,
  verifyingOTP: false,
  message: "",
  error: null,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserRegisterStatus(state, action) {
      return {
        ...state,
        userRegistered: action.payload,
      };
    },
    // saveLocalUserInfo(state, action) {
    //   const { field, value } = action.payload;
    //   state.localUserInfo[field] = value;
    // }
  },
  extraReducers: (builder) => {
    builder
      // ========= signing up ==========
      // .addCase(signup.pending, (state) => {
      //   return {
      //     ...state,
      //     user_loading: true,
      //     error: null,
      //   };
      // })
      // .addCase(signup.fulfilled, (state, action) => {
      //   return {
      //     ...state,
      //     user_loading: false,
      //     user: action.payload.user,
      //     token: action.payload.accessToken,
      //     isUserAuthenticated: true,
      //   };
      // })
      // .addCase(signup.rejected, (state, action) => {
      //   return {
      //     ...state,
      //     user_loading: false,
      //     error: action.payload,
      //   };
      // })
      // ========= signing up  by google ==========
      // .addCase(handleGoogleSignup.pending, (state) => {
      //   return {
      //     ...state,
      //     user_loading: true,
      //     error: null,
      //   };
      // })
      // .addCase(handleGoogleSignup.fulfilled, (state, action) => {
      //   return {
      //     ...state,
      //     user_loading: false,
      //     user: action.payload.user,
      //     token: action.payload.accessToken,
      //     isUserAuthenticated: true,
      //   };
      // })
      // .addCase(handleGoogleSignup.rejected, (state, action) => {
      //   return {
      //     ...state,
      //     user_loading: false,
      //     error: action.payload,
      //   };
      // })

      // =========google signing up ==========
      //   .addCase(userGoogleSignup.pending, (state) => {
      //     return {
      //       ...state,
      //       user_loading: true,
      //       error: null,
      //     };
      //   })
      //   .addCase(userGoogleSignup.fulfilled, (state, action) => {
      //     return {
      //       ...state,
      //       user_loading: false,
      //       user: action.payload,
      //     };
      //   })
      //   .addCase(userGoogleSignup.rejected, (state, action) => {
      //     return {
      //       ...state,
      //       user_loading: false,
      //       error: action.payload,
      //     };
      //   })

      // ============ logging in ===========
      // .addCase(login.pending, (state) => {
      //   return {
      //     ...state,
      //     user_loading: true,
      //     error: null,
      //   };
      // })
      // .addCase(login.fulfilled, (state, action) => {
      //   return {
      //     ...state,
      //     user_loading: false,
      //     token: action.payload.accessToken,
      //     user: action.payload.user,
      //     isUserAuthenticated: true,
      //   };
      // })
      // .addCase(login.rejected, (state, action) => {
      //   return {
      //     ...state,
      //     user_loading: false,
      //     user: null,
      //     token: "",
      //     error: action.payload,
      //   };
      // })
      // check user auth status
      .addCase(checkAuthStatus.pending, (state) => {
        state.user_loading = true;
        state.error = null;
        // return {
        //   ...state,
        //   user_loading: true,
        //   error: null,
        // };
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {

        state.user_loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isUserAuthenticated = true;

        // return {
        //   ...state,
        //   user_loading: false,
        //   user: action.payload.user,
        //   token: action.payload.accessToken,
        //   isUserAuthenticated: true,
        // };
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.user_loading = false;
        state.error = action.payload;
        // return {
        //   ...state,
        //   user_loading: false,
        //   error: action.payload,
        // };
      })
      // ============ log out ===========
      .addCase(logout.pending, (state) => {
        state.user_loading = true;
        state.error = null;
        // return {
        //   ...state,
        //   user_loading: true,
        //   error: null,
        // };
      })
      .addCase(logout.fulfilled, (state, action) => {

        state.user_loading = false;
        state.token = "";
        state.user = null;
        state.isUserAuthenticated = false;

        // return {
        //   ...state,
        //   user_loading: false,
        //   token: "",
        //   user: null,
        //   isUserAuthenticated: false,
        // };
      })
      .addCase(logout.rejected, (state, action) => {
        state.user_loading = false;
        state.error = action.payload;
        // return {
        //   ...state,
        //   user_loading: false,
        //   error: action.payload,
        // };
      })
      // send otp
      .addCase(requestOTP.pending, (state) => {
        state.sendingOTP = true;
        // return {
        //   ...state,
        //   sendingOTP: true,
        // };
      })
      .addCase(requestOTP.fulfilled, (state, action) => {
        state.sendingOTP = false;
        state.message = action.payload.message
        // return {
        //   ...state,
        //   sendingOTP: false,
        //   message: action.payload.message,
        // };
      })
      .addCase(requestOTP.rejected, (state, action) => {
        state.sendingOTP = false;
        state.error = action.payload
        // return {
        //   ...state,
        //   sendingOTP: false,
        //   error: action.payload,
        // };
      })
      // verify otp
      .addCase(verifyOTP.pending, (state) => {
        state.verifyingOTP = true;
        // return {
        //   ...state,
        //   verifyingOTP: true,
        // };
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {

        if (action.payload.accessToken) {
          state.verifyingOTP = false;
          state.token = action.payload.accessToken;
          state.user = action.payload.user;
          // return {
          //   ...state,
          //   verifyingOTP: false,
          //   token: action.payload.accessToken,
          //   user: action.payload.user,
          // };
        } else {
          state.verifyingOTP = false;
          state.message = action.payload.message;
          // return {
          //   ...state,
          //   verifyingOTP: false,
          //   message: action.payload.message,
          // };
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.verifyingOTP = false;
        state.error = action.payload
        // return {
        //   ...state,
        //   verifyingOTP: false,
        //   error: action.payload,
        // };
      })
      // ============ handle google log in ===========
      // .addCase(handleGoogleLogin.pending, (state) => {
      //   return {
      //     ...state,
      //     user_loading: true,
      //     error: null,
      //   };
      // })
      // .addCase(handleGoogleLogin.fulfilled, (state, action) => {
      //   return {
      //     ...state,
      //     user_loading: false,
      //     token: action.payload.accessToken,
      //     user: action.payload.user,
      //     isUserAuthenticated: true,
      //   };
      // })
      // .addCase(handleGoogleLogin.rejected, (state, action) => {
      //   return {
      //     ...state,

      //     user_loading: false,
      //     user: null,
      //     token: "",
      //     error: action.payload,
      //   };
      // })
      // ============ get user data  ===========
      .addCase(getUserData.pending, (state) => {
        state.user_loading = true;
        state.error = null;
        // return {
        //   ...state,
        //   user_loading: true,
        //   error: null,
        // };
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user_loading = false;
        state.user = action.payload.user;
        // return {
        //   ...state,
        //   user_loading: false,
        //   user: action.payload.user,
        // };
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.user_loading = false;
        state.error = action.payload;
        // return {
        //   ...state,
        //   user_loading: false,
        //   error: action.payload,
        // };
      })
  },
});

export const { updateUserRegisterStatus, } = authSlice.actions;

export default authSlice.reducer;
