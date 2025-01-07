import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../config/axiosConfig";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// api calling for handling return items
export const addReturnItems = createAsyncThunk(
  "manageReturns/addReturnItems",
  async (formData, { rejectWithValue,getState }) => {
    // const token = JSON.parse(sessionStorage.getItem("token"));
    const { auth } = getState();
    try {
      if(auth.user){
        const response = await api.post(
          `/api/orders/add-return-item`,
          formData,
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        // return response.data;
      }
     
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get all return items for single user
export const getAllReturnItems = createAsyncThunk(
  "manageReturns/getAllReturnItems",
  async (_, { rejectWithValue,getState }) => {
    // const token = JSON.parse(sessionStorage.getItem("token"));
    const { auth } = getState();
    try {
      if(auth.user){
        const response = await api.get(
          `/api/orders/all/return-items`,
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        return response.data;
      }
    
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// cance return request
export const cancelReturnRequest = createAsyncThunk(
  "manageReturns/cancelReturnRequest",
  async (returnId, { rejectWithValue,getState }) => {
    // const token = JSON.parse(sessionStorage.getItem("token"));
    const { auth } = getState();
    try {
      if(auth.user){
        const response = await api.delete(
          `/api/orders/cancel-return/${returnId}`,
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        return response.data;
      }
     
    } catch (error) {
      
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  returns: [],
  singleReturn: {},
  loading: false,
  addingReturnedItems: false,
  error: null,
  returnsByStatus: {
    returnData: [],
    returnStatusTab: "requested",
  },
};

const manageReturns = createSlice({
  name: "returns",
  initialState,
  reducers: {
    getReturnsByStatus: (state, action) => {
      let activeReturns = state.returns.filter(
        (order) => order.returnStatus === action.payload
      );
      if (action.payload === "requested") {
        return {
          ...state,
          returnsByStatus: {
            ...state.returnsByStatus,
            returnData: activeReturns,
            returnStatusTab: action.payload,
          },
        };
      } else if (action.payload === "rejected") {
        let activeReturns = state.returns.filter(
          (order) => order.returnStatus === action.payload
        );
        return {
          ...state,
          returnsByStatus: {
            ...state.returnsByStatus,
            returnData: activeReturns,
            orderStatusTab: action.payload,
          },
        };
      } else if (action.payload === "inProgress") {
        let activeReturns = state.returns.filter(
          (order) => order.returnStatus === action.payload
        );
        return {
          ...state,
          returnsByStatus: {
            ...state.returnsByStatus,
            returnData: activeReturns,
            returnStatusTab: action.payload,
          },
        };
      } else if (action.payload === "completed") {
        let activeReturns = state.returns.filter(
          (order) => order.returnStatus === action.payload
        );
        return {
          ...state,
          returnsByStatus: {
            ...state.returnsByStatus,
            returnData: activeReturns,
            returnStatusTab: action.payload,
          },
        };
      }
      //  else if (action.payload === "cancelled") {
      //     let activeReturns = state.returns.filter(order => order.returnStatus === action.payload);
      //     return {
      //         ...state,
      //         returnsByStatus: {
      //             ...state.returnsByStatus,
      //             returnData: activeReturns,
      //             returnStatusTab: action.payload
      //         }
      //     }
      // }
      else {
        return {
          ...state,
          returnsByStatus: {
            ...state.returnsByStatus,
            returnData: state.orders,
          },
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // add returns
      .addCase(addReturnItems.pending, (state) => {
        return {
          ...state,
          addingReturnedItems: true,
        };
      })
      .addCase(addReturnItems.fulfilled, (state) => {
        return {
          ...state,
          addingReturnedItems: false,
          error: null,
        };
      })
      .addCase(addReturnItems.rejected, (state, action) => {
        return {
          ...state,
          addReturnItems: false,
          error: action.payload || "Something went wrong",
        };
      })
      // get all returns
      .addCase(getAllReturnItems.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllReturnItems.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          returns: action.payload,
          error: null,
          returnsByStatus: {
            ...state.returnsByStatus,
            returnData: action.payload,
          },
        };
      })
      .addCase(getAllReturnItems.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload || "Something went wrong",
        };
      })
      // cancel return request
      .addCase(cancelReturnRequest.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(cancelReturnRequest.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
         
        };
      })
      .addCase(cancelReturnRequest.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload || "Something went wrong",
        };
      });
  },
});

export const { getReturnsByStatus } = manageReturns.actions;

export default manageReturns.reducer;
