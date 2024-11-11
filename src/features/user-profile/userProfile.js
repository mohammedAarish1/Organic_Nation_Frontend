import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/axiosConfig";


export const handleAddingNewAddress = createAsyncThunk(
    'userProfile/handleAddingNewAddress',
    async (newAddress, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/user/profile/add/address`, newAddress,

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)

// delete a address
export const handleDeletingAddress = createAsyncThunk(
    'userProfile/handleDeletingAddress',
    async (addressId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/api/user/profile/delete/address/${addressId}`,

            );
            // return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)


// update existing  address
export const updateExistingAddress = createAsyncThunk(
    'userProfile/updateExistingAddress',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/user/profile/update/address/${payload.addressId}`, payload.data

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)



// update personal info
export const updatePersonalInfo = createAsyncThunk(
    'userProfile/updatePersonalInfo',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/user/profile/update/peronal/info`, payload

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)
// update phone number 
export const updateUserPhoneNumber = createAsyncThunk(
    'userProfile/updateUserPhoneNumber',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/user/profile/update/peronal/phone-number`, payload

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
)



const initialState = {
    loading: false,
    error: null,
    message:''
}

const userProfile = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // ===================================================== adding new address ==============================================================
            .addCase(handleAddingNewAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(handleAddingNewAddress.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(handleAddingNewAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload

            })
            // ================================================= updating existing  address===============================================

            .addCase(updateExistingAddress.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateExistingAddress.fulfilled, (state,action) => {
                state.loading = false;
                state.message=action.payload.message
            })
            .addCase(updateExistingAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload

            })
    }
})

// export const { setShowSidebar, setShowFilters } = userProfile.actions;

export default userProfile.reducer;